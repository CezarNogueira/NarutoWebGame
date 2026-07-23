const fs = require("fs");
let content = fs.readFileSync("src/models/Ninja.ts", "utf-8");

content = content.replace(
  '    if (this.data.clan === "Uzumaki") {\n      if (this.data.level >= 20) mult += 0.3;\n      if (this.data.level >= 40) mult += 0.5;\n    }',
  '    if (this.data.clan === "Uzumaki") {\n      if (this.data.level >= 20) mult += 0.3;\n      if (this.data.level >= 40) mult += 0.5;\n    }\n    if (this.data.clan === "Hatake") {\n      if (this.data.level >= 40) mult += 0.2;\n    }'
);

content = content.replace(
  '    if (this.data.clan === "Senju") {\n      if (this.data.level >= 40) mult += 0.5;\n    }',
  '    if (this.data.clan === "Senju") {\n      if (this.data.level >= 40) mult += 0.5;\n    }\n    if (this.data.clan === "Hatake") {\n      if (this.data.level >= 40) mult += 0.2;\n    }'
);

const newGetters = `
  getTaijutsuStat(): number {
    let val = this.data.stats.taijutsu;
    if (this.data.clan === "Rock Lee") {
      val = Math.floor(val * 1.15); // Inicial: +15% Taijutsu
    }
    return val;
  }

  getKenjutsuStat(): number {
    let mult = 1.0;
    if (this.data.clan === "Hatake") {
      mult += 0.2;
      if (this.data.level >= 10) mult += 0.2;
    }
    return Math.floor(this.data.stats.kenjutsu * mult);
  }

  getSpeedStat(): number {
    let mult = 1.0;
    if (this.data.clan === "Hatake") {
      mult += 0.1;
      if (this.data.level >= 20) mult += 0.2;
    }
    return Math.floor(this.data.stats.speed * mult);
  }

  getNinjutsuStat(): number {
    let mult = 1.0;
    if (this.data.clan === "Hatake") {
      if (this.data.level >= 30) mult += 0.2;
      if (this.data.level >= 40) mult += 0.3;
    }
    return Math.floor(this.data.stats.ninjutsu * mult);
  }
`;

content = content.replace(
  /  getTaijutsuStat\(\): number \{[\s\S]*?return val;\n  \}/,
  newGetters.trim()
);

fs.writeFileSync("src/models/Ninja.ts", content);

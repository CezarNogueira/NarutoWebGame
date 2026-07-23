const fs = require("fs");
let content = fs.readFileSync("src/models/Ninja.ts", "utf-8");

const getters = `
  getMaxHealth(): number {
    let mult = 1.0;
    if (this.data.clan === "Senju") {
      mult += 0.1;
      if (this.data.level >= 20) mult += 0.3;
    }
    if (this.data.clan === "Uzumaki") {
      if (this.data.level >= 20) mult += 0.3;
      if (this.data.level >= 40) mult += 0.5;
    }
    return Math.floor(this.data.maxHealth * mult);
  }

  getMaxChakra(): number {
    if (this.data.clan === "Rock Lee") return 0;
    
    let mult = 1.0;
    if (this.data.clan === "Uzumaki") {
      mult += 0.2;
      if (this.data.level >= 40) mult += 0.3;
    }
    if (this.data.clan === "Senju" && this.data.level >= 10) {
      mult += 0.2;
    }
    return Math.floor(this.data.maxChakra * mult);
  }

  getTaijutsuStat(): number {
    let val = this.data.stats.taijutsu;
    if (this.data.clan === "Rock Lee") {
      val = Math.floor(val * 1.15); // Inicial: +15% Taijutsu
    }
    return val;
  }
`;

content = content.replace(
  '  hasElementAffinity(element: string): boolean {',
  getters + '\n  hasElementAffinity(element: string): boolean {'
);

content = content.replace(
  'if (element === this.data.nature) return true;',
  'if (this.data.clan === "Senju" && this.data.level >= 40) return true;\n    if (element === this.data.nature) return true;'
);

content = content.replace(
  '  addXp(amount: number): boolean {',
  `  checkClanSkills(): string[] {
    let newLearned: string[] = [];
    const learn = (id: string, name: string) => {
      if (!this.data.knownJutsus.includes(id)) {
        this.data.knownJutsus.push(id);
        newLearned.push(name);
      }
    };
    if (this.data.clan === "Uchiha") {
      if (this.data.level >= 25) learn("j_uchiha_genjutsu", "Genjutsu Ocular");
    }
    if (this.data.clan === "Hyūga") {
      if (this.data.level >= 10) learn("j_hyuga_punho", "Punho Gentil");
      if (this.data.level >= 20) learn("j_hyuga_8trigramas", "Oito Trigramas");
      if (this.data.level >= 30) learn("j_hyuga_rotacao", "Rotação Celestial");
    }
    if (this.data.clan === "Uzumaki") {
      if (this.data.level >= 10) learn("j_uzumaki_correntes", "Correntes de Chakra");
      if (this.data.level >= 30) learn("j_uzumaki_selamento", "Selamento Uzumaki");
    }
    if (this.data.clan === "Rock Lee") {
      if (this.data.level >= 10) learn("j_lee_lotus1", "Lótus Primária");
      if (this.data.level >= 20) learn("j_lee_lotus2", "Lótus Oculta");
    }
    return newLearned;
  }

  addXp(amount: number): boolean {`
);

content = content.replace(
  '      this.data.chakra = this.data.maxChakra;\n      leveledUp = true;',
  '      this.data.chakra = this.getMaxChakra();\n      this.data.health = this.getMaxHealth();\n      leveledUp = true;'
);

fs.writeFileSync("src/models/Ninja.ts", content);

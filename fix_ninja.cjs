const fs = require("fs");
let content = fs.readFileSync("src/models/Ninja.ts", "utf-8");

content = content.replace(
  '    if (this.data.clan === "Senju") {\n      if (this.data.level >= 40) learn("j_senju_sabio", "Modo Sábio da Madeira");\n    }\n    if (this.data.clan === "Rock Lee") {\n      val = Math.floor(val * 1.15); // Inicial: +15% Taijutsu',
  '    if (this.data.clan === "Rock Lee") {\n      val = Math.floor(val * 1.15); // Inicial: +15% Taijutsu'
);

content = content.replace(
  '    if (this.data.clan === "Rock Lee") {\n      if (this.data.level >= 10) learn("j_lee_portao1", "Primeiro Portão");',
  '    if (this.data.clan === "Senju") {\n      if (this.data.level >= 40) learn("j_senju_sabio", "Modo Sábio da Madeira");\n    }\n    if (this.data.clan === "Rock Lee") {\n      if (this.data.level >= 10) learn("j_lee_portao1", "Primeiro Portão");'
);

fs.writeFileSync("src/models/Ninja.ts", content);

const fs = require("fs");
let content = fs.readFileSync("src/models/Ninja.ts", "utf-8");

content = content.replace(
  '    if (this.data.clan === "Uchiha") {\n      if (this.data.level >= 25) learn("j_uchiha_genjutsu", "Genjutsu Ocular");\n    }',
  '    if (this.data.clan === "Uchiha") {\n      if (this.data.level >= 10) learn("j_uchiha_sharingan", "Sharingan");\n      if (this.data.level >= 25) learn("j_uchiha_genjutsu", "Genjutsu Ocular");\n      if (this.data.level >= 40) learn("j_uchiha_mangekyou", "Mangekyō Sharingan");\n    }'
);

content = content.replace(
  '    if (this.data.clan === "Hyūga") {\n      if (this.data.level >= 10) learn("j_hyuga_punho", "Punho Gentil");',
  '    if (this.data.clan === "Hyūga") {\n      if (this.data.level >= 10) learn("j_hyuga_byakugan", "Byakugan");\n      if (this.data.level >= 10) learn("j_hyuga_punho", "Punho Gentil");'
);

content = content.replace(
  '    if (this.data.clan === "Rock Lee") {',
  '    if (this.data.clan === "Senju") {\n      if (this.data.level >= 40) learn("j_senju_sabio", "Modo Sábio da Madeira");\n    }\n    if (this.data.clan === "Rock Lee") {'
);

fs.writeFileSync("src/models/Ninja.ts", content);

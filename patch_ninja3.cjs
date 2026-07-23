const fs = require("fs");
let content = fs.readFileSync("src/models/Ninja.ts", "utf-8");

content = content.replace(
  'autoLearnNatureJutsus(): string[] {',
  'autoLearnNatureJutsus(): string[] {\n    let clanSkills = this.checkClanSkills();'
);

content = content.replace(
  'return newLearned;',
  'return [...newLearned, ...clanSkills];'
);

fs.writeFileSync("src/models/Ninja.ts", content);

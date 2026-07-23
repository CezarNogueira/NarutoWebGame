const fs = require("fs");
let content = fs.readFileSync("src/models/Ninja.ts", "utf-8");

content = content.replace(
  'missionsCompleted: { D: 0, C: 0, B: 0, A: 0, S: 0 },',
  'missionsCompleted: { "Sem Rank": 0, D: 0, C: 0, B: 0, A: 0, S: 0 },'
);

fs.writeFileSync("src/models/Ninja.ts", content);

const fs = require("fs");
let content = fs.readFileSync("src/types.ts", "utf-8");

content = content.replace(
  'export type MissionRank = "D" | "C" | "B" | "A" | "S";',
  'export type MissionRank = "Sem Rank" | "D" | "C" | "B" | "A" | "S";'
);

fs.writeFileSync("src/types.ts", content);

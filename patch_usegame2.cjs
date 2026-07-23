const fs = require("fs");
let content = fs.readFileSync("src/hooks/useGame.ts", "utf-8");

content = content.replace(
  'import { Screen, BattleOutcome, Village, ClassType, Nature, LogEntry } from "../types";',
  'import { Screen, BattleOutcome, Village, ClassType, Nature, Clan, LogEntry } from "../types";'
);

content = content.replace(
  'const createNinja = (name: string, village: Village, ninjaClass: ClassType, nature: Nature, avatarId: string) => {',
  'const createNinja = (name: string, village: Village, ninjaClass: ClassType, nature: Nature, clan: Clan, avatarId: string) => {'
);
content = content.replace(
  'const newNinja = NinjaModel.create(name, village, ninjaClass, nature, avatarId);',
  'const newNinja = NinjaModel.create(name, village, ninjaClass, nature, clan, avatarId);'
);

fs.writeFileSync("src/hooks/useGame.ts", content);

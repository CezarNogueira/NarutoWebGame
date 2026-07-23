const fs = require("fs");
let content = fs.readFileSync("src/hooks/useGame.ts", "utf-8");

content = content.replace(
  "const handleBattleEnd = (outcome: BattleOutcome, mission: Mission) => {",
  "const handleBattleEnd = (outcome: BattleOutcome) => {\\n    const mission = activeMission;\\n    if (!mission) return;"
);

fs.writeFileSync("src/hooks/useGame.ts", content);

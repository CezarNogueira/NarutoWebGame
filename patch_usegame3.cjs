const fs = require("fs");
let content = fs.readFileSync("src/hooks/useGame.ts", "utf-8");

content = content.replace(
  'if (ninja.data.health === ninja.data.maxHealth && ninja.data.chakra === ninja.data.maxChakra) {',
  'if (ninja.data.health === ninja.getMaxHealth() && ninja.data.chakra === ninja.getMaxChakra()) {'
);

fs.writeFileSync("src/hooks/useGame.ts", content);

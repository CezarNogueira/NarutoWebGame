const fs = require("fs");
let content = fs.readFileSync("src/components/AppContainer.tsx", "utf-8");

content = content.replace(
  'value={ninja.data.health} max={ninja.data.maxHealth}',
  'value={ninja.data.health} max={ninja.getMaxHealth()}'
);
content = content.replace(
  'value={ninja.data.chakra} max={ninja.data.maxChakra}',
  'value={ninja.data.chakra} max={ninja.getMaxChakra()}'
);

fs.writeFileSync("src/components/AppContainer.tsx", content);

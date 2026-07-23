const fs = require("fs");
let content = fs.readFileSync("src/Battle.tsx", "utf-8");

content = content.replace(/ninja\.maxHealth/g, "ninjaObj.getMaxHealth()");
content = content.replace(/ninja\.maxChakra/g, "ninjaObj.getMaxChakra()");

fs.writeFileSync("src/Battle.tsx", content);

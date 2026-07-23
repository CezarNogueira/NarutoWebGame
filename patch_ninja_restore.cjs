const fs = require("fs");
let content = fs.readFileSync("src/models/Ninja.ts", "utf-8");

content = content.replace(
  '  restore(healthAmount?: number, chakraAmount?: number, fullRestore?: boolean) {\n    if (fullRestore) {\n      this.data.health = this.data.maxHealth;\n      this.data.chakra = this.data.maxChakra;\n    } else {\n      if (healthAmount) this.data.health = Math.min(this.data.maxHealth, this.data.health + healthAmount);\n      if (chakraAmount) this.data.chakra = Math.min(this.data.maxChakra, this.data.chakra + chakraAmount);\n    }\n  }',
  '  restore(healthAmount?: number, chakraAmount?: number, fullRestore?: boolean) {\n    if (fullRestore) {\n      this.data.health = this.getMaxHealth();\n      this.data.chakra = this.getMaxChakra();\n    } else {\n      if (healthAmount) this.data.health = Math.min(this.getMaxHealth(), this.data.health + healthAmount);\n      if (chakraAmount) this.data.chakra = Math.min(this.getMaxChakra(), this.data.chakra + chakraAmount);\n    }\n  }'
);

fs.writeFileSync("src/models/Ninja.ts", content);

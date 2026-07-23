const fs = require("fs");
let content = fs.readFileSync("src/models/Ninja.ts", "utf-8");

content = content.replace(
  '    if (this.data.clan === "Senju" && this.data.level >= 10) {\n      mult += 0.2;\n    }',
  '    if (this.data.clan === "Senju" && this.data.level >= 10) {\n      mult += 0.2;\n    }\n    if (this.data.clan === "Hatake") {\n      if (this.data.level >= 40) mult += 0.2;\n    }'
);

fs.writeFileSync("src/models/Ninja.ts", content);

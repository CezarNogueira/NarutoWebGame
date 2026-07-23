const fs = require("fs");
let content = fs.readFileSync("src/types.ts", "utf-8");
content = content.replace("power: number; // ~30 (fraco) a ~95 (devastador)", "power: number;\n  defense?: number;");
fs.writeFileSync("src/types.ts", content);

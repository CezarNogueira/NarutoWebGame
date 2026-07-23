const fs = require("fs");
let content = fs.readFileSync("src/types.ts", "utf-8");

content = content.replace(
  "  perks: string[]; // passivas (ex: nature_fogo, ninjutsu_kenjutsu)",
  "  perks: string[]; // passivas (ex: nature_fogo, ninjutsu_kenjutsu)\n  master?: string | null; // id do mestre"
);

fs.writeFileSync("src/types.ts", content);

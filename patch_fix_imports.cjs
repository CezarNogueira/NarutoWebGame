const fs = require("fs");
let content = fs.readFileSync("src/App.tsx", "utf-8");

content = content.replace(
  'import { VILLAGES, CLASSES, MISSIONS, JUTSUS, ITEMS, getStarterJutsu } from "./data";',
  'import { VILLAGES, CLASSES, MISSIONS, JUTSUS, ITEMS, getStarterJutsu, MASTERS, MasterTeach } from "./data";'
);

fs.writeFileSync("src/App.tsx", content);

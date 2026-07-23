const fs = require("fs");
let content = fs.readFileSync("src/Battle.tsx", "utf-8");

content = content.replace(
  'addLog("O efeito do Oitavo Portão terminou! Sua força vital se esgotou.", "danger");',
  'addLog("O efeito do Oitavo Portão terminou! Sua força vital se esgotou.", "info");'
);

fs.writeFileSync("src/Battle.tsx", content);

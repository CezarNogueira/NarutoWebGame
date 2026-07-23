const fs = require("fs");
let content = fs.readFileSync("src/App.tsx", "utf-8");

if (!content.includes("autoLearnNatureJutsus(updated);")) {
  content = content.replace("updated.maxChakra += 15;", "updated.maxChakra += 15;\n      autoLearnNatureJutsus(updated);");
  fs.writeFileSync("src/App.tsx", content);
}

const fs = require("fs");
let content = fs.readFileSync("src/models/Ninja.ts", "utf-8");

content = content.replace(
  'const starter = getStarterJutsu(ninjaClass, nature);\n    if (starter) data.knownJutsus.push(starter);',
  'const starter = getStarterJutsu(ninjaClass, nature);\n    if (starter && clan !== "Rock Lee") data.knownJutsus.push(starter);'
);

fs.writeFileSync("src/models/Ninja.ts", content);

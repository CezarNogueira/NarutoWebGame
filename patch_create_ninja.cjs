const fs = require("fs");
let content = fs.readFileSync("src/App.tsx", "utf-8");

const oldCreation = `      knownJutsus: [getStarterJutsu(ninjaClass as ClassType, nature as import("./types").Nature)],
      inventory: { kit_medico: 2, pilula_soldado: 1 },
      ownedGear: [],
      day: 1,
    });`;

const newCreation = `      knownJutsus: [getStarterJutsu(ninjaClass as ClassType, nature as import("./types").Nature)],
      inventory: { kit_medico: 2, pilula_soldado: 1 },
      ownedGear: [],
      day: 1,
    };
    autoLearnNatureJutsus(newNinja);
    setNinja(newNinja);`;

content = content.replace(oldCreation, newCreation);
content = content.replace("setNinja({", "const newNinja: Ninja = {");

fs.writeFileSync("src/App.tsx", content);

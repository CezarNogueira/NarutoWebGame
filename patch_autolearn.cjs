const fs = require("fs");
let content = fs.readFileSync("src/App.tsx", "utf-8");

const oldAutoLearn = `  const autoLearnNatureJutsus = (n: Ninja) => {
    let newJutsus = [...n.knownJutsus];
    JUTSUS.forEach(j => {
      if (j.element === n.nature && n.level >= j.reqLevel && j.scrollCost === 0 && !newJutsus.includes(j.id)) {
        newJutsus.push(j.id);
        addLog(\`Você despertou um novo Jutsu da sua natureza: \${j.name}!\`, "success");
      }
    });
    n.knownJutsus = newJutsus;
  };`;

const newAutoLearn = `  const autoLearnNatureJutsus = (n: Ninja) => {
    let newJutsus = [...n.knownJutsus];
    JUTSUS.forEach(j => {
      const matchNature = j.element === n.nature || (j.element === "Fogo" && n.perks?.includes("nature_fogo"));
      if (matchNature && n.level >= j.reqLevel && j.scrollCost === 0 && !newJutsus.includes(j.id)) {
        newJutsus.push(j.id);
        addLog(\`Você despertou um novo Jutsu da sua natureza: \${j.name}!\`, "success");
      }
    });
    n.knownJutsus = newJutsus;
  };`;

content = content.replace(oldAutoLearn, newAutoLearn);
fs.writeFileSync("src/App.tsx", content);

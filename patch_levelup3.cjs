const fs = require("fs");
let content = fs.readFileSync("src/App.tsx", "utf-8");

const autoLearn = `
  const autoLearnNatureJutsus = (n: Ninja) => {
    let newJutsus = [...n.knownJutsus];
    JUTSUS.forEach(j => {
      if (j.element === n.nature && n.level >= j.reqLevel && j.scrollCost === 0 && !newJutsus.includes(j.id)) {
        newJutsus.push(j.id);
        addLog(\`Você despertou um novo Jutsu da sua natureza: \${j.name}!\`, "success");
      }
    });
    n.knownJutsus = newJutsus;
  };
`;

if (!content.includes("const autoLearnNatureJutsus = (n: Ninja) => {")) {
  content = content.replace("const levelUpIfNeeded = (n: Ninja): Ninja => {", autoLearn + "\n  const levelUpIfNeeded = (n: Ninja): Ninja => {");
  fs.writeFileSync("src/App.tsx", content);
}

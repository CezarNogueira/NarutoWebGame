const fs = require("fs");
let content = fs.readFileSync("src/App.tsx", "utf-8");

const hasElementAffinityStr = `const hasElementAffinity = (ninja: Ninja, element: string) => {
  if (element === ninja.nature) return true;
  if (element === "Fogo" && ninja.perks?.includes("nature_fogo")) return true;
  if (element === "Água" && ninja.perks?.includes("nature_agua")) return true;
  if (element === "Terra" && ninja.perks?.includes("nature_terra")) return true;
  if (element === "Vento" && ninja.perks?.includes("nature_vento")) return true;
  if (element === "Raio" && ninja.perks?.includes("nature_raiton")) return true;
  return false;
};

export default function App() {`;

content = content.replace("export default function App() {", hasElementAffinityStr);

const oldAutoLearn = `  const autoLearnNatureJutsus = (n: Ninja) => {
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

const newAutoLearn = `  const autoLearnNatureJutsus = (n: Ninja) => {
    let newJutsus = [...n.knownJutsus];
    JUTSUS.forEach(j => {
      const matchNature = hasElementAffinity(n, j.element);
      if (matchNature && n.level >= j.reqLevel && j.scrollCost === 0 && !newJutsus.includes(j.id)) {
        newJutsus.push(j.id);
        addLog(\`Você despertou um novo Jutsu da sua natureza: \${j.name}!\`, "success");
      }
    });
    n.knownJutsus = newJutsus;
  };`;

content = content.replace(oldAutoLearn, newAutoLearn);

const oldLearnJutsu = `  const learnJutsu = (j: Jutsu) => {
    if (!ninja) return;
    if (ninja.knownJutsus.includes(j.id)) return;
    const matchNature = j.element === ninja.nature || (j.element === "Fogo" && ninja.perks?.includes("nature_fogo"));
    if (!matchNature && !["Físico", "Ilusão", "Cura", "Neutro"].includes(j.element)) return addLog(\`Você não tem afinidade com \${j.element}.\`, "danger");`;

const newLearnJutsu = `  const learnJutsu = (j: Jutsu) => {
    if (!ninja) return;
    if (ninja.knownJutsus.includes(j.id)) return;
    const matchNature = hasElementAffinity(ninja, j.element);
    if (!matchNature && !["Físico", "Ilusão", "Cura", "Neutro"].includes(j.element)) return addLog(\`Você não tem afinidade com \${j.element}.\`, "danger");`;

content = content.replace(oldLearnJutsu, newLearnJutsu);

const oldFilter = `{JUTSUS.filter((j) => j.scrollCost > 0 && (j.element === ninja.nature || ["Físico", "Ilusão", "Cura", "Neutro"].includes(j.element))).map((j) => {`;
const newFilter = `{JUTSUS.filter((j) => j.scrollCost > 0 && (hasElementAffinity(ninja, j.element) || ["Físico", "Ilusão", "Cura", "Neutro"].includes(j.element))).map((j) => {`;

content = content.replace(oldFilter, newFilter);

fs.writeFileSync("src/App.tsx", content);

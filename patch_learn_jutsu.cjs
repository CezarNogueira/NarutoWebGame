const fs = require("fs");
let content = fs.readFileSync("src/App.tsx", "utf-8");

const oldLearn = `  const learnJutsu = (j: Jutsu) => {
    if (!ninja) return;
    if (ninja.knownJutsus.includes(j.id)) return;
    if (j.element !== ninja.nature && !["Físico", "Ilusão", "Cura", "Neutro"].includes(j.element)) return addLog(\`Você não tem afinidade com \${j.element}.\`, "danger");
    if (ninja.level < j.reqLevel) return addLog(\`Requer nível \${j.reqLevel} para aprender \${j.name}.\`, "danger");`;

const newLearn = `  const learnJutsu = (j: Jutsu) => {
    if (!ninja) return;
    if (ninja.knownJutsus.includes(j.id)) return;
    const matchNature = j.element === ninja.nature || (j.element === "Fogo" && ninja.perks?.includes("nature_fogo"));
    if (!matchNature && !["Físico", "Ilusão", "Cura", "Neutro"].includes(j.element)) return addLog(\`Você não tem afinidade com \${j.element}.\`, "danger");
    if (ninja.level < j.reqLevel) return addLog(\`Requer nível \${j.reqLevel} para aprender \${j.name}.\`, "danger");`;

content = content.replace(oldLearn, newLearn);
fs.writeFileSync("src/App.tsx", content);

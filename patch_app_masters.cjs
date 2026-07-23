const fs = require("fs");
let content = fs.readFileSync("src/App.tsx", "utf-8");

const oldExamCode = `            {/* ---------------- EXAME ---------------- */}
            {screen === "EXAM" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center justify-center py-8">
                <ShieldAlert className="w-20 h-20 text-neutral-700 mb-6" />
                <h2 className="text-3xl font-bold mb-3">Exame de Promoção</h2>
                <p className="text-neutral-400 max-w-md mb-6 text-sm">Prove seu valor e suba na hierarquia da aldeia.</p>
                
                <div className="bg-neutral-800 border border-neutral-700 p-6 rounded-xl w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-neutral-400 text-sm">Rank Atual</span>
                    <span className="font-bold text-lg">{ninja.rank}</span>
                  </div>
                  <button 
                    onClick={() => addLog("Os exames ainda não estão disponíveis nesta temporada.", "info")}
                    className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 py-3 rounded-lg font-bold transition-colors"
                  >
                    Inscrever-se para o Próximo Exame
                  </button>
                </div>
              </motion.div>
            )}`;

const mastersCode = `
            {/* ---------------- MASTERS ---------------- */}
            {screen === "MASTERS" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-bold">Mestres Ninja</h2>
                    <p className="text-neutral-400 text-sm mt-1">Aprenda técnicas avançadas com lendas da aldeia.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {MASTERS.map(m => (
                    <div key={m.id} className="bg-neutral-800 rounded-xl p-5 border border-neutral-700 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-neutral-100 mb-4">{m.name}</h3>
                        <div className="space-y-2 mb-4">
                          {m.teaches.map(t => {
                            const isJutsu = t.type === "jutsu";
                            const learned = isJutsu ? ninja.knownJutsus.includes(t.id) : ninja.perks.includes(t.id);
                            return (
                              <div key={t.id} className="flex justify-between items-center bg-neutral-900 p-3 rounded-lg border border-neutral-800">
                                <div>
                                  <div className="font-medium text-sm">{t.name}</div>
                                  <div className="text-xs text-neutral-400 mt-1">Nível req: {t.reqLevel}</div>
                                </div>
                                <button
                                  disabled={learned || ninja.level < t.reqLevel}
                                  onClick={() => learnFromMaster(m.id, t)}
                                  className="text-xs font-bold px-3 py-2 bg-neutral-700 hover:bg-neutral-600 disabled:opacity-40 rounded-lg transition-colors"
                                >
                                  {learned ? "Aprendido" : "Aprender"}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}`;

content = content.replace(oldExamCode, oldExamCode + mastersCode);

// Add MASTERS import
content = content.replace(
  'import { MISSIONS, JUTSUS, ITEMS, CLASSES, AVATARS } from "./data";',
  'import { MISSIONS, JUTSUS, ITEMS, CLASSES, AVATARS, MASTERS, MasterTeach } from "./data";'
);

// Add learnFromMaster function
const learnFunc = `
  const learnFromMaster = (mId: string, teach: MasterTeach) => {
    if (!ninja) return;
    if (ninja.level < teach.reqLevel) return addLog(\`Requer nível \${teach.reqLevel} para aprender \${teach.name}.\`, "danger");
    const updated = { ...ninja, knownJutsus: [...ninja.knownJutsus], perks: [...ninja.perks] };
    if (teach.type === "jutsu") {
      if (updated.knownJutsus.includes(teach.id)) return addLog("Você já sabe esta técnica.", "info");
      updated.knownJutsus.push(teach.id);
      addLog(\`Você aprendeu \${teach.name} com \${MASTERS.find(m => m.id === mId)?.name}!\`, "success");
    } else {
      if (updated.perks.includes(teach.id)) return addLog("Você já possui esta habilidade.", "info");
      updated.perks.push(teach.id);
      addLog(\`Você despertou \${teach.name}!\`, "success");
    }
    setNinja(updated);
  };
`;

content = content.replace("  const buyItem = (item: Item) => {", learnFunc + "\n  const buyItem = (item: Item) => {");

fs.writeFileSync("src/App.tsx", content);

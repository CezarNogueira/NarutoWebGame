const fs = require("fs");
let content = fs.readFileSync("src/App.tsx", "utf-8");

const oldExamCode = `            {/* ---------------- EXAME ---------------- */}
            {screen === "EXAM" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center justify-center py-8">
                <ShieldAlert className="w-20 h-20 text-neutral-700 mb-6" />
                <h2 className="text-3xl font-bold mb-3">Exame de Promoção</h2>
                <p className="text-neutral-400 max-w-md mb-6 text-sm">Prove seu valor e suba na hierarquia da aldeia.</p>

                <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-xl mb-6 w-full max-w-md text-left space-y-3">
                  <div>
                    <div className="text-sm text-neutral-400">Rank atual</div>
                    <div className="text-2xl font-bold text-red-500">{ninja.rank}</div>
                  </div>
                  {nextRankInfo && (
                    <div className="border-t border-neutral-800 pt-3 space-y-2">
                      <div className="text-sm text-neutral-400">Para virar <span className="text-white font-bold">{nextRankInfo.nextRank}</span>:</div>
                      <Requirement met={ninja.level >= nextRankInfo.reqLevel} label={\`Nível \${nextRankInfo.reqLevel}\`} current={\`atual: \${ninja.level}\`} />
                      <Requirement met={ninja.missionsCompleted[nextRankInfo.rankReq] >= nextRankInfo.reqMissions} label={\`\${nextRankInfo.reqMissions} missões Rank \${nextRankInfo.rankReq}\`} current={\`atual: \${ninja.missionsCompleted[nextRankInfo.rankReq]}\`} />
                    </div>
                  )}
                </div>

                <button onClick={takeExam} className="bg-white hover:bg-neutral-200 text-black font-bold py-4 px-12 rounded-xl shadow-lg transition-colors text-lg">
                  Tentar Exame Ninja
                </button>
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
                  {ninja.master && (
                    <div className="bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-sm">
                      Mestre Atual: <span className="font-bold text-white">{MASTERS.find(m => m.id === ninja.master)?.name}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {MASTERS.map(m => {
                    const isMyMaster = ninja.master === m.id;
                    const canEnroll = !ninja.master;
                    
                    return (
                      <div key={m.id} className={\`bg-neutral-950 rounded-xl p-5 border flex flex-col justify-between \${isMyMaster ? "border-red-500" : "border-neutral-800"}\`}>
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-neutral-100">{m.name}</h3>
                            {!isMyMaster && canEnroll && (
                              <button
                                onClick={() => enrollMaster(m.id)}
                                className="bg-white hover:bg-neutral-200 text-black text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                              >
                                Virar Aluno
                              </button>
                            )}
                            {!isMyMaster && !canEnroll && (
                              <span className="text-xs text-neutral-500">Fechado</span>
                            )}
                          </div>
                          
                          <div className="space-y-2 mb-4 opacity-100 transition-opacity">
                            {m.teaches.map(t => {
                              const isJutsu = t.type === "jutsu";
                              const learned = isJutsu ? ninja.knownJutsus.includes(t.id) : ninja.perks.includes(t.id);
                              return (
                                <div key={t.id} className={\`flex justify-between items-center bg-neutral-900 p-3 rounded-lg border \${learned ? "border-green-500/30" : "border-neutral-800"}\`}>
                                  <div className={\`\${!isMyMaster ? "opacity-50" : ""}\`}>
                                    <div className="font-medium text-sm">{t.name}</div>
                                    <div className="text-xs text-neutral-400 mt-1">Nível req: {t.reqLevel}</div>
                                  </div>
                                  <button
                                    disabled={!isMyMaster || learned || ninja.level < t.reqLevel}
                                    onClick={() => learnFromMaster(m.id, t)}
                                    className="text-xs font-bold px-3 py-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 rounded-lg border border-neutral-700 transition-colors"
                                  >
                                    {learned ? "Aprendido" : "Aprender"}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}`;

content = content.replace(oldExamCode, oldExamCode + mastersCode);

// Add enrollMaster function
const enrollFunc = `
  const enrollMaster = (mId: string) => {
    if (!ninja) return;
    if (ninja.master) return addLog("Você já tem um mestre.", "danger");
    setNinja({ ...ninja, master: mId });
    addLog(\`Você agora é aluno de \${MASTERS.find(m => m.id === mId)?.name}!\`, "success");
  };
`;

content = content.replace("  const learnFromMaster = (mId: string, teach: MasterTeach) => {", enrollFunc + "\n  const learnFromMaster = (mId: string, teach: MasterTeach) => {");

fs.writeFileSync("src/App.tsx", content);

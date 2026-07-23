const fs = require("fs");
let content = fs.readFileSync("src/App.tsx", "utf-8");

const oldMastersCode = `                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                </div>`;

const newMastersCode = `                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {MASTERS.filter(m => !ninja.master || ninja.master === m.id).map(m => {
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
                          </div>
                          
                          {!isMyMaster ? (
                            <p className="text-sm text-neutral-400 mb-4">{m.description}</p>
                          ) : (
                            <div className="space-y-2 mb-4 opacity-100 transition-opacity">
                              <p className="text-sm text-neutral-400 mb-4">{m.description}</p>
                              {m.teaches.map(t => {
                                const isJutsu = t.type === "jutsu";
                                const learned = isJutsu ? ninja.knownJutsus.includes(t.id) : ninja.perks.includes(t.id);
                                return (
                                  <div key={t.id} className={\`flex justify-between items-center bg-neutral-900 p-3 rounded-lg border \${learned ? "border-green-500/30" : "border-neutral-800"}\`}>
                                    <div>
                                      <div className="font-medium text-sm">{t.name}</div>
                                      <div className="text-xs text-neutral-400 mt-1">Nível req: {t.reqLevel}</div>
                                    </div>
                                    <button
                                      disabled={learned || ninja.level < t.reqLevel}
                                      onClick={() => learnFromMaster(m.id, t)}
                                      className="text-xs font-bold px-3 py-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 rounded-lg border border-neutral-700 transition-colors"
                                    >
                                      {learned ? "Aprendido" : "Aprender"}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>`;

content = content.replace(oldMastersCode, newMastersCode);
fs.writeFileSync("src/App.tsx", content);

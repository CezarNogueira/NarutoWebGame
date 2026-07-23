import { motion } from "motion/react";
import { useGameContext } from "../../contexts/GameContext";
import { MASTERS } from "../../data";

export function MastersScreen() {
  const { ninja, enrollMaster, learnFromMaster } = useGameContext();
  if (!ninja) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold">Mestres Ninja</h2>
          <p className="text-neutral-400 text-sm mt-1">Aprenda técnicas avançadas com lendas da aldeia.</p>
        </div>
        {ninja.data.master && (
          <div className="bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-sm">
            Mestre Atual: <span className="font-bold text-white">{MASTERS.find(m => m.id === ninja.data.master)?.name}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {MASTERS.filter(m => !ninja.data.master || ninja.data.master === m.id).map(m => {
          const isMyMaster = ninja.data.master === m.id;
          const canEnroll = !ninja.data.master;
          
          return (
            <div key={m.id} className={`bg-neutral-950 rounded-xl p-5 border flex flex-col justify-between ${isMyMaster ? "border-red-500" : "border-neutral-800"}`}>
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
                      const learned = isJutsu ? ninja.data.knownJutsus.includes(t.id) : ninja.data.perks.includes(t.id);
                      return (
                        <div key={t.id} className={`flex justify-between items-center bg-neutral-900 p-3 rounded-lg border ${learned ? "border-green-500/30" : "border-neutral-800"}`}>
                          <div>
                            <div className="font-medium text-sm">{t.name}</div>
                            <div className="text-xs text-neutral-400 mt-1">Nível req: {t.reqLevel}</div>
                          </div>
                          <button
                            disabled={learned || ninja.data.level < t.reqLevel}
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
      </div>
    </motion.div>
  );
}

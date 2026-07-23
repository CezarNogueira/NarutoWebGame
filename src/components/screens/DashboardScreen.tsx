import { motion } from "motion/react";
import { Star, Sparkles, Flame } from "lucide-react";
import { useGameContext } from "../../contexts/GameContext";
import { JUTSUS } from "../../data";

export function DashboardScreen() {
  const { ninja, eatRamen } = useGameContext();

  if (!ninja) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 flex items-center justify-between">
          <div>
            <div className="text-neutral-400 text-sm mb-1">Ryo</div>
            <div className="text-2xl font-bold text-yellow-500">{ninja.data.ryo.toLocaleString()}</div>
          </div>
          <div className="bg-yellow-500/10 p-3 rounded-full"><Star className="text-yellow-500 w-6 h-6" /></div>
        </div>
      </div>

      <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-800">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-red-400" /> Jutsus e Habilidades</h3>
        
        {/* Natureza */}
        <div className="mb-5">
          <h4 className="text-sm font-bold text-neutral-400 mb-2 uppercase tracking-wider">Ataques de Natureza</h4>
          <div className="flex flex-wrap gap-2">
            {ninja.data.knownJutsus.map((id) => {
              const j = JUTSUS.find((x) => x.id === id);
              if (!j) return null;
              if (j.element === "Fogo" || j.element === "Água" || j.element === "Terra" || j.element === "Vento" || j.element === "Raio") {
                return (
                  <span key={id} className="text-xs font-semibold bg-neutral-800 border border-neutral-700 px-3 py-1.5 rounded-full">
                    {j.name}
                  </span>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Genjutsu */}
        <div className="mb-5">
          <h4 className="text-sm font-bold text-neutral-400 mb-2 uppercase tracking-wider">Genjutsus</h4>
          <div className="flex flex-wrap gap-2">
            {ninja.data.knownJutsus.map((id) => {
              const j = JUTSUS.find((x) => x.id === id);
              if (!j) return null;
              if (j.scaling === "genjutsu" || j.element === "Ilusão") {
                if (j.name !== "Sharingan" && j.name !== "Mangekyō Sharingan") {
                  return (
                    <span key={id} className="text-xs font-semibold bg-purple-900/40 border border-purple-800 px-3 py-1.5 rounded-full">
                      {j.name}
                    </span>
                  );
                }
              }
              return null;
            })}
          </div>
        </div>

        {/* Gerais */}
        <div className="mb-5">
          <h4 className="text-sm font-bold text-neutral-400 mb-2 uppercase tracking-wider">Jutsus Gerais</h4>
          <div className="flex flex-wrap gap-2">
            {ninja.data.knownJutsus.map((id) => {
              const j = JUTSUS.find((x) => x.id === id);
              if (!j) return null;
              const isNature = j.element === "Fogo" || j.element === "Água" || j.element === "Terra" || j.element === "Vento" || j.element === "Raio";
              const isGenjutsu = j.scaling === "genjutsu" || j.element === "Ilusão";
              const isModo = j.name.includes("Modo") || j.name.includes("Sharingan") || j.name.includes("Byakugan") || j.name.includes("Portão");
              
              if (!isNature && !isGenjutsu && !isModo) {
                return (
                  <span key={id} className="text-xs font-semibold bg-neutral-800 border border-neutral-700 px-3 py-1.5 rounded-full">
                    {j.name}
                  </span>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Modos */}
        <div>
          <h4 className="text-sm font-bold text-neutral-400 mb-2 uppercase tracking-wider">Modos</h4>
          <div className="flex flex-wrap gap-2">
            {ninja.data.knownJutsus.map((id) => {
              const j = JUTSUS.find((x) => x.id === id);
              if (!j) return null;
              const isModo = j.name.includes("Modo") || j.name.includes("Sharingan") || j.name.includes("Byakugan") || j.name.includes("Portão");
              if (isModo) {
                return (
                  <span key={id} className="text-xs font-semibold bg-red-900/40 border border-red-800 px-3 py-1.5 rounded-full text-red-200">
                    {j.name}
                  </span>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-800">
        <h3 className="text-lg font-bold mb-2">Ichiraku Ramen</h3>
        <p className="text-neutral-400 mb-4 text-sm">Ferido ou sem chakra? Uma tigela quente restaura tudo.</p>
        <button onClick={eatRamen} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center">
          <Flame className="w-5 h-5 mr-2" /> Comer no Ichiraku (150 Ryo)
        </button>
      </div>
    </motion.div>
  );
}

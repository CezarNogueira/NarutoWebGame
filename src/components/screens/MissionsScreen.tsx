import { motion } from "motion/react";
import { ScrollText } from "lucide-react";
import { useGameContext } from "../../contexts/GameContext";
import { MISSIONS } from "../../data";
import { MissionRank } from "../../types";

export function MissionsScreen() {
  const { ninja, setActiveMission } = useGameContext();
  if (!ninja) return null;

  const rankColor = (rank: MissionRank) => {
    switch (rank) {
      case "D": return "text-gray-400";
      case "C": return "text-blue-400";
      case "B": return "text-green-400";
      case "A": return "text-red-400";
      case "S": return "text-yellow-400";
      default: return "text-white";
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold">Missões Ninja</h2>
          <p className="text-neutral-400 text-sm mt-1">Complete missões para ganhar Ryo e XP.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {MISSIONS.map((m) => {
          const locked = ninja.data.level < m.recommendedLevel;
          return (
            <div key={m.id} className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{m.name}</h3>
                  <span className={`font-bold ${rankColor(m.rank)}`}>Rank {m.rank}</span>
                </div>
                <p className="text-sm text-neutral-400 mb-4">{m.description}</p>
                <div className="flex gap-4 text-xs font-semibold mb-4">
                  <span className="text-yellow-500">{m.reward} Ryo</span>
                  <span className="text-blue-400">{m.xpReward} XP</span>
                  <span className={locked ? "text-red-400" : "text-green-400"}>Rec. Nv {m.recommendedLevel}</span>
                </div>
              </div>
              <button
                disabled={locked}
                onClick={() => setActiveMission(m)}
                className="w-full bg-white hover:bg-neutral-200 disabled:opacity-30 disabled:hover:bg-white text-black font-bold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2"
              >
                <ScrollText className="w-4 h-4" /> {locked ? "Nível Insuficiente" : "Aceitar Missão"}
              </button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

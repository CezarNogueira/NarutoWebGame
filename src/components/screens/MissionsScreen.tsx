import { motion } from "motion/react";
import { ScrollText } from "lucide-react";
import { useGameContext } from "../../contexts/GameContext";
import { MISSIONS } from "../../data";
import { STORY_MISSIONS } from "../../storyData";
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { MissionRank } from "../../types";

export function MissionsScreen() {
  const [mode, setMode] = useState<"BOARD" | "STORY">("BOARD");
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

      
      <div className="flex gap-4 border-b border-neutral-800 pb-2">
        <button onClick={() => setMode("BOARD")} className={`pb-2 px-2 font-bold transition-colors ${mode === "BOARD" ? "text-white border-b-2 border-red-500" : "text-neutral-500 hover:text-neutral-300"}`}>
          Quadro de missões ninja
        </button>
        <button onClick={() => setMode("STORY")} className={`pb-2 px-2 font-bold transition-colors ${mode === "STORY" ? "text-white border-b-2 border-red-500" : "text-neutral-500 hover:text-neutral-300"}`}>
          Modo História
        </button>
      </div>

      {mode === "BOARD" && (
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
      )}

      {mode === "STORY" && (
        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {ninja.data.storyProgress >= STORY_MISSIONS.length && (
            <div className="p-5 rounded-xl border flex flex-col justify-center items-center gap-4 bg-green-500/10 border-green-500/30 text-center py-8">
              <BookOpen className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="font-bold text-lg text-green-400">Modo História Concluído!</h3>
                <p className="text-sm text-green-400/80 mt-1">Você completou todos os capítulos atuais.</p>
              </div>
            </div>
          )}
          {STORY_MISSIONS.map((m, i) => {
            const currentStoryProgress = ninja.data.storyProgress || 0;
            const isUnlocked = i <= currentStoryProgress;
            const isCompleted = i < currentStoryProgress;
            const isCurrent = i === currentStoryProgress;
            const locked = !isUnlocked || (ninja.data.level < m.recommendedLevel && !isCompleted);

            if (!isCurrent) return null;

            return (
              <div key={m.id} className={`p-5 rounded-xl border flex flex-col md:flex-row justify-between items-center gap-4 ${isCurrent ? "bg-red-500/10 border-red-500/50" : isCompleted ? "bg-green-500/5 border-green-500/20" : "bg-neutral-950 border-neutral-800 opacity-60"}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold bg-neutral-800 px-2 py-0.5 rounded text-neutral-400">Capítulo {i + 1}</span>
                    <h3 className={`font-bold text-lg ${isCompleted ? "text-neutral-400 line-through decoration-red-500/50" : "text-white"}`}>{m.name}</h3>
                  </div>
                  <p className="text-sm text-neutral-400 mb-2">{m.description}</p>
                  <div className="flex gap-4 text-xs font-semibold">
                    <span className="text-yellow-500">{m.reward} Ryo</span>
                    <span className="text-blue-400">{m.xpReward} XP</span>
                    <span className={ninja.data.level < m.recommendedLevel ? "text-red-400" : "text-green-400"}>Rec. Nv {m.recommendedLevel}</span>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <button
                    disabled={locked || isCompleted}
                    onClick={() => setActiveMission({ ...m, isStory: true, storyIndex: i } as any)}
                    className={`w-full md:w-auto px-6 py-2.5 rounded-lg font-bold transition-colors flex justify-center items-center gap-2 ${isCompleted ? "bg-neutral-800 text-neutral-500" : locked ? "bg-neutral-800 text-neutral-500" : "bg-red-600 hover:bg-red-500 text-white"}`}
                  >
                    <BookOpen className="w-4 h-4" /> 
                    {isCompleted ? "Concluído" : !isUnlocked ? "Bloqueado" : ninja.data.level < m.recommendedLevel ? "Nível Insuficiente" : "Jogar Capítulo"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </motion.div>
  );
}

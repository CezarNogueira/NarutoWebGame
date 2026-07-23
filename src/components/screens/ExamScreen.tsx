import { motion } from "motion/react";
import { ShieldAlert } from "lucide-react";
import { useGameContext } from "../../contexts/GameContext";

export function ExamScreen() {
  const { ninja, takeExam } = useGameContext();
  if (!ninja) return null;
  
  const nextRankInfo = ninja.nextRankInfo();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center justify-center py-8">
      <ShieldAlert className="w-20 h-20 text-neutral-700 mb-6" />
      <h2 className="text-3xl font-bold mb-3">Exame de Promoção</h2>
      <p className="text-neutral-400 max-w-md mb-6 text-sm">Prove seu valor e suba na hierarquia da aldeia.</p>

      <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-xl mb-6 w-full max-w-md text-left space-y-3">
        <div>
          <div className="text-sm text-neutral-400">Rank atual</div>
          <div className="text-2xl font-bold text-red-500">{ninja.data.rank}</div>
        </div>
        {nextRankInfo && (
          <div className="border-t border-neutral-800 pt-3 space-y-2">
            <div className="text-sm text-neutral-400">Para virar <span className="text-white font-bold">{nextRankInfo.nextRank}</span>:</div>
            <Requirement met={ninja.data.level >= nextRankInfo.reqLevel} label={`Nível ${nextRankInfo.reqLevel}`} current={`atual: ${ninja.data.level}`} />
            <Requirement met={ninja.data.missionsCompleted[nextRankInfo.rankReq] >= nextRankInfo.reqMissions} label={`${nextRankInfo.reqMissions} missões Rank ${nextRankInfo.rankReq}`} current={`atual: ${ninja.data.missionsCompleted[nextRankInfo.rankReq]}`} />
          </div>
        )}
      </div>

      <button onClick={takeExam} className="bg-white hover:bg-neutral-200 text-black font-bold py-4 px-12 rounded-xl shadow-lg transition-colors text-lg">
        Tentar Exame Ninja
      </button>
    </motion.div>
  );
}

function Requirement({ met, label, current }: { met: boolean; label: string; current: string }) {
  return (
    <div className={`flex justify-between items-center text-sm p-2 rounded-lg ${met ? "bg-green-500/10 text-green-400" : "bg-neutral-900 text-neutral-500"}`}>
      <span>{label}</span>
      <span className="font-bold">{current}</span>
    </div>
  );
}

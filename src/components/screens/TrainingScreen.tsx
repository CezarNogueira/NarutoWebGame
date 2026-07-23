import { motion } from "motion/react";
import { Flame, Sword, Eye, Wind, Droplet, Swords, HandFist } from "lucide-react";
import { useGameContext } from "../../contexts/GameContext";

export function TrainingScreen() {
  const { ninja, trainStat } = useGameContext();
  if (!ninja) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold">Campo de Treinamento</h2>
          <p className="text-neutral-400 text-sm mt-1">Gaste 30 Chakra para melhorar atributos (+1).</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-neutral-400">Dia</div>
          <div className="text-xl font-bold">{ninja.data.day}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <TrainingCard title="Treinar Ninjutsu" cost={30} ryoCost={0} onTrain={() => trainStat("ninjutsu", "Ninjutsu", 5, 1, 10)} icon={<Flame className="w-5 h-5 text-red-500" />} />
        <TrainingCard title="Treinar Taijutsu" cost={30} ryoCost={0} onTrain={() => trainStat("taijutsu", "Taijutsu", 5, 1, 10)} icon={<HandFist className="w-5 h-5 text-gray-400" />} />
        <TrainingCard title="Treinar Genjutsu" cost={30} ryoCost={0} onTrain={() => trainStat("genjutsu", "Genjutsu", 5, 1, 10)} icon={<Eye className="w-5 h-5 text-purple-500" />} />
        <TrainingCard title="Treinar Kenjutsu" cost={30} ryoCost={0} onTrain={() => trainStat("kenjutsu", "Kenjutsu", 5, 1, 5)} icon={<Swords className="w-5 h-5 text-pink-400" />} />
        <TrainingCard title="Correr com Pesos" cost={30} ryoCost={0} onTrain={() => trainStat("speed", "Velocidade", 5, 1, 15)} icon={<Wind className="w-5 h-5 text-teal-400" />} />
        <TrainingCard title="Meditação na Cachoeira" cost={30} ryoCost={0} onTrain={() => trainStat("stamina", "Fôlego", 5, 1, 5)} icon={<Droplet className="w-5 h-5 text-blue-300" />} />
      </div>
    </motion.div>
  );
}

function TrainingCard({ title, cost, ryoCost, onTrain, icon }: { title: string; cost: number; ryoCost: number; onTrain: () => void; icon: React.ReactNode }) {
  return (
    <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between items-center text-center">
      <div className="bg-neutral-900 p-3 rounded-full mb-3">{icon}</div>
      <h3 className="font-bold text-sm mb-1">{title}</h3>
      <div className="text-xs text-neutral-400 mb-4">{cost} Chakra</div>
      <button onClick={onTrain} className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-2 rounded-lg transition-colors text-xs">
        Treinar
      </button>
    </div>
  );
}

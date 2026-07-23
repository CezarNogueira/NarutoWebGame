import { motion } from "motion/react";
import { Flame, Sword, Eye, Wind, Shield, Swords, HandFist } from "lucide-react";
import { useGameContext } from "../../contexts/GameContext";

export function TrainingScreen() {
  const { ninja, trainStat } = useGameContext();
  if (!ninja) return null;

  const resourceLabel = ninja.data.clan === "Lee" ? "Vigor" : "Chakra";
  let statGain = 1;
  switch (ninja.data.rank) {
    case "Genin": statGain = 3; break;
    case "Chunin": statGain = 5; break;
    case "Jonin": statGain = 10; break;
    case "ANBU": statGain = 20; break;
    case "Kage": statGain = 50; break;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold">Campo de Treinamento</h2>
          <p className="text-neutral-400 text-sm mt-1">Gaste 30 {resourceLabel} para melhorar atributos (+{statGain}).</p>
          {ninja.data.trainedToday && <div className="text-red-400 text-sm mt-2 font-bold">Você já treinou hoje. Cumpra uma missão para passar o dia.</div>}
        </div>
        <div className="text-right">
          <div className="text-xs text-neutral-400">Dia</div>
          <div className="text-xl font-bold">{ninja.data.day}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <TrainingCard disabled={ninja.data.trainedToday} title="Treinar Ninjutsu" cost={30} resourceLabel={resourceLabel} onTrain={() => trainStat("ninjutsu", "Ninjutsu", 5, 1, 10)} icon={<Flame className="w-5 h-5 text-red-500" />} />
        <TrainingCard disabled={ninja.data.trainedToday} title="Treinar Taijutsu" cost={30} resourceLabel={resourceLabel} onTrain={() => trainStat("taijutsu", "Taijutsu", 5, 1, 10)} icon={<HandFist className="w-5 h-5 text-gray-400" />} />
        <TrainingCard disabled={ninja.data.trainedToday} title="Treinar Genjutsu" cost={30} resourceLabel={resourceLabel} onTrain={() => trainStat("genjutsu", "Genjutsu", 5, 1, 10)} icon={<Eye className="w-5 h-5 text-purple-500" />} />
        <TrainingCard disabled={ninja.data.trainedToday} title="Treinar Kenjutsu" cost={30} resourceLabel={resourceLabel} onTrain={() => trainStat("kenjutsu", "Kenjutsu", 5, 1, 5)} icon={<Swords className="w-5 h-5 text-pink-400" />} />
        <TrainingCard disabled={ninja.data.trainedToday} title="Correr com Pesos" cost={30} resourceLabel={resourceLabel} onTrain={() => trainStat("speed", "Velocidade", 5, 1, 15)} icon={<Wind className="w-5 h-5 text-teal-400" />} />
        <TrainingCard disabled={ninja.data.trainedToday} title="Meditação na Cachoeira" cost={30} resourceLabel={resourceLabel} onTrain={() => trainStat("stamina", "Resistência", 5, 1, 5)} icon={<Shield className="w-5 h-5 text-blue-300" />} />
      </div>
    </motion.div>
  );
}

function TrainingCard({ title, cost, resourceLabel, onTrain, icon, disabled }: { title: string; cost: number; resourceLabel: string; onTrain: () => void; icon: React.ReactNode, disabled?: boolean }) {
  return (
    <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between items-center text-center">
      <div className="bg-neutral-900 p-3 rounded-full mb-3">{icon}</div>
      <h3 className="font-bold text-sm mb-1">{title}</h3>
      <div className="text-xs text-neutral-400 mb-4">{cost} {resourceLabel}</div>
      <button onClick={onTrain} disabled={disabled} className={`w-full font-bold py-2 rounded-lg transition-colors text-xs ${disabled ? "bg-neutral-900 text-neutral-600 cursor-not-allowed" : "bg-neutral-800 hover:bg-neutral-700 text-white"}`}>
        Treinar
      </button>
    </div>
  );
}

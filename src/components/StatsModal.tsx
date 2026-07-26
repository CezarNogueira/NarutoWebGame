import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Ninja } from "../models/Ninja";

export default function StatsModal({ ninja, isOpen, onClose }: { ninja: Ninja, isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  const totalMissions = Object.values(ninja.data.missionsCompleted).reduce((a, b) => a + b, 0);
  const critChance = Math.min(55, ninja.getSpeedStat() * 0.35).toFixed(1);
  const dodgeChance = Math.min(80, 50 + (ninja.getSpeedStat() * 0.1)).toFixed(1);
  const dmgResist = Math.floor(ninja.data.stats.stamina / 5).toFixed(1);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-neutral-900 border border-neutral-700 p-6 rounded-2xl w-full max-w-sm relative z-10 shadow-2xl">
          <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
          
          <h2 className="text-xl font-bold mb-6 text-white text-center">Perfil Ninja</h2>

          <div className="mb-6 space-y-2">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-800 pb-2 mb-3">Estatísticas Gerais</h3>
            <div className="flex justify-between items-center"><span className="text-sm text-neutral-300">Clã</span><span className="text-sm font-bold text-white">{ninja.data.clan}</span></div>
            <div className="flex justify-between items-center"><span className="text-sm text-neutral-300">Rank</span><span className="text-sm font-bold text-white">{ninja.data.rank}</span></div>
            <div className="flex justify-between items-center"><span className="text-sm text-neutral-300">Dias como Ninja</span><span className="text-sm font-bold text-white">{ninja.data.day}</span></div>
            <div className="flex justify-between items-center"><span className="text-sm text-neutral-300">Total de Missões</span><span className="text-sm font-bold text-white">{totalMissions}</span></div>
            <div className="flex justify-between items-center"><span className="text-sm text-neutral-300">Modo História</span><span className="text-sm font-bold text-white">Capítulo {ninja.data.storyProgress ? ninja.data.storyProgress + 1 : 1}</span></div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-800 pb-2 mb-3">Estatísticas de Combate</h3>
            <div className="flex justify-between items-center"><span className="text-sm text-neutral-300">Chance de Crítico</span><span className="text-sm font-bold text-white">{critChance}%</span></div>
            <div className="flex justify-between items-center"><span className="text-sm text-neutral-300">Chance de Esquiva</span><span className="text-sm font-bold text-white">{dodgeChance}%</span></div>
            <div className="flex justify-between items-center"><span className="text-sm text-neutral-300">Dano Resistido</span><span className="text-sm font-bold text-white">{dmgResist}%</span></div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

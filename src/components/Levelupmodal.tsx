import { motion, AnimatePresence } from "motion/react";
import { Star, Heart, Zap, Plus, Sparkles, TrendingUp } from "lucide-react";
import { LevelUpInfo } from "../types";

export default function LevelUpModal({ info, onClose }: { info: LevelUpInfo | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {info && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-neutral-950/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="w-full max-w-sm bg-neutral-900 border border-amber-500/40 rounded-2xl shadow-[0_0_60px_-10px_rgba(245,158,11,0.35)] overflow-hidden"
          >
            {/* Cabeçalho */}
            <div className="relative bg-gradient-to-b from-amber-500/20 to-transparent px-6 pt-8 pb-6 text-center overflow-hidden">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-500/15 border border-amber-400/40 flex items-center justify-center"
              >
                <TrendingUp className="w-8 h-8 text-amber-400" />
              </motion.div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-400/80 mb-1">Nível Up!</p>
              <h2 className="text-2xl font-black text-white">
                Nível {info.fromLevel} <span className="text-amber-400">→</span> {info.toLevel}
              </h2>
            </div>

            {/* Ganhos */}
            <div className="px-6 pb-6 space-y-2">
              <GainRow icon={<Heart className="w-4 h-4 text-green-400" />} label="Vida Máxima" value={`+${info.healthGained}`} />
              <GainRow icon={<Zap className="w-4 h-4 text-blue-400" />} label={`${info.secondaryLabel} Máximo`} value={`+${info.secondaryGained}`} />
              <GainRow icon={<Plus className="w-4 h-4 text-amber-400" />} label="Pontos de Habilidade" value={`+${info.skillPoints}`} />

              {info.newJutsus.length > 0 && (
                <div className="mt-4 pt-4 border-t border-neutral-800">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Novas Técnicas
                  </p>
                  <div className="space-y-1.5">
                    {info.newJutsus.map((name, i) => (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.08 }}
                        className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/25 rounded-lg px-3 py-2"
                      >
                        <Star className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="text-sm font-semibold text-purple-200">{name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full mt-5 bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 rounded-xl transition-colors"
              >
                Continuar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GainRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5">
      <span className="flex items-center gap-2 text-sm text-neutral-300">
        {icon}
        {label}
      </span>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}

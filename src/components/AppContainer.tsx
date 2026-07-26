import { useState } from "react";
import { Zap, Activity, Flame, Sword, Eye, Wind, Shield, Plus, RotateCcw, Coins, Swords, HandFist } from "lucide-react";
import { useGameContext } from "../contexts/GameContext";
import { NinjaAvatar } from "../avatars";
import Battle from "../Battle";
import LevelUpModal from "./Levelupmodal";
import StatsModal from "./StatsModal";
import { Screen, Stats, MissionRank } from "../types";

import { CharacterCreationScreen } from "./screens/CharacterCreationScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { MissionsScreen } from "./screens/MissionsScreen";
import { TrainingScreen } from "./screens/TrainingScreen";
import { ShopScreen } from "./screens/ShopScreen";
import { ExamScreen } from "./screens/ExamScreen";
import { MastersScreen } from "./screens/MastersScreen";

function VitalBar({ label, icon, value, max, color }: { label: string; icon: React.ReactNode; value: number; max: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1 text-sm font-bold">
        <span className="flex items-center text-neutral-300">{icon}{label}</span>
        <span className="text-neutral-400">{Math.floor(value)} / {max}</span>
      </div>
      <div className="w-full bg-neutral-950 h-2.5 rounded-full overflow-hidden border border-neutral-800">
        <div className={`h-full ${color} transition-all duration-300`} style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </div>
  );
}

function StatBox({ label, statKey, value, icon, points, onAdd }: { label: string; statKey: keyof Stats; value: number; icon: React.ReactNode; points: number; onAdd: (s: keyof Stats) => void }) {
  return (
    <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 flex justify-between items-center group relative overflow-hidden">
      <div className="flex items-center gap-2 relative z-10">
        {icon}
        <div>
          <div className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">{label}</div>
          <div className="font-bold text-lg leading-none">{value}</div>
        </div>
      </div>
      {points > 0 && (
        <button onClick={() => onAdd(statKey)} className="w-6 h-6 bg-neutral-800 hover:bg-neutral-700 text-white rounded flex items-center justify-center transition-colors relative z-10">
          <Plus className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function AppContainer() {
  const { 
    ninja, 
    screen, 
    setScreen, 
    activeMission, 
    createNinja, 
    resetGame, 
    allocatePoint, 
    levelUpInfo,
    clearLevelUp,
    handleBattleEnd 
  } = useGameContext();
  const [confirmReset, setConfirmReset] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  if (screen === "START" || !ninja) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white font-sans flex items-center justify-center p-4">
        <CharacterCreationScreen onCreate={createNinja} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-20 md:pb-0">
      {activeMission && <Battle ninjaObj={ninja} mission={activeMission} onEnd={handleBattleEnd} />}
      <LevelUpModal info={levelUpInfo} onClose={clearLevelUp} />
      <StatsModal ninja={ninja} isOpen={isStatsModalOpen} onClose={() => setIsStatsModalOpen(false)} />
      
      {/* Navbar */}
      <nav className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-40 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer" onClick={() => setIsStatsModalOpen(true)}>
              <div className="w-14 h-14 rounded-full border-2 border-neutral-700 overflow-hidden bg-neutral-800 flex items-center justify-center hover:border-neutral-500 transition-colors">
                <NinjaAvatar id={ninja.data.avatarId} size={52} />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-neutral-900 border border-neutral-700 text-white text-[10px] font-black px-1.5 py-0.5 rounded flex items-center justify-center shadow-lg">
                Nv. {ninja.data.level}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-black text-xl leading-none mb-1 text-white">{ninja.data.name}</span>
              <span className="text-xs text-neutral-400 font-semibold tracking-wide flex items-center gap-1.5 flex-wrap">
                <span className="text-red-400">Clã {ninja.data.clan}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-700 hidden sm:block" />
                <span className="text-blue-400">{ninja.data.rank}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-700 hidden sm:block" />
                <span className="text-emerald-400">Aldeia da {ninja.data.village}</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
             <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1.5 text-yellow-500 font-bold bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/20 shadow-sm">
                  <Coins className="w-4 h-4" />
                  <span>{ninja.data.ryo.toLocaleString()} <span className="text-[10px] opacity-80 font-medium hidden sm:inline">Ryo</span></span>
                </div>
                <button onClick={resetGame} title="Novo Jogo" className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-red-500 transition-colors border border-neutral-700">
                  <RotateCcw className="w-4 h-4" />
                </button>
             </div>
             <div className="hidden sm:flex items-center gap-2 w-48 group">
                <div className="text-[10px] text-neutral-500 font-bold tracking-wider">XP</div>
                <div className="flex-1 bg-neutral-800 h-2.5 rounded-full overflow-hidden border border-neutral-700 relative">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full transition-all duration-500 ease-out" style={{ width: `${(ninja.data.xp / ninja.data.xpToNextLevel) * 100}%` }}></div>
                  <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white/90 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    {Math.floor(ninja.data.xp)} / {ninja.data.xpToNextLevel}
                  </div>
                </div>
             </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
            <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-2">
              <h2 className="text-xl font-bold">Status</h2>
              {ninja.data.skillPoints > 0 && (
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                  <Plus className="w-3 h-3" /> {ninja.data.skillPoints} pts
                </span>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <VitalBar label="Vida" icon={<Activity className="w-4 h-4 mr-1 text-green-500" />} value={ninja.data.health} max={ninja.getMaxHealth()} color="bg-green-500" />
              {ninja.data.clan === "Lee" ? (
                <VitalBar label="Vigor" icon={<Flame className="w-4 h-4 mr-1 text-orange-500" />} value={ninja.data.vigor} max={ninja.getMaxVigor()} color="bg-orange-500" />
              ) : (
                <VitalBar label="Chakra" icon={<Zap className="w-4 h-4 mr-1 text-blue-500" />} value={ninja.data.chakra} max={ninja.getMaxChakra()} color="bg-blue-500" />
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <StatBox label="Ninjutsu" statKey="ninjutsu" value={ninja.getNinjutsuStat()} icon={<Flame className="w-4 h-4 text-red-500" />} points={ninja.data.skillPoints} onAdd={allocatePoint} />
              <StatBox label="Taijutsu" statKey="taijutsu" value={ninja.getTaijutsuStat()} icon={<HandFist className="w-4 h-4 text-gray-400" />} points={ninja.data.skillPoints} onAdd={allocatePoint} />
              <StatBox label="Genjutsu" statKey="genjutsu" value={ninja.data.stats.genjutsu} icon={<Eye className="w-4 h-4 text-purple-500" />} points={ninja.data.skillPoints} onAdd={allocatePoint} />
              <StatBox label="Kenjutsu" statKey="kenjutsu" value={ninja.getKenjutsuStat()} icon={<Swords className="w-4 h-4 text-pink-400" />} points={ninja.data.skillPoints} onAdd={allocatePoint} />
              <StatBox label="Velocidade" statKey="speed" value={ninja.getSpeedStat()} icon={<Wind className="w-4 h-4 text-teal-400" />} points={ninja.data.skillPoints} onAdd={allocatePoint} />
              <StatBox label="Resistência" statKey="stamina" value={ninja.data.stats.stamina} icon={<Shield className="w-4 h-4 text-blue-300" />} points={ninja.data.skillPoints} onAdd={allocatePoint} />
            </div>
          </div>

        </div>

        {/* Main Content Area */}
        <div className="md:col-span-8 space-y-6">
          <div className="flex space-x-2 bg-neutral-900 p-2 rounded-xl border border-neutral-800 overflow-x-auto">
            {(["DASHBOARD", "MISSIONS", "TRAINING", "SHOP", "EXAM", "MASTERS"] as Screen[]).map((s) => (
              <button
                key={s}
                onClick={() => setScreen(s)}
                className={`flex-1 py-3 px-3 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${screen === s ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:bg-neutral-800/50 hover:text-white"}`}
              >
                {s === "DASHBOARD" && "Visão Geral"}
                {s === "MISSIONS" && "Missões"}
                {s === "TRAINING" && "Treino"}
                {s === "SHOP" && "Loja"}
                {s === "EXAM" && "Exame"}
                {s === "MASTERS" && "Mestres"}
              </button>
            ))}
          </div>

          <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 min-h-[520px]">
            {screen === "DASHBOARD" && <DashboardScreen />}
            {screen === "MISSIONS" && <MissionsScreen />}
            {screen === "TRAINING" && <TrainingScreen />}
            {screen === "SHOP" && <ShopScreen />}
            {screen === "EXAM" && <ExamScreen />}
            {screen === "MASTERS" && <MastersScreen />}
          </div>
        </div>
      </div>
    </div>
  );
}

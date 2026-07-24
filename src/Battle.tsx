import { useState } from "react";
import { Ninja as NinjaData, Mission, BattleOutcome, Jutsu } from "./types";
import { Ninja as NinjaModel } from "./models/Ninja";
import { JUTSUS, ITEMS } from "./data";
import { NinjaAvatar } from "./avatars";
import { motion, AnimatePresence } from "motion/react";
import { Swords, Sparkles, FlaskConical, Footprints, Heart, Zap, ShieldCheck } from "lucide-react";

type Phase = "player" | "enemy" | "over";
type Menu = "root" | "jutsu" | "item";

const variance = () => 0.85 + Math.random() * 0.3;

export default function Battle({ ninjaObj, mission, onEnd }: { ninjaObj: NinjaModel; mission: Mission; onEnd: (o: BattleOutcome) => void }) {
  const ninja = ninjaObj.data;
  const enemy = mission.enemy;
  const [pHp, setPHp] = useState(ninja.health);
  const [tempShield, setTempShield] = useState(0);
  const [pChakra, setPChakra] = useState(ninja.chakra);
  const [pVigor, setPVigor] = useState(ninja.vigor);
  const isLee = ninja.clan === "Lee";
  const [eHp, setEHp] = useState(enemy.maxHp);
  const [boostTurns, setBoostTurns] = useState(0);
  const [boostAmt, setBoostAmt] = useState(0);
  const [paralyzeTurns, setParalyzeTurns] = useState(0);
  const [pParalyzeTurns, setPParalyzeTurns] = useState(0);
  const [eBoostTurns, setEBoostTurns] = useState(0);
  const [eBoostAmt, setEBoostAmt] = useState(0);
  const [deathTimer, setDeathTimer] = useState<number | null>(null);
  const [inv, setInv] = useState<Record<string, number>>({ ...ninja.inventory });
  const [usedItems, setUsedItems] = useState<Record<string, number>>({});
  const [log, setLog] = useState<{ id: number; t: string; k: "you" | "foe" | "info" }[]>([
    { id: 0, t: `${enemy.name} apareceu! Que a batalha comece.`, k: "info" },
  ]);
  const [phase, setPhase] = useState<Phase>("player");
  const [menu, setMenu] = useState<Menu>("root");
  const [shake, setShake] = useState<"" | "foe" | "you">("");
  const [outcome, setOutcome] = useState<BattleOutcome | null>(null);

  const playerDefense = Math.round(ninjaObj.getTaijutsuStat() * 0.12 + ninja.level * 1.2) + Math.floor(ninja.stats.stamina / 5);

  const addLog = (t: string, k: "you" | "foe" | "info") =>
    setLog((prev) => [{ id: Date.now() + Math.random(), t, k }, ...prev].slice(0, 8));

  const finish = (result: "win" | "lose" | "flee", hp: number, chakra: number, vigor: number, items: Record<string, number>) => {
    setPhase("over");
    setOutcome({ result, health: Math.max(0, Math.round(hp)), chakra: Math.round(chakra), vigor: Math.round(vigor), usedItems: items });
  };

  // ---- dano do jogador ----
const calcPlayerDamage = (scaling: keyof NinjaData["stats"], power: number, critBonus = 0) => {
    let statVal = ninja.stats[scaling];
    if (scaling === "taijutsu") statVal = ninjaObj.getTaijutsuStat();
    else if (scaling === "kenjutsu") statVal = ninjaObj.getKenjutsuStat();
    else if (scaling === "speed") statVal = ninjaObj.getSpeedStat();
    else if (scaling === "ninjutsu") statVal = ninjaObj.getNinjutsuStat();
    let dmg = (statVal * (power / 60) + ninja.level * 2) * variance();
    if (boostTurns > 0) dmg *= 1 + boostAmt;

    let clanMult = 1.0;
    if (ninja.clan === "Uchiha") {
      if (ninja.level >= 40) clanMult += 0.75;
      else if (ninja.level >= 20) clanMult += 0.25;
      else if (ninja.level >= 10) clanMult += 0.15;
      else clanMult += 0.05;
    }
    if (ninja.clan === "Senju" && ninja.level >= 30) clanMult += 0.20;
    if (ninja.clan === "Hyūga") clanMult += 0.20;

    dmg *= clanMult;

    dmg -= enemy.defense;
    const critChance = Math.min(55, ninjaObj.getSpeedStat() * 0.35 + critBonus);
    const crit = Math.random() * 100 < critChance;
    if (crit) dmg *= 1.8;
    return { dmg: Math.max(1, Math.round(dmg)), crit };
  };

  const afterPlayer = (newEHp: number, snapHp: number, snapChakra: number, snapVigor: number, snapItems: Record<string, number>) => {
    setShake("foe");
    setTimeout(() => setShake(""), 300);
    if (newEHp <= 0) {
      setEHp(0);
      addLog(`${enemy.name} foi derrotado!`, "you");
      setTimeout(() => finish("win", snapHp, snapChakra, snapVigor, snapItems), 500);
      return;
    }
    setEHp(newEHp);
    
    let currentBoostTurns = boostTurns;
    if (currentBoostTurns > 0) {
      currentBoostTurns -= 1;
      setBoostTurns(currentBoostTurns);
    }

    if (deathTimer !== null) {
      const newTimer = deathTimer - 1;
      setDeathTimer(newTimer);
      if (newTimer <= 0) {
        setPHp(1);
        addLog("O efeito do Oitavo Portão terminou! Sua força vital se esgotou.", "info");
        setTimeout(() => finish("lose", 1, snapChakra, snapVigor, snapItems), 1000);
        return;
      }
    }

    if (paralyzeTurns > 0) {
      setParalyzeTurns(t => t - 1);
      addLog(`${enemy.name} está paralisado!`, "info");
      // Check if player is paralyzed before passing turn
      if (pParalyzeTurns > 0) {
        setPParalyzeTurns(t => t - 1);
        addLog(`Você está paralisado e perdeu a vez!`, "info");
        setTimeout(() => enemyTurn(snapHp, snapChakra, snapVigor, snapItems), 800);
        return;
      }
      setPhase("player");
      setMenu("root");
      return;
    }

    if (pParalyzeTurns > 0) {
      setPParalyzeTurns(t => t - 1);
      addLog(`Você está paralisado e perdeu a vez!`, "info");
      setTimeout(() => enemyTurn(snapHp, snapChakra, snapVigor, snapItems), 800);
      return;
    }
    setPhase("enemy");
    setTimeout(() => enemyTurn(snapHp, snapChakra, snapVigor, snapItems), 800);
  };

  // ---- turno do inimigo ----
  const enemyTurn = (snapHp: number, snapChakra: number, snapVigor: number, snapItems: Record<string, number>) => {
    const healMove = enemy.moves.find((m) => m.heal);
    let move = enemy.moves[Math.floor(Math.random() * enemy.moves.length)];
    if (healMove && eHp < enemy.maxHp * 0.5 && Math.random() < 0.6) move = healMove;

    if (move.heal) {
      setEHp((h) => Math.min(enemy.maxHp, h + move.heal!));
      addLog(`${enemy.name} usou ${move.name} e recuperou ${move.heal} de vida!`, "foe");
      setPhase("player");
      setMenu("root");
      return;
    }

    if (eBoostTurns > 0) {
      setEBoostTurns(t => t - 1);
    }
    
    if (move.buffAmount) {
      setEBoostAmt(move.buffAmount);
      setEBoostTurns(move.buffTurns || 3);
      addLog(`${enemy.name} usou ${move.name} e aumentou seu dano!`, "foe");
      setPhase("player");
      setMenu("root");
      return;
    }
    if (move.paralyzeTurns) {
      setPParalyzeTurns(move.paralyzeTurns);
      addLog(`${enemy.name} usou ${move.name}! Você ficará paralisado por ${move.paralyzeTurns} turnos.`, "foe");
      setPhase("player");
      setMenu("root");
      return;
    }

    let dmg = move.power * variance() - playerDefense - tempShield;
    if (eBoostTurns > 0) dmg *= (1 + eBoostAmt);
    if (tempShield > 0) {
      addLog(`Seu escudo bloqueou parte do dano!`, `info`);
      setTempShield(0);
    }
    const crit = Math.random() < 0.08;
    if (crit) dmg *= 1.7;
    dmg = Math.max(1, Math.round(dmg));
    const newHp = snapHp - dmg;
    setPHp(Math.max(0, newHp));
    setShake("you");
    setTimeout(() => setShake(""), 300);
    addLog(`${enemy.name} usou ${move.name}${crit ? " (CRÍTICO!)" : ""} e causou ${dmg} de dano.`, "foe");

    if (newHp <= 0) {
      addLog(`Você caiu em combate...`, "info");
      setTimeout(() => finish("lose", 0, snapChakra, snapVigor, snapItems), 500);
      return;
    }
    setPhase("player");
    setMenu("root");
  };

  // ---- ações do jogador ----
  const basicAttack = () => {
    if (phase !== "player") return;
    setPhase("enemy");
    const { dmg, crit } = calcPlayerDamage("taijutsu", 5, 6);
    addLog(`Você atacou${crit ? " (CRÍTICO!)" : ""} e causou ${dmg} de dano.`, "you");
    afterPlayer(eHp - dmg, pHp, pChakra, pVigor, usedItems);
  };

  const useJutsu = (j: Jutsu) => {
    if (phase !== "player") return;

    const resource = isLee ? pVigor : pChakra;
    const cost = j.chakraCost ?? 0;

    if (resource < cost) {
      addLog(`${isLee ? "Vigor" : "Chakra"} insuficiente para ${j.name}.`, "info");
      return;
    }
    
    let currentHp = pHp;
    if (j.healthCostPercent) {
      const cost = Math.round(ninjaObj.getMaxHealth() * j.healthCostPercent);
      if (currentHp <= cost && !j.deathAfterBuff) {
        addLog(`Vida insuficiente para ${j.name}.`, "info");
        return;
      }
      currentHp = Math.max(1, currentHp - cost);
      setPHp(currentHp);
    }

    setPhase("enemy");
    setMenu("root");
    const newResource = resource - cost;
    const newChakra = isLee ? pChakra : newResource;
    const newVigor = isLee ? newResource : pVigor;
    if (isLee) setPVigor(newVigor);
    else setPChakra(newChakra);

    if (j.defense && j.defense > 0) {
      setTempShield(j.defense);
    }

    if (j.kind === "paralyze") {
      const turns = j.paralyzeTurns ?? 2;
      setParalyzeTurns(turns);
      addLog(`Você usou ${j.name}! O inimigo ficará paralisado por ${turns} turnos.`, "you");
      afterPlayer(eHp, currentHp, newChakra, newVigor, usedItems);
      return;
    }

    if (j.kind === "heal") {
      const heal = Math.round(ninjaObj.getMaxHealth() * (j.healPercent ?? 0.3));
      currentHp = Math.min(ninjaObj.getMaxHealth(), currentHp + heal);
      setPHp(currentHp);
      addLog(`Você usou ${j.name} e recuperou ${heal} de vida.`, "you");
      setPhase("enemy");
      setTimeout(() => enemyTurn(currentHp, newChakra, newVigor, usedItems), 800);
      return;
    }
    
    if (j.kind === "buff") {
      if (j.buffTurns || j.buffAmount) {
        setBoostTurns(j.buffTurns ?? 3);
        setBoostAmt(j.buffAmount ?? 0.5);
        addLog(`Você usou ${j.name}! Dano aumentado por ${j.buffTurns ?? 3} turnos.`, "you");
      } else {
        addLog(`Você usou ${j.name}!`, "you");
      }
      
      if (j.healPercent) {
        const heal = Math.round(ninjaObj.getMaxHealth() * j.healPercent);
        currentHp = Math.min(ninjaObj.getMaxHealth(), currentHp + heal);
        setPHp(currentHp);
        addLog(`Você também recuperou ${heal} de vida.`, "you");
      }
      
      if (j.deathAfterBuff) {
        setDeathTimer(j.buffTurns ?? 3);
      }
      
      setPhase("enemy");
      setTimeout(() => enemyTurn(currentHp, newChakra, newVigor, usedItems), 800);
      return;
    }
    // attack
    const { dmg, crit } = calcPlayerDamage(j.scaling, j.power, j.critBonus ?? 0);
    addLog(`Você usou ${j.name}${crit ? " (CRÍTICO!)" : ""} e causou ${dmg} de dano.`, "you");
    afterPlayer(eHp - dmg, currentHp, newChakra, newVigor, usedItems);
  };

  const useItem = (itemId: string) => {
    if (phase !== "player") return;
    const item = ITEMS.find((i) => i.id === itemId);
    if (!item || (inv[itemId] ?? 0) <= 0) return;

    const newInv = { ...inv, [itemId]: inv[itemId] - 1 };
    const newUsed = { ...usedItems, [itemId]: (usedItems[itemId] ?? 0) + 1 };
    setInv(newInv);
    setUsedItems(newUsed);
    setMenu("root");
    setPhase("enemy");

    let newHp = pHp;
    let newChakra = pChakra;
    let newVigor = pVigor;
    if (item.fullRestore) {
      newHp = ninjaObj.getMaxHealth();
      newChakra = ninjaObj.getMaxChakra();
      newVigor = ninjaObj.getMaxVigor();
      addLog(`Você usou ${item.name}. Vida e ${isLee ? "Vigor" : "Chakra"} restaurados!`, "you");
    } else {
      if (item.healAmount) {
        newHp = Math.min(ninjaObj.getMaxHealth(), pHp + item.healAmount);
        addLog(`Você usou ${item.name} e recuperou ${item.healAmount} de vida.`, "you");
      }
      if (item.chakraAmount) {
        if (isLee) {
          newVigor = Math.min(ninjaObj.getMaxVigor(), pVigor + item.chakraAmount);
          addLog(`Você usou ${item.name} e recuperou ${item.chakraAmount} de vigor.`, "you");
        } else {
          newChakra = Math.min(ninjaObj.getMaxChakra(), pChakra + item.chakraAmount);
          addLog(`Você usou ${item.name} e recuperou ${item.chakraAmount} de chakra.`, "you");
        }
      }
    }
    setPHp(newHp);
    setPChakra(newChakra);
    setPVigor(newVigor);
    setTimeout(() => enemyTurn(newHp, newChakra, newVigor, newUsed), 800);
  };

  const flee = () => {
    if (phase !== "player") return;
    const chance = Math.min(90, 40 + (ninjaObj.getSpeedStat() - enemy.speed) * 2);
    if (Math.random() * 100 < chance) {
      addLog("Você conseguiu escapar da batalha!", "info");
      setTimeout(() => finish("flee", pHp, pChakra, pVigor, usedItems), 400);
    } else {
      addLog("Falha na fuga!", "info");
      setPhase("enemy");
      setTimeout(() => enemyTurn(pHp, pChakra, pVigor, usedItems), 700);
    }
  };

  const knownJutsus = JUTSUS.filter((j) => ninja.knownJutsus.includes(j.id) && (ninja.clan !== "Lee" || j.scaling === "taijutsu"));
  const battleItems = ITEMS.filter((i) => i.usableInBattle && (inv[i.id] ?? 0) > 0);

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Cabeçalho */}
        <div className="px-6 py-3 border-b border-neutral-800 flex items-center justify-between bg-gradient-to-r from-red-950/40 to-neutral-900">
          <span className="text-sm font-bold uppercase tracking-widest text-red-400 flex items-center gap-2">
            <Swords className="w-4 h-4" /> Batalha · Rank {mission.rank}
          </span>
          <span className="text-xs text-neutral-400">{mission.name}</span>
        </div>

        {/* Arena */}
        <div className="p-6 grid grid-cols-2 gap-6 items-end bg-[radial-gradient(ellipse_at_center,#1f2937_0%,#0a0a0a_100%)]">
          {/* Jogador */}
          <motion.div animate={shake === "you" ? { x: [0, -8, 8, -6, 0] } : {}} transition={{ duration: 0.3 }} className="flex flex-col items-center">
            <NinjaAvatar id={ninja.avatarId} size={92} className="rounded-2xl drop-shadow-lg" />
            <div className="mt-3 w-full">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold">{ninja.name}</span>
                <span className="text-neutral-400">Nv {ninja.level}</span>
              </div>
              <Bar value={pHp} max={ninjaObj.getMaxHealth()} color="bg-green-500" icon={<Heart className="w-3 h-3 text-green-400" />} />
              {isLee ? (
                <Bar value={pVigor} max={ninjaObj.getMaxVigor()} color="bg-orange-500" icon={<Zap className="w-3 h-3 text-orange-400" />} />
              ) : (
                <Bar value={pChakra} max={ninjaObj.getMaxChakra()} color="bg-blue-500" icon={<Zap className="w-3 h-3 text-blue-400" />} />
              )}
              {boostTurns > 0 && (
                <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3" /> Dano +{Math.round(boostAmt * 100)}% ({boostTurns})
                </div>
              )}
            </div>
          </motion.div>

          {/* Inimigo */}
          <motion.div animate={shake === "foe" ? { x: [0, 8, -8, 6, 0] } : {}} transition={{ duration: 0.3 }} className="flex flex-col items-center">
            {enemy.avatarId ? <NinjaAvatar id={enemy.avatarId} size={92} className="rounded-2xl drop-shadow-lg" /> : <div className="w-[92px] h-[92px] rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-5xl drop-shadow-lg">{enemy.emoji}</div>}
            <div className="mt-3 w-full">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-red-300">{enemy.name}</span>
              </div>
              <Bar value={eHp} max={enemy.maxHp} color="bg-red-500" icon={<Heart className="w-3 h-3 text-red-400" />} />
            </div>
          </motion.div>
        </div>

        {/* Log */}
        <div className="px-6 py-3 h-24 overflow-y-auto custom-scrollbar bg-neutral-950 border-y border-neutral-800 space-y-1">
          <AnimatePresence initial={false}>
            {log.map((l) => (
              <motion.p
                key={l.id}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm ${l.k === "you" ? "text-green-300" : l.k === "foe" ? "text-red-300" : "text-neutral-400 italic"}`}
              >
                {l.t}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>

        {/* Menu de ações */}
        <div className="p-4 min-h-[132px]">
          {phase === "over" && outcome ? (
            <ResultPanel outcome={outcome} mission={mission} onContinue={() => onEnd(outcome)} />
          ) : menu === "root" ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ActionBtn disabled={phase !== "player"} onClick={basicAttack} icon={<Swords className="w-5 h-5" />} label="Atacar" hint="Grátis" />
              <ActionBtn disabled={phase !== "player"} onClick={() => setMenu("jutsu")} icon={<Sparkles className="w-5 h-5" />} label="Jutsu" hint={`${knownJutsus.length} disp.`} />
              <ActionBtn disabled={phase !== "player"} onClick={() => setMenu("item")} icon={<FlaskConical className="w-5 h-5" />} label="Item" hint={`${battleItems.length} disp.`} />
              <ActionBtn disabled={phase !== "player"} onClick={flee} icon={<Footprints className="w-5 h-5" />} label="Fugir" hint="Escapar" />
            </div>
          ) : menu === "jutsu" ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                {knownJutsus.map((j) => (
                  <button
                    key={j.id}
                    disabled={
                      phase !== "player" ||
                      (isLee ? pVigor : pChakra) < (j.chakraCost ?? 0)
                    }
                    onClick={() => useJutsu(j)}
                    className="text-left p-3 rounded-lg border border-neutral-700 bg-neutral-800 hover:border-red-500 disabled:opacity-40 disabled:hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">{j.name}</span>
                      <span className={`text-[10px] font-bold ${isLee ? "text-orange-400" : "text-blue-400"}`}>{j.chakraCost} {isLee ? "VG" : "CK"}</span>
                    </div>
                    <div className="text-[11px] text-neutral-400">{j.element} · {j.kind === "attack" ? `Poder ${j.power}` : j.kind === "heal" ? "Cura" : "Buff"}</div>
                  </button>
                ))}
              </div>
              <BackBtn onClick={() => setMenu("root")} />
            </div>
          ) : (
            <div>
              {battleItems.length === 0 ? (
                <p className="text-sm text-neutral-500 italic py-4 text-center">Nenhum item de batalha na mochila.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {battleItems.map((i) => (
                    <button
                      key={i.id}
                      disabled={phase !== "player"}
                      onClick={() => useItem(i.id)}
                      className="text-left p-3 rounded-lg border border-neutral-700 bg-neutral-800 hover:border-emerald-500 disabled:opacity-40 transition-colors flex justify-between items-center"
                    >
                      <div>
                        <div className="font-bold text-sm">{i.name}</div>
                        <div className="text-[11px] text-neutral-400">{i.description}</div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 shrink-0 ml-2">x{inv[i.id]}</span>
                    </button>
                  ))}
                </div>
              )}
              <BackBtn onClick={() => setMenu("root")} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Bar({ value, max, color, icon }: { value: number; max: number; color: string; icon: React.ReactNode }) {
  const pct = Math.max(0, Math.min(100, max > 0 ? (value / max) * 100 : 0));
  return (
    <div className="flex items-center gap-1.5 mb-1">
      {icon}
      <div className="flex-1 bg-neutral-800 h-2 rounded-full overflow-hidden">
        <div className={`${color} h-full transition-all duration-300`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] text-neutral-400 w-14 text-right tabular-nums">{Math.max(0, Math.round(value))}/{max}</span>
    </div>
  );
}

function ActionBtn({ onClick, disabled, icon, label, hint }: { onClick: () => void; disabled: boolean; icon: React.ReactNode; label: string; hint: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl border border-neutral-700 bg-neutral-800 hover:border-red-500 hover:bg-neutral-750 disabled:opacity-40 disabled:hover:border-neutral-700 transition-all"
    >
      <span className="text-red-400">{icon}</span>
      <span className="font-bold text-sm">{label}</span>
      <span className="text-[10px] text-neutral-500">{hint}</span>
    </button>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="mt-3 text-xs text-neutral-400 hover:text-white transition-colors">
      ← Voltar
    </button>
  );
}

function ResultPanel({ outcome, mission, onContinue }: { outcome: BattleOutcome; mission: Mission; onContinue: () => void }) {
  const win = outcome.result === "win";
  const fled = outcome.result === "flee";
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-2">
      <h3 className={`text-2xl font-black mb-1 ${win ? "text-green-400" : fled ? "text-neutral-300" : "text-red-500"}`}>
        {win ? "VITÓRIA!" : fled ? "Você fugiu" : "DERROTA"}
      </h3>
      {win && (
        <p className="text-sm text-neutral-300 mb-3">
          Recompensa: <span className="text-yellow-400 font-bold">+{mission.reward.toLocaleString()} Ryo</span> ·{" "}
          <span className="text-blue-400 font-bold">+{mission.xpReward} XP</span>
        </p>
      )}
      {!win && !fled && <p className="text-sm text-neutral-400 mb-3">Você foi levado ao hospital e perdeu parte do seu Ryo.</p>}
      {fled && <p className="text-sm text-neutral-400 mb-3">Sem recompensas, mas você vive para lutar outro dia.</p>}
      <button onClick={onContinue} className="bg-white hover:bg-neutral-200 text-black font-bold py-2.5 px-10 rounded-xl transition-colors">
        Continuar
      </button>
    </motion.div>
  );
}

import { useState } from "react";
import { Ninja as NinjaData, Mission, BattleOutcome, Jutsu } from "./types";
import { Ninja as NinjaModel } from "./models/Ninja";
import { JUTSUS, ITEMS } from "./data";
import { NinjaAvatar } from "./avatars";
import { motion, AnimatePresence } from "motion/react";
import { Swords, Sparkles, FlaskConical, Footprints, Heart, Zap, ShieldCheck } from "lucide-react";

type Phase = "player" | "enemy" | "over";
type Menu = "root" | "jutsu" | "item" | "attack";

const variance = () => 0.85 + Math.random() * 0.3;

// 5% base, sobe até 60% conforme a velocidade
const calcDodgeChance = (speed: number) => Math.min(0.6, 0.05 + speed * 0.0037);

type ActiveBuff = {
  id: string;
  type: "ocular" | "gate" | "general";
  turns: number;
  amount: number;
  name: string;
};

const getBuffType = (id: string): "ocular" | "gate" | "general" => {
  if (id.startsWith("j_uchiha_sharingan") || id === "j_uchiha_mangekyou" || id === "j_uchiha_susanoo" || id === "j_hyuga_byakugan" || id === "j_uchiha_reflexo") return "ocular";
  if (id.startsWith("j_gate_")) return "gate";
  return "general";
};

export default function Battle({ ninjaObj, mission, onEnd }: { ninjaObj: NinjaModel; mission: Mission; onEnd: (o: BattleOutcome) => void }) {
  const ninja = ninjaObj.data;
  const enemy = mission.enemy;
  const [pHp, setPHp] = useState(ninja.health);
  const [tempShield, setTempShield] = useState(0);
  const [pChakra, setPChakra] = useState(ninja.chakra);
  const [pVigor, setPVigor] = useState(ninja.vigor);
  const isLee = ninja.clan === "Lee";
  const [eHp, setEHp] = useState(enemy.maxHp);
  const [activeBuffs, setActiveBuffs] = useState<ActiveBuff[]>([]);
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
  const [weaponUses, setWeaponUses] = useState<Record<string, number>>({});

  const playerDefense = Math.round(ninjaObj.getTaijutsuStat() * 0.12 + ninja.level * 1.2) + Math.floor(ninja.stats.stamina / 5);

  const addLog = (t: string, k: "you" | "foe" | "info") =>
    setLog((prev) => [{ id: Date.now() + Math.random(), t, k }, ...prev].slice(0, 8));

  const finish = (result: "win" | "lose" | "flee", hp: number, chakra: number, vigor: number, items: Record<string, number>) => {
    setPhase("over");
    setOutcome({ result, health: Math.max(0, Math.round(hp)), chakra: Math.round(chakra), vigor: Math.round(vigor), usedItems: items });
  };

  // ---- dano do jogador ----
const calcPlayerDamage = (scaling: keyof NinjaData["stats"], power: number, critBonus = 0, customStatVal?: number) => {
    let statVal = customStatVal ?? ninja.stats[scaling];
    if (customStatVal === undefined) {
        if (scaling === "taijutsu") statVal = ninjaObj.getTaijutsuStat();
        else if (scaling === "kenjutsu") statVal = ninjaObj.getKenjutsuStat();
        else if (scaling === "speed") statVal = ninjaObj.getSpeedStat();
        else if (scaling === "ninjutsu") statVal = ninjaObj.getNinjutsuStat();
    }
    let dmg = (statVal * (power / 60) + ninja.level * 2) * variance();
    const ocularBoost = activeBuffs.filter(b => b.type === "ocular").reduce((sum, b) => sum + b.amount, 0);
    const otherBoost = activeBuffs.filter(b => b.type !== "ocular").reduce((sum, b) => sum + b.amount, 0);
    
    let totalBoost = otherBoost;
    if (["taijutsu", "kenjutsu", "ninjutsu", "genjutsu"].includes(scaling)) {
        totalBoost += ocularBoost;
    }
    
    if (totalBoost > 0) dmg *= 1 + totalBoost;

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
    
    setActiveBuffs(prev => prev.map(b => ({ ...b, turns: b.turns - 1 })).filter(b => b.turns > 0));

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
    
    const playerDodgeChance = calcDodgeChance(ninjaObj.getSpeedStat());
    if (Math.random() < playerDodgeChance) {
      addLog(`${enemy.name} usou ${move.name}, mas você se esquivou!`, "you");
      setPhase("player");
      setMenu("root");
      return;
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
  const performPhysicalAttack = (type: "soco" | "chute" | "katana" | "kunai" | "shuriken" | "fuuma") => {
    if (phase !== "player") return;

    if (type === "katana" && (weaponUses["katana"] || 0) >= 20) {
      addLog("Você já usou a Katana 20 vezes nesta batalha!", "info");
      return;
    }
    if (type === "shuriken" && (weaponUses["shuriken"] || 0) >= 3) {
      addLog("Você já usou Shuriken 3 vezes nesta batalha!", "info");
      return;
    }
    if (type === "fuuma" && (weaponUses["fuuma"] || 0) >= 2) {
      addLog("Você já usou a Fuuma Shuriken 2 vezes nesta batalha!", "info");
      return;
    }

    if (["katana", "shuriken", "fuuma"].includes(type)) {
      setWeaponUses(prev => ({ ...prev, [type]: (prev[type] || 0) + 1 }));
    }

    setPhase("enemy");
    setMenu("root");

    let scaling: keyof NinjaData["stats"] = "taijutsu";
    let power = 5;
    let name = "atacou";
    let customStatVal: number | undefined = undefined;

    if (type === "soco") {
        scaling = "taijutsu";
        power = 15;
        name = "deu um Soco";
    } else if (type === "chute") {
        scaling = "speed";
        power = 12;
        name = "deu um Chute";
        customStatVal = Math.round(ninjaObj.getTaijutsuStat() * 0.5 + ninjaObj.getSpeedStat());
    } else if (type === "katana") {
        scaling = "kenjutsu";
        power = 34; // same as item
        name = "atacou com a Katana";
    } else if (type === "kunai") {
        scaling = "kenjutsu";
        power = 14;
        name = "arremessou uma Kunai";
    } else if (type === "shuriken") {
        scaling = "kenjutsu";
        power = 9;
        name = "lançou Shurikens";
    } else if (type === "fuuma") {
        scaling = "kenjutsu";
        power = 30;
        name = "arremessou a Fuuma Shuriken";
    }

    const { dmg, crit } = calcPlayerDamage(scaling, power, 6, customStatVal);
    const enemyDodgeChance = calcDodgeChance(enemy.speed);
    if (Math.random() < enemyDodgeChance) {
      addLog(`Você ${name}, mas ${enemy.name} se esquivou!`, "foe");
      afterPlayer(eHp, pHp, pChakra, pVigor, usedItems);
      return;
    }
    addLog(`Você ${name}${crit ? " (CRÍTICO!)" : ""} e causou ${dmg} de dano.`, "you");
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
        const bType = getBuffType(j.id);
        setActiveBuffs(prev => {
          let next = [...prev];
          if (bType === "ocular" || bType === "gate") {
            next = next.filter(b => b.type !== bType);
          }
          next.push({ id: j.id, type: bType, turns: j.buffTurns ?? 3, amount: j.buffAmount ?? 0.5, name: j.name });
          return next;
        });
        addLog(`Você usou ${j.name}! Modificador ativado por ${j.buffTurns ?? 3} turnos.`, "you");
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
    const enemyDodgeChance = Math.min(0.8, 0.5 + (enemy.speed * 0.001));
    if (Math.random() < enemyDodgeChance) {
      addLog(`Você usou ${j.name}, mas ${enemy.name} se esquivou!`, "foe");
      afterPlayer(eHp, currentHp, newChakra, newVigor, usedItems);
      return;
    }
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
              {activeBuffs.map(b => (
                <div key={b.id} className="mt-1 mr-1 inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3" /> {b.name} {b.amount > 0 ? `+${Math.round(b.amount * 100)}%` : ""} ({b.turns}T)
                </div>
              ))}
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
          ) : menu === "attack" ? (
            <div className="space-y-3">
              <div className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-2">Taijutsu</div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button onClick={() => performPhysicalAttack("soco")} className="bg-neutral-800 hover:bg-neutral-700 p-2 rounded-lg text-sm font-bold border border-neutral-700 transition-colors text-left">
                  <div className="text-white">Soco</div>
                  <div className="text-[10px] text-neutral-400 font-normal">Foco em Taijutsu</div>
                </button>
                <button onClick={() => performPhysicalAttack("chute")} className="bg-neutral-800 hover:bg-neutral-700 p-2 rounded-lg text-sm font-bold border border-neutral-700 transition-colors text-left">
                  <div className="text-white">Chute</div>
                  <div className="text-[10px] text-neutral-400 font-normal">Taijutsu + Velocidade</div>
                </button>
              </div>

              <div className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-2">Kenjutsu (Armas)</div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {ninja.inventory["w_katana"] || ninja.ownedGear.includes("w_katana") ? (
                  <button onClick={() => performPhysicalAttack("katana")} disabled={(weaponUses["katana"] || 0) >= 20} className={`bg-neutral-800 hover:bg-neutral-700 p-2 rounded-lg text-sm font-bold border border-neutral-700 transition-colors text-left ${(weaponUses["katana"] || 0) >= 20 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <div className="text-white">Ataque de Katana</div>
                    <div className="text-[10px] text-neutral-400 font-normal">Kenjutsu ({(weaponUses["katana"] || 0)}/20)</div>
                  </button>
                ) : null}
                {ninja.ninjaClass === "Kenjutsu" || ninja.inventory["w_kunai"] || ninja.ownedGear.includes("w_kunai") || ninja.inventory["i_kunai"] ? (
                  <button onClick={() => performPhysicalAttack("kunai")} className="bg-neutral-800 hover:bg-neutral-700 p-2 rounded-lg text-sm font-bold border border-neutral-700 transition-colors text-left">
                    <div className="text-white">Ataque de Kunai</div>
                    <div className="text-[10px] text-neutral-400 font-normal">Kenjutsu (Poder 14)</div>
                  </button>
                ) : null}
                {ninja.inventory["w_shuriken"] || ninja.ownedGear.includes("w_shuriken") ? (
                  <button onClick={() => performPhysicalAttack("shuriken")} disabled={(weaponUses["shuriken"] || 0) >= 3} className={`bg-neutral-800 hover:bg-neutral-700 p-2 rounded-lg text-sm font-bold border border-neutral-700 transition-colors text-left ${(weaponUses["shuriken"] || 0) >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <div className="text-white">Ataque de Shuriken</div>
                    <div className="text-[10px] text-neutral-400 font-normal">Kenjutsu ({(weaponUses["shuriken"] || 0)}/3)</div>
                  </button>
                ) : null}
                {ninja.inventory["w_fuuma"] || ninja.ownedGear.includes("w_fuuma") ? (
                  <button onClick={() => performPhysicalAttack("fuuma")} disabled={(weaponUses["fuuma"] || 0) >= 2} className={`bg-neutral-800 hover:bg-neutral-700 p-2 rounded-lg text-sm font-bold border border-neutral-700 transition-colors text-left ${(weaponUses["fuuma"] || 0) >= 2 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <div className="text-white">Fuuma Shuriken</div>
                    <div className="text-[10px] text-neutral-400 font-normal">Kenjutsu ({(weaponUses["fuuma"] || 0)}/2)</div>
                  </button>
                ) : null}
                {ninja.ninjaClass !== "Kenjutsu" && !ninja.inventory["w_katana"] && !ninja.ownedGear.includes("w_katana") && !ninja.inventory["w_kunai"] && !ninja.ownedGear.includes("w_kunai") && !ninja.inventory["i_kunai"] && !ninja.inventory["w_shuriken"] && !ninja.ownedGear.includes("w_shuriken") && !ninja.inventory["w_fuuma"] && !ninja.ownedGear.includes("w_fuuma") && (
                  <div className="col-span-2 text-xs text-neutral-500 italic p-2 text-center">Nenhuma arma equipada ou no inventário.</div>
                )}
              </div>
              <BackBtn onClick={() => setMenu("root")} />
            </div>
          ) : menu === "root" ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ActionBtn disabled={phase !== "player"} onClick={() => setMenu("attack")} icon={<Swords className="w-5 h-5" />} label="Atacar" hint="Grátis" />
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

import { useState, useEffect } from "react";
import { Ninja as NinjaModel } from "../models/Ninja";
import { GameManager } from "../services/GameManager";
import { CHUNIN_EXAM_ENEMIES } from "../data";
import { LogEntry, Screen, Village, ClassType, Nature, Clan, Jutsu, Item, Mission, BattleOutcome } from "../types";
import { MASTERS, JUTSUS } from "../data";

export function useGame() {
  const [ninja, setNinjaState] = useState<NinjaModel | null>(null);
  const [eventLog, setEventLog] = useState<LogEntry[]>([]);
  const [screen, setScreen] = useState<Screen>("START");
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  
  // Initialize from storage
  useEffect(() => {
    const { ninja: savedNinja, log: savedLog } = GameManager.loadSave();
    if (savedNinja) {
      setNinjaState(savedNinja);
      setEventLog(savedLog);
      setScreen("DASHBOARD");
    }
  }, []);

  // Save on state change
  useEffect(() => {
    if (ninja) {
      GameManager.save(ninja, eventLog);
    }
  }, [ninja, eventLog]);

  const setNinja = (n: NinjaModel) => {
    setNinjaState(n.clone());
  };

  const addLog = (message: string, type: LogEntry["type"] = "info") => {
    setEventLog((prev) => [{ id: Date.now() + Math.random(), message, type }, ...prev].slice(0, 12));
  };

  const createNinja = (name: string, village: Village, ninjaClass: ClassType, nature: Nature, clan: Clan, avatarId: string) => {
    const newNinja = NinjaModel.create(name, village, ninjaClass, nature, clan, avatarId);
    setNinjaState(newNinja);
    setScreen("DASHBOARD");
    setEventLog([{ id: Date.now(), message: `A jornada de ${name} começou!`, type: "success" }]);
  };

  const allocatePoint = (stat: keyof NinjaModel["data"]["stats"]) => {
    if (!ninja || ninja.data.skillPoints <= 0) return;
    ninja.data.stats[stat]++;
    ninja.data.skillPoints--;
    setNinja(ninja);
  };

  const resetGame = () => {
    GameManager.clearSave();
    setNinjaState(null);
    setEventLog([]);
    setScreen("START");
  };

  const eatRamen = () => {
    
    if (ninja.data.ryo < 150) return addLog("Dinheiro insuficiente.", "danger");
    const isLee = ninja.data.clan === "Lee";
    const secondaryFull = isLee ? ninja.data.vigor === ninja.getMaxVigor() : ninja.data.chakra === ninja.getMaxChakra();
    if (ninja.data.health === ninja.getMaxHealth() && secondaryFull) {
      return addLog("Você já está de barriga cheia!", "info");
    }
    ninja.data.ryo -= 150;
    ninja.restore(undefined, undefined, true);
    addLog(`O ramen do Ichiraku restaurou sua Vida e ${isLee ? "Vigor" : "Chakra"}!`, "success");
    setNinja(ninja);
  };

  const enrollMaster = (mId: string) => {
    if (!ninja) return;
    if (ninja.data.master) return addLog("Você já tem um mestre.", "danger");
    ninja.data.master = mId;
    const masterInfo = MASTERS.find(m => m.id === mId);
    addLog(`Você agora é aluno de ${masterInfo?.name}!`, "success");
    setNinja(ninja);
  };

  const learnFromMaster = (mId: string, teach: any) => {
    if (!ninja || ninja.data.master !== mId) return;
    if (ninja.data.level < teach.reqLevel) return addLog("Nível insuficiente.", "danger");
    
    if (teach.type === "jutsu") {
      if (ninja.data.knownJutsus.includes(teach.id)) return addLog("Você já sabe esta técnica.", "info");
      ninja.data.knownJutsus.push(teach.id);
      addLog(`Você aprendeu ${teach.name} com seu mestre!`, "success");
    } else {
      if (ninja.data.perks.includes(teach.id)) return addLog("Você já possui esta habilidade.", "info");
      ninja.data.perks.push(teach.id);
      addLog(`Você despertou ${teach.name}!`, "success");
    }
    setNinja(ninja);
  };

  const buyItem = (item: Item) => {
    if (!ninja) return;
    if (ninja.data.ryo < item.price) return addLog("Ryo insuficiente.", "danger");
    ninja.data.ryo -= item.price;
    
    if (item.kind === "consumable" || item.kind === "weapon") {
      const qty = item.qtyPerPurchase ?? 1;
      ninja.data.inventory[item.id] = (ninja.data.inventory[item.id] ?? 0) + qty;
      addLog(`Você comprou ${qty > 1 ? qty + "x " : ""}${item.name}.`, "success");
    } else {
      if (ninja.data.ownedGear.includes(item.id)) return;
      ninja.data.ownedGear.push(item.id);
      if (item.statBoost) ninja.data.stats[item.statBoost.stat] += item.statBoost.value;
      if (item.healthBoost) {
        ninja.data.maxHealth += item.healthBoost;
        ninja.data.health += item.healthBoost;
      }
      addLog(`Você equipou ${item.name}!`, "success");
    }
    setNinja(ninja);
  };

  const learnJutsu = (j: Jutsu) => {
    if (!ninja) return;
    if (ninja.data.knownJutsus.includes(j.id)) return;
    const matchNature = ninja.hasElementAffinity(j.element);
    if (!matchNature && !["Físico", "Ilusão", "Cura", "Neutro"].includes(j.element)) return addLog(`Você não tem afinidade com ${j.element}.`, "danger");
    if (ninja.data.level < j.reqLevel) return addLog(`Requer nível ${j.reqLevel} para aprender ${j.name}.`, "danger");
    if (ninja.data.ryo < j.scrollCost) return addLog("Ryo insuficiente para o pergaminho.", "danger");
    
    ninja.data.ryo -= j.scrollCost;
    ninja.data.knownJutsus.push(j.id);
    addLog(`Você aprendeu ${j.name}!`, "success");
    setNinja(ninja);
  };

  const takeExam = () => {
    if (!ninja) return;
    const info = ninja.nextRankInfo();
    if (!info) return addLog("Você já atingiu o rank máximo!", "info");
    
    if (ninja.canTakeExam()) {
      if (info.nextRank === "Chunin") {
        addLog("O Exame Chunin começou! Prepare-se para 5 batalhas consecutivas.", "info");
        const e = CHUNIN_EXAM_ENEMIES[Math.floor(Math.random() * CHUNIN_EXAM_ENEMIES.length)];
        setActiveMission({
          id: "chunin_exam_1",
          name: "Exame Chunin (1/5)",
          rank: "Sem Rank",
          description: "Sobreviva a 5 batalhas.",
          reward: 0,
          xpReward: 0,
          recommendedLevel: 10,
          enemy: e
        });
        return;
      }
      
      ninja.promote();
      addLog(`Parabéns! Você foi promovido para ${info.nextRank}!`, "success");
      addLog("Seus treinos no Campo de Treinamento agora concedem mais atributos e XP!", "info");
      setNinja(ninja);
    } else {
      addLog("Você não cumpre os requisitos para o exame.", "danger");
    }
  };

  const trainStat = (statKey: keyof NinjaModel["data"]["stats"], statName: string, duration: number, levelReq: number, staminaCost: number) => {
    if (!ninja) return;
    if (ninja.data.trainedToday) return addLog("Você já treinou hoje. Conclua uma missão para avançar o dia.", "danger");
    if (ninja.data.level < levelReq) return addLog(`Requer nível ${levelReq}`, "danger");
    if (ninja.data.stats.stamina < staminaCost) return addLog(`Stamina insuficiente (${staminaCost})`, "danger");

    const isLee = ninja.data.clan === "Lee";
    if (isLee) {
      if (ninja.data.vigor < 30) return addLog("Vigor insuficiente para treinar.", "danger");
      ninja.data.vigor -= 30;
    } else {
      if (ninja.data.chakra < 30) return addLog("Chakra insuficiente para treinar.", "danger");
      ninja.data.chakra -= 30;
    }
    let statGain = 1;
    let xpGain = duration * 2;
    switch (ninja.data.rank) {
      case "Genin": statGain = 3; xpGain = 100; break;
      case "Chunin": statGain = 5; xpGain = 250; break;
      case "Jonin": statGain = 10; xpGain = 500; break;
      case "ANBU": statGain = 20; xpGain = 1000; break;
      case "Kage": statGain = 50; xpGain = 5000; break;
    }

    ninja.data.stats[statKey] += statGain;
    ninja.data.trainedToday = true;
    const leveledUp = ninja.addXp(xpGain);
    
    addLog(`Você treinou ${statName} (+${statGain}) e ganhou ${xpGain} XP!`, "info");
    if (leveledUp) {
      addLog(`Nível UP! Você atingiu o nível ${ninja.data.level}.`, "success");
      const newJutsus = ninja.autoLearnNatureJutsus();
      newJutsus.forEach(j => addLog(`Você despertou um novo Jutsu: ${j}!`, "success"));
    }
    
    setNinja(ninja);
  };

  const handleBattleEnd = (outcome: BattleOutcome) => {
    const mission = activeMission;
    if (!mission) return;
    if (!ninja) return;
    setActiveMission(null);
    if (!mission.id.startsWith("chunin_exam_") || outcome.result !== "win" || (outcome.result === "win" && mission.id === "chunin_exam_5")) {
      ninja.data.day++;
      ninja.data.trainedToday = false;
    }
    ninja.data.health = Math.max(0, outcome.health);
    ninja.data.chakra = Math.max(0, outcome.chakra);
    ninja.data.vigor = Math.max(0, outcome.vigor);
    
    for (const [id, qty] of Object.entries(outcome.usedItems)) {
      if (qty > 0) ninja.data.inventory[id] = qty;
      else delete ninja.data.inventory[id];
    }
    
    if (outcome.result === "win") {
      if (mission.id.startsWith("chunin_exam_")) {
        const currentBattle = parseInt(mission.id.split("_")[2]);
        if (currentBattle < 5) {
           const e = CHUNIN_EXAM_ENEMIES[Math.floor(Math.random() * CHUNIN_EXAM_ENEMIES.length)];
           addLog(`Batalha ${currentBattle} vencida! Prepare-se para a próxima!`, "success");
           setTimeout(() => {
             setActiveMission({
               ...mission,
               id: `chunin_exam_${currentBattle + 1}`,
               name: `Exame Chunin (${currentBattle + 1}/5)`,
               enemy: e
             });
           }, 500);
           setNinja(ninja);
           return;
        } else {
           ninja.promote();
           addLog(`Parabéns! Você completou as 5 batalhas e foi promovido para Chunin!`, "success");
           addLog("Seus treinos no Campo de Treinamento agora concedem mais atributos e XP!", "info");
           setNinja(ninja);
           return;
        }
      }
      ninja.data.missionsCompleted[mission.rank]++;
      ninja.data.ryo += mission.reward;
      const leveledUp = ninja.addXp(mission.xpReward);
      addLog(`Missão cumprida! +${mission.reward} Ryo, +${mission.xpReward} XP.`, "success");
      
      if (leveledUp) {
        addLog(`Nível UP! Você atingiu o nível ${ninja.data.level}.`, "success");
        const newJutsus = ninja.autoLearnNatureJutsus();
        newJutsus.forEach(j => addLog(`Você despertou um novo Jutsu: ${j}!`, "success"));
      }
    } else if (outcome.result === "lose") {
      addLog("Você foi derrotado na missão...", "danger");
    } else {
      addLog("Você fugiu da batalha.", "info");
    }
    setNinja(ninja);
  };

  return {
    ninja,
    eventLog,
    screen,
    activeMission,
    setScreen,
    setActiveMission,
    createNinja,
    resetGame,
    allocatePoint,
    eatRamen,
    enrollMaster,
    learnFromMaster,
    buyItem,
    learnJutsu,
    takeExam,
    trainStat,
    handleBattleEnd,
    addLog
  };
}

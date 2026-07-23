const fs = require("fs");
let content = fs.readFileSync("src/hooks/useGame.ts", "utf-8");

const oldTrainStat = `  const trainStat = (statName: string, duration: number, levelReq: number, staminaCost: number) => {
    if (!ninja) return;
    if (ninja.data.level < levelReq) return addLog(\`Requer nível \${levelReq}\`, "danger");
    if (ninja.data.stats.stamina < staminaCost) return addLog(\`Stamina insuficiente (\${staminaCost})\`, "danger");
    if (ninja.data.chakra < 10) return addLog("Chakra insuficiente para treinar.", "danger");
    
    ninja.data.chakra -= 10;
    const xpGain = duration * 2;
    const leveledUp = ninja.addXp(xpGain);
    
    addLog(\`Você treinou \${statName} e ganhou \${xpGain} XP!\`, "info");
    if (leveledUp) {
      addLog(\`Nível UP! Você atingiu o nível \${ninja.data.level}.\`, "success");
      const newJutsus = ninja.autoLearnNatureJutsus();
      newJutsus.forEach(j => addLog(\`Você despertou um novo Jutsu: \${j}!\`, "success"));
    }
    
    ninja.data.day++;
    setNinja(ninja);
  };`;

const newTrainStat = `  const trainStat = (statKey: keyof NinjaModel["data"]["stats"], statName: string, duration: number, levelReq: number, staminaCost: number) => {
    if (!ninja) return;
    if (ninja.data.level < levelReq) return addLog(\`Requer nível \${levelReq}\`, "danger");
    if (ninja.data.stats.stamina < staminaCost) return addLog(\`Stamina insuficiente (\${staminaCost})\`, "danger");
    if (ninja.data.chakra < 30) return addLog("Chakra insuficiente para treinar.", "danger");
    
    ninja.data.chakra -= 30;
    ninja.data.stats[statKey] += 1;
    const xpGain = duration * 2;
    const leveledUp = ninja.addXp(xpGain);
    
    addLog(\`Você treinou \${statName} (+1) e ganhou \${xpGain} XP!\`, "info");
    if (leveledUp) {
      addLog(\`Nível UP! Você atingiu o nível \${ninja.data.level}.\`, "success");
      const newJutsus = ninja.autoLearnNatureJutsus();
      newJutsus.forEach(j => addLog(\`Você despertou um novo Jutsu: \${j}!\`, "success"));
    }
    
    ninja.data.day++;
    setNinja(ninja);
  };`;

content = content.replace(oldTrainStat, newTrainStat);
fs.writeFileSync("src/hooks/useGame.ts", content);

const fs = require("fs");
let content = fs.readFileSync("src/Battle.tsx", "utf-8");

const oldUseJutsu = `  const useJutsu = (j: Jutsu) => {
    if (phase !== "player") return;
    if (pChakra < j.chakraCost) {
      addLog(\`Chakra insuficiente para \${j.name}.\`, "info");
      return;
    }
    setPhase("enemy");
    setMenu("root");
    const newChakra = pChakra - j.chakraCost;
    setPChakra(newChakra);

    if (j.defense && j.defense > 0) {
      setTempShield(j.defense);
    }

    if (j.kind === "heal") {
      const heal = Math.round(ninja.maxHealth * (j.healPercent ?? 0.3));
      const newHp = Math.min(ninja.maxHealth, pHp + heal);
      setPHp(newHp);
      addLog(\`Você usou \${j.name} e recuperou \${heal} de vida.\`, "you");
      setPhase("enemy");
      setTimeout(() => enemyTurn(newHp, newChakra, usedItems), 800);
      return;
    }
    if (j.kind === "buff") {
      if (j.buffTurns || j.buffAmount) {
        setBoostTurns(j.buffTurns ?? 3);
        setBoostAmt(j.buffAmount ?? 0.5);
        addLog(\`Você usou \${j.name}! Dano aumentado por \${j.buffTurns ?? 3} turnos.\`, "you");
      } else {
        addLog(\`Você usou \${j.name}!\`, "you");
      }
      setPhase("enemy");
      setTimeout(() => enemyTurn(pHp, newChakra, usedItems), 800);
      return;
    }
    // attack
    const { dmg, crit } = calcPlayerDamage(j.scaling, j.power, j.critBonus ?? 0);
    addLog(\`Você usou \${j.name}\${crit ? " (CRÍTICO!)" : ""} e causou \${dmg} de dano.\`, "you");
    afterPlayer(eHp - dmg, pHp, newChakra, usedItems);
  };`;

const newUseJutsu = `  const useJutsu = (j: Jutsu) => {
    if (phase !== "player") return;
    if (pChakra < j.chakraCost) {
      addLog(\`Chakra insuficiente para \${j.name}.\`, "info");
      return;
    }
    
    let currentHp = pHp;
    if (j.healthCostPercent) {
      const cost = Math.round(ninja.maxHealth * j.healthCostPercent);
      if (currentHp <= cost && !j.deathAfterBuff) {
        addLog(\`Vida insuficiente para \${j.name}.\`, "info");
        return;
      }
      currentHp = Math.max(1, currentHp - cost);
      setPHp(currentHp);
    }

    setPhase("enemy");
    setMenu("root");
    const newChakra = pChakra - j.chakraCost;
    setPChakra(newChakra);

    if (j.defense && j.defense > 0) {
      setTempShield(j.defense);
    }

    if (j.kind === "paralyze") {
      const turns = j.paralyzeTurns ?? 2;
      setParalyzeTurns(turns);
      addLog(\`Você usou \${j.name}! O inimigo ficará paralisado por \${turns} turnos.\`, "you");
      afterPlayer(eHp, currentHp, newChakra, usedItems);
      return;
    }

    if (j.kind === "heal") {
      const heal = Math.round(ninja.maxHealth * (j.healPercent ?? 0.3));
      currentHp = Math.min(ninja.maxHealth, currentHp + heal);
      setPHp(currentHp);
      addLog(\`Você usou \${j.name} e recuperou \${heal} de vida.\`, "you");
      setPhase("enemy");
      setTimeout(() => enemyTurn(currentHp, newChakra, usedItems), 800);
      return;
    }
    
    if (j.kind === "buff") {
      if (j.buffTurns || j.buffAmount) {
        setBoostTurns(j.buffTurns ?? 3);
        setBoostAmt(j.buffAmount ?? 0.5);
        addLog(\`Você usou \${j.name}! Dano aumentado por \${j.buffTurns ?? 3} turnos.\`, "you");
      } else {
        addLog(\`Você usou \${j.name}!\`, "you");
      }
      
      if (j.healPercent) {
        const heal = Math.round(ninja.maxHealth * j.healPercent);
        currentHp = Math.min(ninja.maxHealth, currentHp + heal);
        setPHp(currentHp);
        addLog(\`Você também recuperou \${heal} de vida.\`, "you");
      }
      
      if (j.deathAfterBuff) {
        setDeathTimer(j.buffTurns ?? 3);
      }
      
      setPhase("enemy");
      setTimeout(() => enemyTurn(currentHp, newChakra, usedItems), 800);
      return;
    }
    // attack
    const { dmg, crit } = calcPlayerDamage(j.scaling, j.power, j.critBonus ?? 0);
    addLog(\`Você usou \${j.name}\${crit ? " (CRÍTICO!)" : ""} e causou \${dmg} de dano.\`, "you");
    afterPlayer(eHp - dmg, currentHp, newChakra, usedItems);
  };`;

content = content.replace(oldUseJutsu, newUseJutsu);
fs.writeFileSync("src/Battle.tsx", content);

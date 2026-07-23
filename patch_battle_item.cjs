const fs = require("fs");
let content = fs.readFileSync("src/Battle.tsx", "utf-8");

const oldUseItem = `    let newHp = pHp;
    let newChakra = pChakra;
    if (item.fullRestore) {
      newHp = ninja.maxHealth;
      newChakra = ninja.maxChakra;
      addLog(\`Você usou \${item.name}. Vida e Chakra restaurados!\`, "you");
    } else {
      if (item.healAmount) {
        newHp = Math.min(ninja.maxHealth, pHp + item.healAmount);
        addLog(\`Você usou \${item.name} e recuperou \${item.healAmount} de vida.\`, "you");
      }
      if (item.chakraAmount) {
        newChakra = Math.min(ninja.maxChakra, pChakra + item.chakraAmount);
        addLog(\`Você usou \${item.name} e recuperou \${item.chakraAmount} de chakra.\`, "you");
      }
    }

    setTimeout(() => enemyTurn(newHp, newChakra, newUsed), 800);
  };`;

const newUseItem = `    let newHp = pHp;
    let newChakra = pChakra;
    
    if (item.kind === "weapon") {
      let dmg = item.weaponPower ?? 0;
      // Adiciona o bônus de taijutsu (e ninjutsu se tiver perk)
      let statBonus = ninja.stats.taijutsu;
      if (ninja.perks.includes("ninjutsu_kenjutsu")) {
        statBonus += ninja.stats.ninjutsu;
      }
      dmg += Math.floor(statBonus * 0.8);
      
      const crit = Math.random() < 0.1;
      if (crit) dmg *= 1.5;
      dmg = Math.max(1, Math.round(dmg));
      
      addLog(\`Você usou \${item.name}\${crit ? " (CRÍTICO!)" : ""} e causou \${dmg} de dano.\`, "you");
      afterPlayer(eHp - dmg, newHp, newChakra, newUsed);
      return;
    }

    if (item.fullRestore) {
      newHp = ninja.maxHealth;
      newChakra = ninja.maxChakra;
      addLog(\`Você usou \${item.name}. Vida e Chakra restaurados!\`, "you");
    } else {
      if (item.healAmount) {
        newHp = Math.min(ninja.maxHealth, pHp + item.healAmount);
        addLog(\`Você usou \${item.name} e recuperou \${item.healAmount} de vida.\`, "you");
      }
      if (item.chakraAmount) {
        newChakra = Math.min(ninja.maxChakra, pChakra + item.chakraAmount);
        addLog(\`Você usou \${item.name} e recuperou \${item.chakraAmount} de chakra.\`, "you");
      }
    }

    setTimeout(() => enemyTurn(newHp, newChakra, newUsed), 800);
  };`;

content = content.replace(oldUseItem, newUseItem);
fs.writeFileSync("src/Battle.tsx", content);

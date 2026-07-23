const fs = require("fs");
let content = fs.readFileSync("src/Battle.tsx", "utf-8");

const oldBuffHandler = `    if (j.kind === "buff") {
      setBoostTurns(j.buffTurns ?? 3);
      setBoostAmt(j.buffAmount ?? 0.5);
      addLog(\`Você usou \${j.name}! Dano aumentado por \${j.buffTurns} turnos.\`, "you");
      setPhase("enemy");
      setTimeout(() => enemyTurn(pHp, newChakra, usedItems), 800);
      return;
    }`;

const newBuffHandler = `    if (j.kind === "buff") {
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
    }`;

content = content.replace(oldBuffHandler, newBuffHandler);
fs.writeFileSync("src/Battle.tsx", content);

const fs = require("fs");
let content = fs.readFileSync("src/Battle.tsx", "utf-8");

const oldStates = `  const [boostTurns, setBoostTurns] = useState(0);
  const [boostAmt, setBoostAmt] = useState(0);`;
const newStates = `  const [boostTurns, setBoostTurns] = useState(0);
  const [boostAmt, setBoostAmt] = useState(0);
  const [paralyzeTurns, setParalyzeTurns] = useState(0);
  const [deathTimer, setDeathTimer] = useState<number | null>(null);`;
content = content.replace(oldStates, newStates);

const oldAfterPlayer = `  const afterPlayer = (newEHp: number, snapHp: number, snapChakra: number, snapItems: Record<string, number>) => {
    setShake("foe");
    setTimeout(() => setShake(""), 300);
    if (newEHp <= 0) {
      setEHp(0);
      addLog(\`\${enemy.name} foi derrotado!\`, "you");
      setTimeout(() => finish("win", snapHp, snapChakra, snapItems), 500);
      return;
    }
    setEHp(newEHp);
    if (boostTurns > 0) setBoostTurns((t) => Math.max(0, t - 1));
    setPhase("enemy");
    setTimeout(() => enemyTurn(snapHp, snapChakra, snapItems), 800);
  };`;

const newAfterPlayer = `  const afterPlayer = (newEHp: number, snapHp: number, snapChakra: number, snapItems: Record<string, number>) => {
    setShake("foe");
    setTimeout(() => setShake(""), 300);
    if (newEHp <= 0) {
      setEHp(0);
      addLog(\`\${enemy.name} foi derrotado!\`, "you");
      setTimeout(() => finish("win", snapHp, snapChakra, snapItems), 500);
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
        addLog("O efeito do Oitavo Portão terminou! Sua força vital se esgotou.", "danger");
        setTimeout(() => finish("lose", 1, snapChakra, snapItems), 1000);
        return;
      }
    }

    if (paralyzeTurns > 0) {
      setParalyzeTurns(t => t - 1);
      addLog(\`\${enemy.name} está paralisado!\`, "info");
      setPhase("player");
      setMenu("root");
      return;
    }

    setPhase("enemy");
    setTimeout(() => enemyTurn(snapHp, snapChakra, snapItems), 800);
  };`;

content = content.replace(oldAfterPlayer, newAfterPlayer);

fs.writeFileSync("src/Battle.tsx", content);

const fs = require("fs");
let content = fs.readFileSync("src/hooks/useGame.ts", "utf-8");

content = content.replace(
  "  const resetGame = () => {\\n    if (confirm(\\\"Deseja apagar seu progresso e começar de novo?\\\")) {\\n      GameManager.clearSave();\\n      setNinjaState(null);\\n      setEventLog([]);\\n      setScreen(\\\"START\\\");\\n    }\\n  };",
  "  const resetGame = () => {\\n    GameManager.clearSave();\\n    setNinjaState(null);\\n    setEventLog([]);\\n    setScreen(\\\"START\\\");\\n  };"
);

fs.writeFileSync("src/hooks/useGame.ts", content);

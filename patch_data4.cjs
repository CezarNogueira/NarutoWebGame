const fs = require("fs");
let content = fs.readFileSync("src/data.ts", "utf-8");

const newMission = `
  {
    id: "m_tutorial", name: "Missão de Treinamento", rank: "Sem Rank", recommendedLevel: 1,
    description: "Um treinamento simples com um espantalho.",
    reward: 100, xpReward: 25,
    enemy: { name: "Espantalho de Treinamento", emoji: "🎋", maxHp: 20, attack: 2, defense: 0, speed: 1,
      moves: [{"name":"Balanço","power":3,"element":"Físico"}] },
  },`;

content = content.replace(
  'export const MISSIONS: Mission[] = [',
  'export const MISSIONS: Mission[] = [\n' + newMission
);

fs.writeFileSync("src/data.ts", content);

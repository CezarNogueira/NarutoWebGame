const fs = require("fs");
let content = fs.readFileSync("src/data.ts", "utf-8");

const newJutsus = `
  { id: "j_uchiha_sharingan", name: "Sharingan", description: "Dá a capacidade de prever movimentos. +20% Dano.", kind: "buff", element: "Ilusão", scaling: "genjutsu", chakraCost: 15, power: 0, buffTurns: 5, buffAmount: 0.2, scrollCost: -1, reqLevel: 10 },
  { id: "j_uchiha_mangekyou", name: "Mangekyō Sharingan", description: "Poder ocular supremo. +60% Dano.", kind: "buff", element: "Ilusão", scaling: "genjutsu", chakraCost: 50, power: 0, buffTurns: 5, buffAmount: 0.6, scrollCost: -1, reqLevel: 40 },
  { id: "j_hyuga_byakugan", name: "Byakugan", description: "Visão 360 e visão dos pontos de chakra. +30% Dano.", kind: "buff", element: "Físico", scaling: "taijutsu", chakraCost: 20, power: 0, buffTurns: 5, buffAmount: 0.3, scrollCost: -1, reqLevel: 10 },
  { id: "j_senju_sabio", name: "Modo Sábio da Madeira", description: "Absorve energia natural. +100% Dano, cura 20% vida.", kind: "buff", element: "Neutro", scaling: "ninjutsu", chakraCost: 80, power: 0, buffTurns: 6, buffAmount: 1.0, healPercent: 0.2, scrollCost: -1, reqLevel: 40 },
`;

content = content.replace(
  'export const JUTSUS: Jutsu[] = [',
  'export const JUTSUS: Jutsu[] = [\n' + newJutsus
);

fs.writeFileSync("src/data.ts", content);

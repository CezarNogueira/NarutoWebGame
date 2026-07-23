const fs = require("fs");
let content = fs.readFileSync("src/data.ts", "utf-8");

const newJutsus = `
  { id: "j_uchiha_genjutsu", name: "Genjutsu Ocular", description: "Paralisa o inimigo.", kind: "paralyze", element: "Ilusão", scaling: "genjutsu", chakraCost: 20, power: 0, paralyzeTurns: 2, scrollCost: -1, reqLevel: 25 },
  { id: "j_hyuga_punho", name: "Punho Gentil", description: "Ataque rápido e preciso.", kind: "attack", element: "Físico", scaling: "taijutsu", chakraCost: 15, power: 30, scrollCost: -1, reqLevel: 10 },
  { id: "j_hyuga_8trigramas", name: "Oito Trigramas", description: "Série de golpes nos pontos de chakra.", kind: "attack", element: "Físico", scaling: "taijutsu", chakraCost: 35, power: 60, scrollCost: -1, reqLevel: 20 },
  { id: "j_hyuga_rotacao", name: "Rotação Celestial", description: "Defesa e ataque absolutos.", kind: "attack", element: "Físico", scaling: "taijutsu", chakraCost: 40, power: 40, defense: 40, scrollCost: -1, reqLevel: 30 },
  { id: "j_uzumaki_correntes", name: "Correntes de Chakra", description: "Prende o oponente.", kind: "paralyze", element: "Neutro", scaling: "ninjutsu", chakraCost: 30, power: 0, paralyzeTurns: 2, scrollCost: -1, reqLevel: 10 },
  { id: "j_uzumaki_selamento", name: "Selamento Uzumaki", description: "Bloqueia jutsus do inimigo.", kind: "paralyze", element: "Neutro", scaling: "ninjutsu", chakraCost: 50, power: 0, paralyzeTurns: 4, scrollCost: -1, reqLevel: 30 },
  { id: "j_lee_lotus1", name: "Lótus Primária", description: "Ataque devastador de Taijutsu.", kind: "attack", element: "Físico", scaling: "taijutsu", chakraCost: 0, power: 40, scrollCost: -1, reqLevel: 10 },
  { id: "j_lee_lotus2", name: "Lótus Oculta", description: "Ataque ainda mais devastador.", kind: "attack", element: "Físico", scaling: "taijutsu", chakraCost: 0, power: 80, scrollCost: -1, reqLevel: 20 },
`;

content = content.replace(
  'export const JUTSUS: Jutsu[] = [',
  'export const JUTSUS: Jutsu[] = [\n' + newJutsus
);

fs.writeFileSync("src/data.ts", content);

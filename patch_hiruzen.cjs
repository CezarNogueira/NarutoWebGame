const fs = require("fs");
let content = fs.readFileSync("src/data.ts", "utf-8");

const oldKakashi = `  {
    id: "kakashi", name: "Kakashi Hatake", description: "O Ninja Copiador. Ensina técnicas avançadas de Raiton.",
    teaches: [
      { type: "jutsu", id: "j_chidori", name: "Chidori (Raiton, Ataque 45)", reqLevel: 16 }
    ]
  },`;

const newKakashi = `  {
    id: "kakashi", name: "Kakashi Hatake", description: "O Ninja Copiador. Ensina técnicas avançadas de Raiton e Katon.",
    teaches: [
      { type: "jutsu", id: "j_chidori", name: "Chidori (Raiton, Ataque 45)", reqLevel: 16 },
      { type: "perk", id: "nature_raiton", name: "Natureza de Raiton", reqLevel: 16 },
      { type: "perk", id: "nature_fogo", name: "Natureza de Katon", reqLevel: 22 },
      { type: "jutsu", id: "j_chidori_nagashi", name: "Chidori Nagashi (Raiton, Ataque 95)", reqLevel: 30 }
    ]
  },
  {
    id: "hiruzen", name: "Hiruzen Sarutobi", description: "O Terceiro Hokage, o Professor. Conhecido por dominar todas as cinco naturezas básicas de chakra.",
    teaches: [
      { type: "perk", id: "nature_fogo", name: "Natureza de Katon", reqLevel: 16 },
      { type: "perk", id: "nature_agua", name: "Natureza de Suiton", reqLevel: 19 },
      { type: "perk", id: "nature_raiton", name: "Natureza de Raiton", reqLevel: 24 },
      { type: "perk", id: "nature_terra", name: "Natureza de Doton", reqLevel: 32 },
      { type: "perk", id: "nature_vento", name: "Natureza de Fuuton", reqLevel: 38 }
    ]
  },`;

content = content.replace(oldKakashi, newKakashi);

const newJutsu = `  { id: "j_chidori_nagashi", name: "Chidori Nagashi", description: "Corrente elétrica de alta potência emanando do corpo.", kind: "attack", element: "Raio", scaling: "ninjutsu", chakraCost: 80, power: 95, defense: 0, scrollCost: -1, reqLevel: 30 },
  // Fogo`;

content = content.replace('  // Fogo', newJutsu);

fs.writeFileSync("src/data.ts", content);

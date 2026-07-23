const fs = require("fs");
let content = fs.readFileSync("src/data.ts", "utf-8");

const oldClasses = `export const CLASSES: { name: ClassType; description: string; statFocus: keyof Stats }[] = [
  { name: "Ninjutsu", description: "Mestre das artes ninjas e manipulação de chakra.", statFocus: "ninjutsu" },
  { name: "Taijutsu", description: "Especialista em combate corpo a corpo.", statFocus: "taijutsu" },
  { name: "Genjutsu", description: "Ilusionista capaz de controlar a mente do inimigo.", statFocus: "genjutsu" },
  { name: "Médico", description: "Focado em curar aliados e conhecimentos anatômicos.", statFocus: "intelligence" },
];`;

const newClasses = `export const CLASSES: { name: ClassType; description: string; statFocus: keyof Stats }[] = [
  { name: "Ninjutsu", description: "Mestre das artes ninjas e manipulação de chakra.", statFocus: "ninjutsu" },
  { name: "Taijutsu", description: "Especialista em combate corpo a corpo.", statFocus: "taijutsu" },
  { name: "Genjutsu", description: "Ilusionista capaz de controlar a mente do inimigo.", statFocus: "genjutsu" },
  { name: "Médico", description: "Focado em curar aliados e conhecimentos anatômicos.", statFocus: "intelligence" },
  { name: "Kenjutsu", description: "Mestre no manuseio de espadas e armas samurais.", statFocus: "taijutsu" },
];`;

content = content.replace(oldClasses, newClasses);

// Add Master Jutsus to JUTSUS array
const masterJutsus = `
  // Kenjutsu
  { id: "j_sword_strike", name: "Corte Preciso", description: "Golpe rápido com espada de chakra.", kind: "attack", element: "Físico", scaling: "taijutsu", chakraCost: 8, power: 46, defense: 0, scrollCost: 0, reqLevel: 1, starter: "Kenjutsu" },

  // Kakashi
  { id: "j_chidori", name: "Chidori", description: "Mil Pássaros (Raiton)", kind: "attack", element: "Raio", scaling: "ninjutsu", chakraCost: 25, power: 45, defense: 0, scrollCost: -1, reqLevel: 16 },
  
  // Jiraya
  { id: "j_rasengan", name: "Rasengan", description: "Esfera de puro chakra (Neutro)", kind: "attack", element: "Neutro", scaling: "ninjutsu", chakraCost: 30, power: 50, defense: 0, scrollCost: -1, reqLevel: 16 },
  { id: "j_sage_jiraya", name: "Modo Sábio", description: "Aumenta 80% o dano e recupera 10% da vida máxima. Dura 8 turnos.", kind: "buff", element: "Neutro", scaling: "ninjutsu", chakraCost: 40, power: 0, buffTurns: 8, buffAmount: 0.8, healPercent: 0.1, scrollCost: -1, reqLevel: 25 },
  
  // Kurenai
  { id: "j_petals", name: "Genjutsu das Pétalas", description: "Paralisa o inimigo por 2 turnos.", kind: "paralyze", element: "Ilusão", scaling: "genjutsu", chakraCost: 25, power: 0, paralyzeTurns: 2, scrollCost: -1, reqLevel: 12 },

  // Maito Guy (Gates)
  { id: "j_gate_1", name: "Primeiro Portão (Abertura)", description: "+10% de Dano, custa 10% da Vida atual.", kind: "buff", element: "Físico", scaling: "taijutsu", chakraCost: 10, power: 0, buffTurns: 10, buffAmount: 0.1, healthCostPercent: 0.1, scrollCost: -1, reqLevel: 5 },
  { id: "j_gate_2", name: "Segundo Portão (Cura)", description: "+20% de Dano, custa 15% da Vida atual.", kind: "buff", element: "Físico", scaling: "taijutsu", chakraCost: 15, power: 0, buffTurns: 10, buffAmount: 0.2, healthCostPercent: 0.15, scrollCost: -1, reqLevel: 10 },
  { id: "j_gate_3", name: "Terceiro Portão (Vida)", description: "+35% de Dano, custa 20% da Vida atual.", kind: "buff", element: "Físico", scaling: "taijutsu", chakraCost: 20, power: 0, buffTurns: 10, buffAmount: 0.35, healthCostPercent: 0.2, scrollCost: -1, reqLevel: 15 },
  { id: "j_gate_4", name: "Quarto Portão (Dor)", description: "+50% de Dano, custa 25% da Vida atual.", kind: "buff", element: "Físico", scaling: "taijutsu", chakraCost: 25, power: 0, buffTurns: 10, buffAmount: 0.5, healthCostPercent: 0.25, scrollCost: -1, reqLevel: 20 },
  { id: "j_gate_5", name: "Quinto Portão (Limite)", description: "+70% de Dano, custa 30% da Vida atual.", kind: "buff", element: "Físico", scaling: "taijutsu", chakraCost: 35, power: 0, buffTurns: 10, buffAmount: 0.7, healthCostPercent: 0.3, scrollCost: -1, reqLevel: 25 },
  { id: "j_gate_6", name: "Sexto Portão (Visão)", description: "+95% de Dano, custa 40% da Vida atual.", kind: "buff", element: "Físico", scaling: "taijutsu", chakraCost: 50, power: 0, buffTurns: 10, buffAmount: 0.95, healthCostPercent: 0.4, scrollCost: -1, reqLevel: 30 },
  { id: "j_gate_7", name: "Sétimo Portão (Assombro)", description: "+130% de Dano, custa 50% da Vida atual.", kind: "buff", element: "Físico", scaling: "taijutsu", chakraCost: 75, power: 0, buffTurns: 10, buffAmount: 1.3, healthCostPercent: 0.5, scrollCost: -1, reqLevel: 35 },
  { id: "j_gate_8", name: "Oitavo Portão (Morte)", description: "+250% de Dano. Ao fim da técnica, vida reduzida a 1 e morte iminente.", kind: "buff", element: "Físico", scaling: "taijutsu", chakraCost: 100, power: 0, buffTurns: 10, buffAmount: 2.5, deathAfterBuff: true, scrollCost: -1, reqLevel: 40 },
`;

content = content.replace("export const JUTSUS: Jutsu[] = [", "export const JUTSUS: Jutsu[] = [\n" + masterJutsus);


const oldStarter = `  if (ninjaClass === "Médico") return "j_healpalm";`;
const newStarter = `  if (ninjaClass === "Médico") return "j_healpalm";\n  if (ninjaClass === "Kenjutsu") return "j_sword_strike";`;
content = content.replace(oldStarter, newStarter);


const newItems = `
  { id: "w_katana", name: "Katana", description: "Arma branca afiada (Ataque 24, 20 usos).", price: 2500, kind: "weapon", weaponPower: 24, qtyPerPurchase: 20 },
  { id: "w_kunai", name: "Kunai", description: "Lâmina arremessável (Ataque 14, 3 usos).", price: 300, kind: "weapon", weaponPower: 14, qtyPerPurchase: 3 },
  { id: "w_shuriken", name: "Shurikens", description: "Lâminas giratórias (Ataque 9, 1 uso).", price: 50, kind: "weapon", weaponPower: 9, qtyPerPurchase: 1 },
  { id: "w_fuuma", name: "Fuuma Shuriken", description: "Shuriken de Vento Demoníaco (Ataque 30, 1 uso).", price: 1200, kind: "weapon", weaponPower: 30, qtyPerPurchase: 1 },
`;

content = content.replace("export const ITEMS: Item[] = [", "export const ITEMS: Item[] = [\n" + newItems);

// Add Masters
const mastersStr = `
export type MasterTeach = { type: "jutsu" | "perk"; id: string; name: string; reqLevel: number; };
export type Master = { id: string; name: string; teaches: MasterTeach[]; };

export const MASTERS: Master[] = [
  {
    id: "kakashi", name: "Kakashi Hatake",
    teaches: [
      { type: "jutsu", id: "j_chidori", name: "Chidori (Raiton, Ataque 45)", reqLevel: 16 }
    ]
  },
  {
    id: "jiraya", name: "Jiraiya",
    teaches: [
      { type: "jutsu", id: "j_rasengan", name: "Rasengan (Neutro, Ataque 50)", reqLevel: 16 },
      { type: "jutsu", id: "j_sage_jiraya", name: "Modo Sábio", reqLevel: 25 }
    ]
  },
  {
    id: "guy", name: "Maito Guy",
    teaches: [
      { type: "jutsu", id: "j_gate_1", name: "Primeiro Portão (Abertura)", reqLevel: 5 },
      { type: "jutsu", id: "j_gate_2", name: "Segundo Portão (Cura)", reqLevel: 10 },
      { type: "jutsu", id: "j_gate_3", name: "Terceiro Portão (Vida)", reqLevel: 15 },
      { type: "jutsu", id: "j_gate_4", name: "Quarto Portão (Dor)", reqLevel: 20 },
      { type: "jutsu", id: "j_gate_5", name: "Quinto Portão (Limite)", reqLevel: 25 },
      { type: "jutsu", id: "j_gate_6", name: "Sexto Portão (Visão)", reqLevel: 30 },
      { type: "jutsu", id: "j_gate_7", name: "Sétimo Portão (Assombro)", reqLevel: 35 },
      { type: "jutsu", id: "j_gate_8", name: "Oitavo Portão (Morte)", reqLevel: 40 },
    ]
  },
  {
    id: "asuma", name: "Asuma Sarutobi",
    teaches: [
      { type: "perk", id: "nature_fogo", name: "Natureza de Katon", reqLevel: 16 },
      { type: "perk", id: "ninjutsu_kenjutsu", name: "Ninjutsu no Kenjutsu", reqLevel: 24 },
    ]
  },
  {
    id: "kurenai", name: "Kurenai Yūhi",
    teaches: [
      { type: "jutsu", id: "j_petals", name: "Genjutsu das Pétalas", reqLevel: 12 },
      { type: "perk", id: "contra_genjutsu", name: "Contra Genjutsu", reqLevel: 28 }
    ]
  }
];
`;

content = content + "\n" + mastersStr;
fs.writeFileSync("src/data.ts", content);

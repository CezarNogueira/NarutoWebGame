const fs = require("fs");
let content = fs.readFileSync("src/types.ts", "utf-8");

content = content.replace(
  'export type ClassType = "Ninjutsu" | "Taijutsu" | "Genjutsu" | "Médico";',
  'export type ClassType = "Ninjutsu" | "Taijutsu" | "Genjutsu" | "Médico" | "Kenjutsu";'
);

content = content.replace(
  'export type JutsuKind = "attack" | "heal" | "buff";',
  'export type JutsuKind = "attack" | "heal" | "buff" | "paralyze";'
);

const jutsuProps = `  healPercent?: number; // fração da vida máxima
  healthCostPercent?: number; // custo de vida (fração, ex: 0.1 para 10%)
  paralyzeTurns?: number; // turnos de paralisia do inimigo
  deathAfterBuff?: boolean; // oitavo portão`;
content = content.replace("  healPercent?: number; // fração da vida máxima", jutsuProps);

const itemProps = `  kind: "consumable" | "gear" | "weapon";
  weaponPower?: number;
  qtyPerPurchase?: number;`;
content = content.replace('  kind: "consumable" | "gear";', itemProps);

const ninjaProps = `  ownedGear: string[]; // ids de equipamentos comprados
  perks: string[]; // passivas (ex: nature_fogo, ninjutsu_kenjutsu)`;
content = content.replace("  ownedGear: string[]; // ids de equipamentos comprados", ninjaProps);

fs.writeFileSync("src/types.ts", content);

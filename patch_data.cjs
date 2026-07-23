const fs = require("fs");
let content = fs.readFileSync("src/data.ts", "utf-8");

const clanDef = `
export const CLANS: { name: string, description: string }[] = [
  { name: "Uchiha", description: "Mestres do Sharingan, especialistas em Genjutsu e Ataque." },
  { name: "Senju", description: "Vigor extremo e chakra abundante, especialistas em versatilidade." },
  { name: "Hyūga", description: "Usuários do Byakugan, especialistas em controle de chakra e Taijutsu." },
  { name: "Uzumaki", description: "Reservas imensas de chakra e vitalidade, especialistas em selamentos." },
  { name: "Rock Lee", description: "Incapaz de usar ninjutsu ou genjutsu, mestre absoluto do Taijutsu puro." },
  { name: "Nenhum", description: "Sem herança de clã. Ninja de sangue comum." }
];
`;

content = content.replace(
  'export const VILLAGES',
  clanDef + '\nexport const VILLAGES'
);

fs.writeFileSync("src/data.ts", content);

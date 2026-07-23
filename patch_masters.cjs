const fs = require("fs");
let content = fs.readFileSync("src/data.ts", "utf-8");

content = content.replace(
  'export type Master = { id: string; name: string; teaches: MasterTeach[]; };',
  'export type Master = { id: string; name: string; description: string; teaches: MasterTeach[]; };'
);

content = content.replace(
  'id: "kakashi", name: "Kakashi Hatake",',
  'id: "kakashi", name: "Kakashi Hatake", description: "O Ninja Copiador. Ensina técnicas avançadas de Raiton.",'
);

content = content.replace(
  'id: "jiraya", name: "Jiraiya",',
  'id: "jiraya", name: "Jiraiya", description: "Um dos Sannin Lendários. Ensina controle de chakra e o lendário Modo Sábio.",'
);

content = content.replace(
  'id: "guy", name: "Maito Guy",',
  'id: "guy", name: "Maito Guy", description: "A Besta Verde de Konoha. Ensina os Oito Portões Internos para Taijutsu extremo.",'
);

content = content.replace(
  'id: "asuma", name: "Asuma Sarutobi",',
  'id: "asuma", name: "Asuma Sarutobi", description: "Especialista em combate a curta distância e mestre no uso do Katon com lâminas de chakra.",'
);

content = content.replace(
  'id: "kurenai", name: "Kurenai Yūhi",',
  'id: "kurenai", name: "Kurenai Yūhi", description: "Mestra de Genjutsu. Ensina ilusões poderosas e técnicas de defesa mental.",'
);

fs.writeFileSync("src/data.ts", content);

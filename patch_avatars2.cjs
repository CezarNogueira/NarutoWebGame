const fs = require("fs");
let content = fs.readFileSync("src/avatars.tsx", "utf-8");

const genAvatars = `
export const AVATARS: AvatarPreset[] = [
  // Uchiha (Pele Clara, Cabelo Preto, Olho Preto)
  { id: "uc1", clan: "Uchiha", skin: SKIN.light, hair: HAIR.black, style: "spiky", band: BAND.blue, eye: "#1a1a1a", cloth: "#2f3b52", gender: "M" },
  { id: "uc2", clan: "Uchiha", skin: SKIN.light, hair: HAIR.black, style: "short", band: BAND.black, eye: "#1a1a1a", cloth: "#1a1a1a", gender: "M" },
  { id: "uc3", clan: "Uchiha", skin: SKIN.light, hair: HAIR.black, style: "mohawk", band: BAND.red, eye: "#1a1a1a", cloth: "#b03a3a", gender: "M" },
  { id: "uc4", clan: "Uchiha", skin: SKIN.light, hair: HAIR.black, style: "long", band: BAND.blue, eye: "#1a1a1a", cloth: "#4b3f6b", gender: "F" },
  { id: "uc5", clan: "Uchiha", skin: SKIN.light, hair: HAIR.black, style: "ponytail", band: BAND.red, eye: "#1a1a1a", cloth: "#7a2f2f", gender: "F" },
  { id: "uc6", clan: "Uchiha", skin: SKIN.light, hair: HAIR.black, style: "bun", band: BAND.black, eye: "#1a1a1a", cloth: "#3d6b52", gender: "F" },

  // Uzumaki (Pele Clara, Cabelo Loiro, Olho Azul)
  { id: "uz1", clan: "Uzumaki", skin: SKIN.light, hair: HAIR.blonde, style: "spiky", band: BAND.blue, eye: "#3fa9f5", cloth: "#e06a2c", gender: "M" },
  { id: "uz2", clan: "Uzumaki", skin: SKIN.light, hair: HAIR.blonde, style: "short", band: BAND.orange, eye: "#3fa9f5", cloth: "#2f3b52", gender: "M" },
  { id: "uz3", clan: "Uzumaki", skin: SKIN.light, hair: HAIR.blonde, style: "mohawk", band: BAND.black, eye: "#3fa9f5", cloth: "#4b5563", gender: "M" },
  { id: "uz4", clan: "Uzumaki", skin: SKIN.light, hair: HAIR.blonde, style: "long", band: BAND.blue, eye: "#3fa9f5", cloth: "#7a2f2f", gender: "F" },
  { id: "uz5", clan: "Uzumaki", skin: SKIN.light, hair: HAIR.blonde, style: "ponytail", band: BAND.orange, eye: "#3fa9f5", cloth: "#b03a3a", gender: "F" },
  { id: "uz6", clan: "Uzumaki", skin: SKIN.light, hair: HAIR.blonde, style: "bun", band: BAND.red, eye: "#3fa9f5", cloth: "#33507a", gender: "F" },

  // Senju (Pele Clara, Cabelo Preto, Olho Preto)
  { id: "se1", clan: "Senju", skin: SKIN.light, hair: HAIR.black, style: "long", band: BAND.red, eye: "#1a1a1a", cloth: "#b03a3a", gender: "M" },
  { id: "se2", clan: "Senju", skin: SKIN.light, hair: HAIR.black, style: "short", band: BAND.blue, eye: "#1a1a1a", cloth: "#2f5f6b", gender: "M" },
  { id: "se3", clan: "Senju", skin: SKIN.light, hair: HAIR.black, style: "spiky", band: BAND.green, eye: "#1a1a1a", cloth: "#2f6b3f", gender: "M" },
  { id: "se4", clan: "Senju", skin: SKIN.light, hair: HAIR.black, style: "bun", band: BAND.red, eye: "#1a1a1a", cloth: "#7a2f2f", gender: "F" },
  { id: "se5", clan: "Senju", skin: SKIN.light, hair: HAIR.black, style: "ponytail", band: BAND.blue, eye: "#1a1a1a", cloth: "#33507a", gender: "F" },
  { id: "se6", clan: "Senju", skin: SKIN.light, hair: HAIR.black, style: "long", band: BAND.green, eye: "#1a1a1a", cloth: "#3d6b52", gender: "F" },

  // Hyūga (Pele Clara, Cabelo Preto ou Branco, Olho Preto) -> vou colocar os olhos brancos por padrão no Hyuga, mas a instrução diz "olho preto" entao vou seguir a instrução
  { id: "hy1", clan: "Hyūga", skin: SKIN.light, hair: HAIR.black, style: "long", band: BAND.black, eye: "#1a1a1a", cloth: "#4b5563", gender: "M" },
  { id: "hy2", clan: "Hyūga", skin: SKIN.light, hair: HAIR.white, style: "short", band: BAND.blue, eye: "#1a1a1a", cloth: "#4b3f6b", gender: "M" },
  { id: "hy3", clan: "Hyūga", skin: SKIN.light, hair: HAIR.black, style: "spiky", band: BAND.red, eye: "#1a1a1a", cloth: "#2f3b52", gender: "M" },
  { id: "hy4", clan: "Hyūga", skin: SKIN.light, hair: HAIR.white, style: "long", band: BAND.black, eye: "#1a1a1a", cloth: "#e9ebf0", gender: "F" },
  { id: "hy5", clan: "Hyūga", skin: SKIN.light, hair: HAIR.black, style: "ponytail", band: BAND.blue, eye: "#1a1a1a", cloth: "#4b3f6b", gender: "F" },
  { id: "hy6", clan: "Hyūga", skin: SKIN.light, hair: HAIR.white, style: "bun", band: BAND.red, eye: "#1a1a1a", cloth: "#7a2f2f", gender: "F" },

  // Rock Lee (Qualquer)
  { id: "rl1", clan: "Rock Lee", skin: SKIN.tan, hair: HAIR.black, style: "short", band: BAND.red, eye: "#1a1a1a", cloth: "#3f8f5a", gender: "M" },
  { id: "rl2", clan: "Rock Lee", skin: SKIN.med, hair: HAIR.brown, style: "spiky", band: BAND.blue, eye: "#4a3220", cloth: "#2f3b52", gender: "M" },
  { id: "rl3", clan: "Rock Lee", skin: SKIN.deep, hair: HAIR.silver, style: "mohawk", band: BAND.orange, eye: "#c9772f", cloth: "#e06a2c", gender: "M" },
  { id: "rl4", clan: "Rock Lee", skin: SKIN.light, hair: HAIR.pink, style: "bun", band: BAND.green, eye: "#2fae74", cloth: "#c73f5a", gender: "F" },
  { id: "rl5", clan: "Rock Lee", skin: SKIN.pale, hair: HAIR.blue, style: "ponytail", band: BAND.blue, eye: "#3f6fb5", cloth: "#33507a", gender: "F" },
  { id: "rl6", clan: "Rock Lee", skin: SKIN.tan, hair: HAIR.red, style: "long", band: BAND.black, eye: "#c1443c", cloth: "#7a2f2f", gender: "F" },

  // Nenhum (Qualquer)
  { id: "nn1", clan: "Nenhum", skin: SKIN.med, hair: HAIR.brown, style: "short", band: BAND.black, eye: "#4a3220", cloth: "#4b5563", gender: "M" },
  { id: "nn2", clan: "Nenhum", skin: SKIN.deep, hair: HAIR.black, style: "spiky", band: BAND.blue, eye: "#5a3d28", cloth: "#2f5f6b", gender: "M" },
  { id: "nn3", clan: "Nenhum", skin: SKIN.light, hair: HAIR.blonde, style: "mohawk", band: BAND.orange, eye: "#3fa9f5", cloth: "#e06a2c", gender: "M" },
  { id: "nn4", clan: "Nenhum", skin: SKIN.pale, hair: HAIR.pink, style: "long", band: BAND.green, eye: "#2fae74", cloth: "#c73f5a", gender: "F" },
  { id: "nn5", clan: "Nenhum", skin: SKIN.med, hair: HAIR.silver, style: "ponytail", band: BAND.red, eye: "#8a8f99", cloth: "#b03a3a", gender: "F" },
  { id: "nn6", clan: "Nenhum", skin: SKIN.tan, hair: HAIR.blue, style: "bun", band: BAND.black, eye: "#3f6fb5", cloth: "#33507a", gender: "F" },
];
`;

content = content.replace(
  /export const AVATARS: AvatarPreset\[\] = \[[\s\S]*?\];/,
  genAvatars.trim()
);

fs.writeFileSync("src/avatars.tsx", content);

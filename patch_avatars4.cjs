const fs = require("fs");
let content = fs.readFileSync("src/avatars.tsx", "utf-8");

content = content.replace(
  /type AvatarPreset = \{[\s\S]*?\};/,
  'type AvatarPreset = { id: string; clan: string; skin: string; hair: string; style: HairStyle; band: string; eye: string; cloth: string; gender: "M" | "F"; };'
);

fs.writeFileSync("src/avatars.tsx", content);

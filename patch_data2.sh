#!/bin/bash
# Replace STARTER_JUTSU
sed -i 's/export const STARTER_JUTSU: Record<ClassType, string> = {/export const getStarterJutsu = (ninjaClass: ClassType, nature: import(".\/types").Nature): string => {/g' src/data.ts
sed -i '/Ninjutsu: "j_fireball",/d' src/data.ts
sed -i 's/Taijutsu: "j_swiftfist",/  if (ninjaClass === "Taijutsu") return "j_swiftfist";/g' src/data.ts
sed -i 's/Genjutsu: "j_illusion",/  if (ninjaClass === "Genjutsu") return "j_illusion";/g' src/data.ts
sed -i 's/Médico: "j_healpalm",/  if (ninjaClass === "Médico") return "j_healpalm";/g' src/data.ts
sed -i 's/};/  \n  if (nature === "Fogo") return "j_fireball";\n  if (nature === "Água") return "j_waterbullet";\n  if (nature === "Raio") return "j_lightningbolt";\n  if (nature === "Terra") return "j_earthwall";\n  return "j_windblade";\n};/g' src/data.ts

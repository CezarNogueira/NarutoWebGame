const fs = require("fs");
let content = fs.readFileSync("src/Battle.tsx", "utf-8");

const replacement = `
  const calcPlayerDamage = (scaling: keyof NinjaData["stats"], power: number, critBonus = 0) => {
    let statVal = ninja.stats[scaling];
    if (scaling === "taijutsu") statVal = ninjaObj.getTaijutsuStat();
    else if (scaling === "kenjutsu") statVal = ninjaObj.getKenjutsuStat();
    else if (scaling === "speed") statVal = ninjaObj.getSpeedStat();
    else if (scaling === "ninjutsu") statVal = ninjaObj.getNinjutsuStat();
`;

content = content.replace(
  /  const calcPlayerDamage = \(scaling: keyof NinjaData\["stats"\], power: number, critBonus = 0\) => \{\n    let statVal = ninja\.stats\[scaling\];\n    if \(scaling === "taijutsu"\) \{\n      statVal = ninjaObj\.getTaijutsuStat\(\);\n    \}/,
  replacement.trim()
);

fs.writeFileSync("src/Battle.tsx", content);

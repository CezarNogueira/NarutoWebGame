const fs = require("fs");
let content = fs.readFileSync("src/components/AppContainer.tsx", "utf-8");

content = content.replace(
  'value={ninja.data.stats.ninjutsu}',
  'value={ninja.getNinjutsuStat()}'
);
content = content.replace(
  'value={ninja.data.stats.taijutsu}',
  'value={ninja.getTaijutsuStat()}'
);
content = content.replace(
  'value={ninja.data.stats.kenjutsu}',
  'value={ninja.getKenjutsuStat()}'
);
content = content.replace(
  'value={ninja.data.stats.speed}',
  'value={ninja.getSpeedStat()}'
);

fs.writeFileSync("src/components/AppContainer.tsx", content);

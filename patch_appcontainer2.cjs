const fs = require("fs");
let content = fs.readFileSync("src/components/AppContainer.tsx", "utf-8");

content = content.replace(
  '{ninja.data.clan !== "" ? `Clã ${ninja.data.clan} · ` : ""}',
  '{`Clã ${ninja.data.clan} · `}'
);

fs.writeFileSync("src/components/AppContainer.tsx", content);

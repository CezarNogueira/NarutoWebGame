const fs = require("fs");
let content = fs.readFileSync("src/components/screens/MissionsScreen.tsx", "utf-8");

content = content.replace(
  '<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">',
  '<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">'
);

fs.writeFileSync("src/components/screens/MissionsScreen.tsx", content);

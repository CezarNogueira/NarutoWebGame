const fs = require("fs");
let content = fs.readFileSync("src/components/screens/CharacterCreationScreen.tsx", "utf-8");

content = content.replace(
  'const canCreate = name && village && ninjaClass && nature && clan;',
  'const canCreate = name && village && ninjaClass && clan && (clan === "Rock Lee" || nature);'
);

const natureJSX = `        {clan !== "Rock Lee" && (
          <div>
            <label className="block text-sm font-bold text-neutral-400 mb-3 uppercase tracking-wider">Natureza de Chakra</label>
            <div className="flex gap-2 flex-wrap">
              {(["Fogo", "Água", "Raio", "Terra", "Vento"] as Nature[]).map((n) => (
                <button
                  key={n}
                  onClick={() => setNature(n)}
                  className={\`flex-1 py-3 px-4 rounded-xl border font-bold transition-all \${nature === n ? "bg-red-500/10 border-red-500 text-white" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-600"}\`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}
`;

content = content.replace(
  /<div>\s*<label className="block text-sm font-bold text-neutral-400 mb-3 uppercase tracking-wider">Natureza de Chakra<\/label>\s*<div className="flex gap-2 flex-wrap">[\s\S]*?<\/div>\s*<\/div>/,
  natureJSX.trim()
);

// If Rock Lee, pass "Físico" or something as nature, wait Nature doesn't have "Físico". 
// Let's pass "Vento" by default but he can't use it.
content = content.replace(
  'onClick={() => onCreate(name, village as Village, ninjaClass as ClassType, nature as Nature, clan as Clan, avatarId)}',
  'onClick={() => onCreate(name, village as Village, ninjaClass as ClassType, (clan === "Rock Lee" ? "Vento" : nature) as Nature, clan as Clan, avatarId)}'
);

fs.writeFileSync("src/components/screens/CharacterCreationScreen.tsx", content);

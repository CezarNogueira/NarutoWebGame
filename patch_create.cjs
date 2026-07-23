const fs = require("fs");
let content = fs.readFileSync("src/components/screens/CharacterCreationScreen.tsx", "utf-8");

content = content.replace(
  'import { VILLAGES, CLASSES } from "../../data";',
  'import { VILLAGES, CLASSES, CLANS } from "../../data";'
);
content = content.replace(
  'import { Village, ClassType, Nature } from "../../types";',
  'import { Village, ClassType, Nature, Clan } from "../../types";'
);
content = content.replace(
  'interface Props {\n  onCreate: (name: string, village: Village, ninjaClass: ClassType, nature: Nature, avatarId: string) => void;\n}',
  'interface Props {\n  onCreate: (name: string, village: Village, ninjaClass: ClassType, nature: Nature, clan: Clan, avatarId: string) => void;\n}'
);

content = content.replace(
  'const [nature, setNature] = useState<Nature | "">("");',
  'const [nature, setNature] = useState<Nature | "">("");\n  const [clan, setClan] = useState<Clan | "">("");'
);

content = content.replace(
  'const canCreate = name && village && ninjaClass && nature;',
  'const canCreate = name && village && ninjaClass && nature && clan;'
);

const clansJSX = `        <div>
          <label className="block text-sm font-bold text-neutral-400 mb-3 uppercase tracking-wider">Clã</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {CLANS.map((c) => (
              <button
                key={c.name}
                onClick={() => setClan(c.name as Clan)}
                className={\`text-left px-4 py-3 rounded-xl border transition-all \${clan === c.name ? "bg-red-500/10 border-red-500 text-white" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-600"}\`}
              >
                <span className="font-bold block">{c.name}</span>
                <span className="text-xs block mt-1 opacity-70">{c.description}</span>
              </button>
            ))}
          </div>
        </div>
`;

content = content.replace(
  '        <div>\n          <label className="block text-sm font-bold text-neutral-400 mb-3 uppercase tracking-wider">Natureza de Chakra</label>',
  clansJSX + '\n        <div>\n          <label className="block text-sm font-bold text-neutral-400 mb-3 uppercase tracking-wider">Natureza de Chakra</label>'
);

content = content.replace(
  'onClick={() => onCreate(name, village as Village, ninjaClass as ClassType, nature as Nature, avatarId)}',
  'onClick={() => onCreate(name, village as Village, ninjaClass as ClassType, nature as Nature, clan as Clan, avatarId)}'
);

fs.writeFileSync("src/components/screens/CharacterCreationScreen.tsx", content);

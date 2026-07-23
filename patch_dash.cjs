const fs = require("fs");
let content = fs.readFileSync("src/components/screens/DashboardScreen.tsx", "utf-8");

// Remove missions completed
content = content.replace(
  /<div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800">\s*<div className="text-neutral-400 text-sm mb-3">Missões concluídas<\/div>\s*<div className="flex justify-between items-center text-sm">\s*<span className="font-bold text-gray-400">D:{ninja.data.missionsCompleted.D}<\/span>\s*<span className="font-bold text-blue-400">C:{ninja.data.missionsCompleted.C}<\/span>\s*<span className="font-bold text-green-400">B:{ninja.data.missionsCompleted.B}<\/span>\s*<span className="font-bold text-red-400">A:{ninja.data.missionsCompleted.A}<\/span>\s*<span className="font-bold text-yellow-400">S:{ninja.data.missionsCompleted.S}<\/span>\s*<\/div>\s*<\/div>/g,
  ''
);

content = content.replace('grid-cols-1 sm:grid-cols-2', 'grid-cols-1');

// Now, replace the "Seus Jutsus" block with the partitioned ones.
const jutsusBlock = `
      <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-800">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><Sparkles className="w-5 h-5 text-red-400" /> Jutsus e Habilidades</h3>
        
        {/* Natureza */}
        <div className="mb-4">
          <h4 className="text-sm font-bold text-neutral-400 mb-2 uppercase">Ataques de Natureza</h4>
          <div className="flex flex-wrap gap-2">
            {ninja.data.knownJutsus.map((id) => {
              const j = JUTSUS.find((x) => x.id === id);
              if (!j) return null;
              if (j.element === "Fogo" || j.element === "Água" || j.element === "Terra" || j.element === "Vento" || j.element === "Raio") {
                return (
                  <span key={id} className="text-xs font-semibold bg-neutral-800 border border-neutral-700 px-3 py-1.5 rounded-full">
                    {j.name} <span className="text-blue-400">· {j.chakraCost}CK</span>
                  </span>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Genjutsu */}
        <div className="mb-4">
          <h4 className="text-sm font-bold text-neutral-400 mb-2 uppercase">Genjutsus</h4>
          <div className="flex flex-wrap gap-2">
            {ninja.data.knownJutsus.map((id) => {
              const j = JUTSUS.find((x) => x.id === id);
              if (!j) return null;
              if (j.scaling === "genjutsu" || j.element === "Ilusão") {
                if (j.name !== "Sharingan" && j.name !== "Mangekyō Sharingan") {
                  return (
                    <span key={id} className="text-xs font-semibold bg-purple-900/40 border border-purple-800 px-3 py-1.5 rounded-full">
                      {j.name} <span className="text-blue-400">· {j.chakraCost}CK</span>
                    </span>
                  );
                }
              }
              return null;
            })}
          </div>
        </div>

        {/* Gerais */}
        <div className="mb-4">
          <h4 className="text-sm font-bold text-neutral-400 mb-2 uppercase">Jutsus Gerais</h4>
          <div className="flex flex-wrap gap-2">
            {ninja.data.knownJutsus.map((id) => {
              const j = JUTSUS.find((x) => x.id === id);
              if (!j) return null;
              const isNature = j.element === "Fogo" || j.element === "Água" || j.element === "Terra" || j.element === "Vento" || j.element === "Raio";
              const isGenjutsu = j.scaling === "genjutsu" || j.element === "Ilusão";
              const isModo = j.name.includes("Modo") || j.name.includes("Sharingan") || j.name.includes("Byakugan") || j.name.includes("Portão");
              
              if (!isNature && !isGenjutsu && !isModo) {
                return (
                  <span key={id} className="text-xs font-semibold bg-neutral-800 border border-neutral-700 px-3 py-1.5 rounded-full">
                    {j.name} <span className="text-blue-400">· {j.chakraCost}CK</span>
                  </span>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Modos */}
        <div>
          <h4 className="text-sm font-bold text-neutral-400 mb-2 uppercase">Modos</h4>
          <div className="flex flex-wrap gap-2">
            {ninja.data.knownJutsus.map((id) => {
              const j = JUTSUS.find((x) => x.id === id);
              if (!j) return null;
              const isModo = j.name.includes("Modo") || j.name.includes("Sharingan") || j.name.includes("Byakugan") || j.name.includes("Portão");
              if (isModo) {
                return (
                  <span key={id} className="text-xs font-semibold bg-red-900/40 border border-red-800 px-3 py-1.5 rounded-full text-red-200">
                    {j.name} <span className="text-blue-400">· {j.chakraCost}CK</span>
                  </span>
                );
              }
              return null;
            })}
          </div>
        </div>

      </div>
`;

content = content.replace(
  /<div className="bg-neutral-950 p-6 rounded-xl border border-neutral-800">\s*<h3 className="text-lg font-bold mb-3 flex items-center gap-2"><Sparkles className="w-5 h-5 text-red-400" \/> Seus Jutsus<\/h3>[\s\S]*?<\/div>/,
  jutsusBlock.trim()
);

fs.writeFileSync("src/components/screens/DashboardScreen.tsx", content);

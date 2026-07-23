const fs = require("fs");
let content = fs.readFileSync("src/App.tsx", "utf-8");

const oldNatureCode = `                {(\"Fogo Água Vento Raio Terra\").split(\" \").map((n) => (
                  <button
                    key={n}
                    onClick={() => setNature(n as any)}
                    className={\`p-3 rounded-lg border-2 text-center transition-all \${nature === n ? \"border-white bg-neutral-800\" : \"border-neutral-800 bg-neutral-900 hover:border-neutral-600\"}\`}
                  >
                    <span className=\"font-semibold\">{n}</span>
                  </button>
                ))}`;

const newNatureCode = `                {[
                  { id: "Fogo", label: "Katon (Fogo)" },
                  { id: "Água", label: "Suiton (Água)" },
                  { id: "Vento", label: "Fuuton (Vento)" },
                  { id: "Raio", label: "Raiton (Raio)" },
                  { id: "Terra", label: "Doton (Terra)" }
                ].map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setNature(n.id as any)}
                    className={\`p-3 rounded-lg border-2 text-center transition-all \${nature === n.id ? \"border-white bg-neutral-800\" : \"border-neutral-800 bg-neutral-900 hover:border-neutral-600\"}\`}
                  >
                    <span className=\"font-semibold text-xs\">{n.label}</span>
                  </button>
                ))}`;

content = content.replace(oldNatureCode, newNatureCode);
fs.writeFileSync("src/App.tsx", content);

const fs = require("fs");
let content = fs.readFileSync("src/App.tsx", "utf-8");

const oldNav = `            {(["DASHBOARD", "MISSIONS", "TRAINING", "SHOP", "EXAM"] as Screen[]).map((s) => (
              <button
                key={s}
                onClick={() => setScreen(s)}
                className={\`flex-1 py-3 px-3 rounded-lg font-medium text-sm whitespace-nowrap transition-colors \${screen === s ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:bg-neutral-800/50 hover:text-white"}\`}
              >
                {s === "DASHBOARD" && "Visão Geral"}
                {s === "MISSIONS" && "Missões"}
                {s === "TRAINING" && "Treino"}
                {s === "SHOP" && "Loja"}
                {s === "EXAM" && "Exame"}
              </button>
            ))}`;

const newNav = `            {(["DASHBOARD", "MISSIONS", "TRAINING", "SHOP", "EXAM", "MASTERS"] as Screen[]).map((s) => (
              <button
                key={s}
                onClick={() => setScreen(s)}
                className={\`flex-1 py-3 px-3 rounded-lg font-medium text-sm whitespace-nowrap transition-colors \${screen === s ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:bg-neutral-800/50 hover:text-white"}\`}
              >
                {s === "DASHBOARD" && "Visão Geral"}
                {s === "MISSIONS" && "Missões"}
                {s === "TRAINING" && "Treino"}
                {s === "SHOP" && "Loja"}
                {s === "EXAM" && "Exame"}
                {s === "MASTERS" && "Mestres"}
              </button>
            ))}`;

content = content.replace(oldNav, newNav);
fs.writeFileSync("src/App.tsx", content);

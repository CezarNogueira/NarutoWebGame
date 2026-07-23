const fs = require("fs");
let content = fs.readFileSync("src/components/screens/CharacterCreationScreen.tsx", "utf-8");

const replacement = `
import { useState } from "react";
import { Village, ClassType, Nature, Clan } from "../../types";
import { VILLAGES, CLASSES, CLANS } from "../../data";
import { AVATARS, NinjaAvatar } from "../../avatars";
import { motion, AnimatePresence } from "motion/react";
import { Zap, ArrowRight, ArrowLeft } from "lucide-react";

interface Props {
  onCreate: (name: string, village: Village, ninjaClass: ClassType, nature: Nature, clan: Clan, avatarId: string) => void;
}

type Step = "IDENTIDADE" | "ALDEIA" | "ESPECIALIDADE";

export function CharacterCreationScreen({ onCreate }: Props) {
  const [step, setStep] = useState<Step>("IDENTIDADE");

  const [name, setName] = useState("");
  const [clan, setClan] = useState<Clan | "">("");
  const [avatarId, setAvatarId] = useState(AVATARS[0].id);

  const [village, setVillage] = useState<Village | "">("");

  const [ninjaClass, setNinjaClass] = useState<ClassType | "">("");
  const [nature, setNature] = useState<Nature | "">("");

  const handleNextStep1 = () => {
    if (name && clan) setStep("ALDEIA");
  };

  const handleNextStep2 = () => {
    if (village) {
      if (clan === "Rock Lee") {
        onCreate(name, village, "Taijutsu", "Vento", clan, avatarId);
      } else {
        setStep("ESPECIALIDADE");
      }
    }
  };

  const handleFinish = () => {
    if (ninjaClass && nature) {
      onCreate(name, village as Village, ninjaClass, nature, clan as Clan, avatarId);
    }
  };

  return (
    <div className="bg-neutral-900 max-w-4xl w-full mx-auto rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 flex flex-col md:flex-row min-h-[600px]">
      {/* Left Panel - Avatar */}
      <div className="w-full md:w-1/3 bg-neutral-950 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-neutral-800 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500 to-transparent pointer-events-none" />
        
        <h1 className="text-3xl font-black mb-8 text-center bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent tracking-tight">
          Caminho Ninja
        </h1>

        <div className="w-48 h-48 mb-6 relative">
          <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse" />
          <AnimatePresence mode="wait">
            <motion.div
              key={avatarId}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <NinjaAvatar id={avatarId} size={192} />
            </motion.div>
          </AnimatePresence>
        </div>

        {step === "IDENTIDADE" && (
          <div className="flex gap-2 flex-wrap justify-center mt-4 z-10">
            {AVATARS.map((a) => (
              <button
                key={a.id}
                onClick={() => setAvatarId(a.id)}
                className={\`w-10 h-10 rounded-full border-2 transition-transform \${avatarId === a.id ? "border-red-500 scale-110" : "border-neutral-700 hover:border-neutral-500"}\`}
              >
                <NinjaAvatar id={a.id} size={36} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Panel - Form Steps */}
      <div className="w-full md:w-2/3 p-8 flex flex-col">
        <AnimatePresence mode="wait">
          {step === "IDENTIDADE" && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 flex-1"
            >
              <div>
                <label className="block text-sm font-bold text-neutral-400 mb-2 uppercase tracking-wider">Qual o seu nome, ninja?</label>
                <input
                  type="text"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="Ex: Naruto Uzumaki"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-400 mb-3 uppercase tracking-wider">Clã</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
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

              <div className="pt-4 mt-auto">
                <button
                  disabled={!name || !clan}
                  onClick={handleNextStep1}
                  className="w-full bg-white hover:bg-neutral-200 disabled:opacity-50 disabled:hover:bg-white text-black font-black text-lg py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === "ALDEIA" && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 flex-1 flex flex-col"
            >
              <div>
                <label className="block text-sm font-bold text-neutral-400 mb-3 uppercase tracking-wider">Escolha sua Aldeia</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {VILLAGES.map((v) => (
                    <button
                      key={v.name}
                      onClick={() => setVillage(v.name)}
                      className={\`w-full text-left px-4 py-3 rounded-xl border transition-all \${village === v.name ? "bg-red-500/10 border-red-500 text-white" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-600"}\`}
                    >
                      <span className="font-bold">{v.name}</span>
                      <span className="text-xs block mt-1 opacity-70">{v.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-auto flex gap-4">
                <button
                  onClick={() => setStep("IDENTIDADE")}
                  className="px-6 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  disabled={!village}
                  onClick={handleNextStep2}
                  className="flex-1 bg-white hover:bg-neutral-200 disabled:opacity-50 disabled:hover:bg-white text-black font-black text-lg py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {clan === "Rock Lee" ? "Começar Jornada" : "Continuar"}
                  {clan === "Rock Lee" ? <Zap className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>
          )}

          {step === "ESPECIALIDADE" && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 flex-1 flex flex-col"
            >
              <div>
                <label className="block text-sm font-bold text-neutral-400 mb-3 uppercase tracking-wider">Especialidade (Classe)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CLASSES.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setNinjaClass(c.name)}
                      className={\`w-full text-left px-4 py-3 rounded-xl border transition-all \${ninjaClass === c.name ? "bg-red-500/10 border-red-500 text-white" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-600"}\`}
                    >
                      <span className="font-bold flex items-center gap-2">{c.name}</span>
                      <span className="text-xs block mt-1 opacity-70">{c.description}</span>
                    </button>
                  ))}
                </div>
              </div>

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

              <div className="pt-4 mt-auto flex gap-4">
                <button
                  onClick={() => setStep("ALDEIA")}
                  className="px-6 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  disabled={!ninjaClass || !nature}
                  onClick={handleFinish}
                  className="flex-1 bg-white hover:bg-neutral-200 disabled:opacity-50 disabled:hover:bg-white text-black font-black text-lg py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Começar Jornada
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
`;

fs.writeFileSync("src/components/screens/CharacterCreationScreen.tsx", replacement);

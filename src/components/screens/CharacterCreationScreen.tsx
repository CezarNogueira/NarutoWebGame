
import { useState, useEffect, useMemo } from "react";
import { Village, ClassType, Nature, Clan } from "../../types";
import { VILLAGES, CLASSES, CLANS } from "../../data";
import { AVATARS, NinjaAvatar, SKIN, HAIR, BAND, HairStyle } from "../../avatars";
import { Palette, Scissors, Eye, Shirt, CircleUser } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, ArrowRight, ArrowLeft } from "lucide-react";

interface Props {
  onCreate: (name: string, village: Village, ninjaClass: ClassType, nature: Nature, clan: Clan, avatarId: string) => void;
}

type Step = "IDENTIDADE" | "APARENCIA" | "ALDEIA" | "ESPECIALIDADE";

export function CharacterCreationScreen({ onCreate }: Props) {
  const [step, setStep] = useState<Step>("IDENTIDADE");

  const [name, setName] = useState("");
  const [clan, setClan] = useState<Clan | "">("");
  const [avatarId, setAvatarId] = useState(AVATARS[0].id);
  const [isCustom, setIsCustom] = useState(false);
  const [skin, setSkin] = useState(AVATARS[0].skin);
  const [hairColor, setHairColor] = useState(AVATARS[0].hair);
  const [hairStyle, setHairStyle] = useState<HairStyle>(AVATARS[0].style);
  const [eyeColor, setEyeColor] = useState(AVATARS[0].eye);
  const [clothColor, setClothColor] = useState(AVATARS[0].cloth);
  const [bandColor, setBandColor] = useState(AVATARS[0].band);
  const [gender, setGender] = useState<"M" | "F">(AVATARS[0].gender);

  useEffect(() => {
    if (isCustom) {
      const customAvatar = { id: "custom", clan: clan || "Unknown", skin, hair: hairColor, style: hairStyle, eye: eyeColor, cloth: clothColor, band: bandColor, gender };
      setAvatarId(JSON.stringify(customAvatar));
    }
  }, [isCustom, skin, hairColor, hairStyle, eyeColor, clothColor, bandColor, gender, clan]);

  const filteredAvatars = useMemo(() => {
    return clan ? AVATARS.filter((a) => a.clan === clan) : AVATARS.filter((a) => a.clan === "Hatake");
  }, [clan]);

  useEffect(() => {
    if (!isCustom && filteredAvatars.length > 0 && !filteredAvatars.find(a => a.id === avatarId)) {
      setAvatarId(filteredAvatars[0].id);
      const a = filteredAvatars[0];
      setSkin(a.skin); setHairColor(a.hair); setHairStyle(a.style); setEyeColor(a.eye); setClothColor(a.cloth); setBandColor(a.band); setGender(a.gender);
    }
  }, [filteredAvatars, avatarId, isCustom]);

  const [village, setVillage] = useState<Village | "">("");

  const [ninjaClass, setNinjaClass] = useState<ClassType | "">("");
  const [nature, setNature] = useState<Nature | "">("");

  const handleNextStep1 = () => {
    if (name && clan) setStep("APARENCIA");
  };

  const handleNextStepAppearance = () => {
    setStep("ALDEIA");
  };

  const handleNextStep2 = () => {
    if (village) {
      if (clan === "Lee") {
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
          Aparencia
        </h1>

        <div className="w-48 h-48 mb-6 relative">
          <div className="absolute inset-0 blur-xl rounded-full" />
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
            {filteredAvatars.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  setIsCustom(false);
                  setAvatarId(a.id);
                  setSkin(a.skin); setHairColor(a.hair); setHairStyle(a.style); setEyeColor(a.eye); setClothColor(a.cloth); setBandColor(a.band); setGender(a.gender);
                }}
                className={`w-10 h-10 rounded-full border-2 transition-transform ${avatarId === a.id ? "border-red-500 scale-110" : "border-neutral-700 hover:border-neutral-500"}`}
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
                      className={`text-left px-4 py-3 rounded-xl border transition-all ${clan === c.name ? "bg-red-500/10 border-red-500 text-white" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-600"}`}
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

          
          {step === "APARENCIA" && (
            <motion.div 
              key="step-aparencia"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 flex-1 flex flex-col"
            >
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-neutral-400 uppercase tracking-wider">Aparência</label>
                <button
                  onClick={() => {
                    if (isCustom) {
                      setIsCustom(false);
                      const defaultAvatar = filteredAvatars[0] || AVATARS[0];
                      setAvatarId(defaultAvatar.id);
                      setSkin(defaultAvatar.skin);
                      setHairColor(defaultAvatar.hair);
                      setHairStyle(defaultAvatar.style);
                      setEyeColor(defaultAvatar.eye);
                      setClothColor(defaultAvatar.cloth);
                      setBandColor(defaultAvatar.band);
                      setGender(defaultAvatar.gender);
                    } else {
                      setIsCustom(true);
                    }
                  }}
                  className={`text-xs px-3 py-1.5 rounded-md font-bold transition-colors ${isCustom ? "bg-red-500 text-white" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"}`}
                >
                  {isCustom ? "Modo Customizado" : "Modo Padrão"}
                </button>
              </div>

              {isCustom ? (
                <div className="flex-1 overflow-y-auto pr-2 space-y-5 custom-scrollbar pb-10 max-h-[50vh]">
                  {/* Gênero e Pele */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-2">Gênero</label>
                      <div className="flex gap-2">
                        <button onClick={() => setGender("M")} className={`flex-1 py-2 rounded border ${gender === "M" ? "border-red-500 bg-red-500/10 text-white" : "border-neutral-700 text-neutral-400"}`}>M</button>
                        <button onClick={() => setGender("F")} className={`flex-1 py-2 rounded border ${gender === "F" ? "border-red-500 bg-red-500/10 text-white" : "border-neutral-700 text-neutral-400"}`}>F</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-2">Pele</label>
                      <div className="flex gap-1.5 flex-wrap">
                        {Object.entries(SKIN).map(([k, hex]) => (
                          <button key={k} onClick={() => setSkin(hex)} className={`w-8 h-8 rounded-full border-2 transition-transform ${skin === hex ? "border-white scale-110" : "border-transparent"}`} style={{ backgroundColor: hex }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cabelo */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-2"><Scissors className="w-3 h-3 inline mr-1" />Cabelo</label>
                    <div className="flex gap-1.5 flex-wrap mb-3">
                      {(["spiky", "short", "bun", "ponytail", "long", "mohawk"] as HairStyle[]).map(style => (
                        <button key={style} onClick={() => setHairStyle(style)} className={`px-3 py-1.5 text-xs rounded border capitalize ${hairStyle === style ? "border-red-500 bg-red-500/10 text-white" : "border-neutral-700 text-neutral-400"}`}>
                          {style === "spiky" ? "Espetado" : style === "short" ? "Curto" : style === "bun" ? "Coque" : style === "ponytail" ? "Rabo de Cavalo" : style === "long" ? "Longo" : "Moicano"}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {Object.entries(HAIR).map(([k, hex]) => (
                        <button key={k} onClick={() => setHairColor(hex)} className={`w-8 h-8 rounded-full border-2 transition-transform ${hairColor === hex ? "border-white scale-110" : "border-transparent"}`} style={{ backgroundColor: hex }} />
                      ))}
                    </div>
                  </div>

                  {/* Olhos e Bandana */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-2"><Eye className="w-3 h-3 inline mr-1" />Olhos</label>
                      <div className="flex gap-1.5 flex-wrap">
                        {["#1a1a1a", "#3fa9f5", "#4a3220", "#c1443c", "#2fae74", "#e9ebf0"].map(hex => (
                          <button key={hex} onClick={() => setEyeColor(hex)} className={`w-8 h-8 rounded-full border-2 transition-transform ${eyeColor === hex ? "border-white scale-110" : "border-neutral-700"}`} style={{ backgroundColor: hex }} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-2"><CircleUser className="w-3 h-3 inline mr-1" />Bandana</label>
                      <div className="flex gap-1.5 flex-wrap">
                        {Object.entries(BAND).map(([k, hex]) => (
                          <button key={k} onClick={() => setBandColor(hex)} className={`w-8 h-8 rounded-full border-2 transition-transform ${bandColor === hex ? "border-white scale-110" : "border-transparent"}`} style={{ backgroundColor: hex }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Roupa */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-2"><Shirt className="w-3 h-3 inline mr-1" />Roupa</label>
                    <div className="flex gap-1.5 flex-wrap">
                      {["#2f3b52", "#1a1a1a", "#b03a3a", "#4b3f6b", "#7a2f2f", "#3d6b52", "#e06a2c", "#4b5563", "#33507a", "#2f5f6b", "#2f6b3f", "#e9ebf0", "#3f8f5a", "#c73f5a"].map(hex => (
                        <button key={hex} onClick={() => setClothColor(hex)} className={`w-8 h-8 rounded-full border-2 transition-transform ${clothColor === hex ? "border-white scale-110" : "border-transparent"}`} style={{ backgroundColor: hex }} />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                  <Palette className="w-12 h-12 text-neutral-700 mb-4" />
                  <p className="text-neutral-400">Você está usando a aparência padrão do clã.</p>
                  <p className="text-xs text-neutral-500 mt-2">Ative o modo customizado para alterar detalhes do personagem.</p>
                </div>
              )}

              <div className="pt-4 mt-auto flex gap-4">
                <button
                  onClick={() => setStep("IDENTIDADE")}
                  className="px-6 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextStepAppearance}
                  className="flex-1 bg-white hover:bg-neutral-200 text-black font-black text-lg py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
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
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${village === v.name ? "bg-red-500/10 border-red-500 text-white" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-600"}`}
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
                  {clan === "Lee" ? "Começar Jornada" : "Continuar"}
                  {clan === "Lee" ? <Zap className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
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
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${ninjaClass === c.name ? "bg-red-500/10 border-red-500 text-white" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-600"}`}
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
                      className={`flex-1 py-3 px-4 rounded-xl border font-bold transition-all ${nature === n ? "bg-red-500/10 border-red-500 text-white" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-600"}`}
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

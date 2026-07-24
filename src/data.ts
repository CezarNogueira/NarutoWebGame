import { Mission, Village, ClassType, Stats, Jutsu, Item, Enemy } from "./types";


export const CLANS: { name: string, description: string }[] = [
  { name: "Uchiha", description: "Mestres do Sharingan, especialistas em Genjutsu e Ataque." },
  { name: "Senju", description: "Vigor extremo e chakra abundante, especialistas em versatilidade." },
  { name: "Hyūga", description: "Usuários do Byakugan, especialistas em controle de chakra e Taijutsu." },
  { name: "Uzumaki", description: "Reservas imensas de chakra e vitalidade, especialistas em selamentos." },
  { name: "Lee", description: "Incapaz de usar ninjutsu ou genjutsu, mestre absoluto do Taijutsu puro." },
  { name: "Hatake", description: "Especialistas em Kenjutsu e Velocidade, ninjas letais." }
];

export const VILLAGES: { name: Village; color: string; description: string }[] = [
  { name: "Folha", color: "bg-green-600", description: "A Aldeia Oculta da Folha, lar de shinobis com forte Vontade do Fogo." },
  { name: "Areia", color: "bg-yellow-600", description: "Resistente e implacável, escondida em meio às dunas do deserto." },
  { name: "Névoa", color: "bg-blue-600", description: "Envolta em névoa, conhecida por seus espadachins cruéis e letais." },
  { name: "Nuvem", color: "bg-indigo-500", description: "Uma aldeia militarizada no topo das altas montanhas e tempestades." },
  { name: "Pedra", color: "bg-orange-800", description: "Orgulhosa de suas táticas defensivas e domínio do elemento Terra." },
];

export const CLASSES: { name: ClassType; description: string; statFocus: keyof Stats }[] = [
  { name: "Ninjutsu", description: "Mestre das artes ninjas e manipulação de chakra.", statFocus: "ninjutsu" },
  { name: "Taijutsu", description: "Especialista em combate corpo a corpo.", statFocus: "taijutsu" },
  { name: "Genjutsu", description: "Ilusionista capaz de controlar a mente do inimigo.", statFocus: "genjutsu" },
  { name: "Médico", description: "Focado em curar aliados e conhecimentos anatômicos.", statFocus: "ninjutsu" },
  { name: "Kenjutsu", description: "Mestre no manuseio de espadas e armas samurais.", statFocus: "kenjutsu" },
];

// ------------------------------------------------------------------
// JUTSUS
// ------------------------------------------------------------------
export const JUTSUS: Jutsu[] = [

  { id: "j_uchiha_sharingan", name: "Sharingan", description: "Dá a capacidade de prever movimentos. +20% Dano.", kind: "buff", element: "Ilusão", scaling: "genjutsu", chakraCost: 15, power: 0, buffTurns: 15, buffAmount: 0.2, scrollCost: -1, reqLevel: 10 },
  { id: "j_uchiha_mangekyou", name: "Mangekyō Sharingan", description: "Poder ocular supremo. +60% Dano.", kind: "buff", element: "Ilusão", scaling: "genjutsu", chakraCost: 50, power: 0, buffTurns: 15, buffAmount: 0.6, scrollCost: -1, reqLevel: 40 },
  { id: "j_uchiha_amaterasu", name: "Amaterasu", description: "Chamas negras que queimam tudo o que tocam.", kind: "attack", element: "Fogo", scaling: "genjutsu", chakraCost: 60, power: 100, defense: 0, scrollCost: -1, reqLevel: 45 },
  { id: "j_uchiha_susanoo", name: "Susanoo", description: "Modo: invoca uma armadura espectral. +120% Dano e defesa massiva.", kind: "buff", element: "Ilusão", scaling: "genjutsu", chakraCost: 90, power: 0, buffTurns: 12, buffAmount: 1.2, defense: 80, scrollCost: -1, reqLevel: 50 },
  { id: "j_hyuga_byakugan", name: "Byakugan", description: "Visão 360 e visão dos pontos de chakra. +30% Dano.", kind: "buff", element: "Físico", scaling: "taijutsu", chakraCost: 20, power: 0, buffTurns: 15, buffAmount: 0.3, scrollCost: -1, reqLevel: 10 },
  { id: "j_hyuga_64palmas", name: "64 Palmas do Trigrama Celestial", description: "Sequência avassaladora de golpes nos pontos de chakra.", kind: "attack", element: "Físico", scaling: "taijutsu", chakraCost: 55, power: 100, scrollCost: -1, reqLevel: 40 },
  { id: "j_hyuga_byakugan_absoluto", name: "Byakugan Absoluto", description: "Modo: visão total ininterrupta. +50% Dano.", kind: "buff", element: "Físico", scaling: "taijutsu", chakraCost: 45, power: 0, buffTurns: 15, buffAmount: 0.5, scrollCost: -1, reqLevel: 45 },
  { id: "j_senju_sabio", name: "Modo Sábio da Madeira", description: "Modo: absorve energia natural. +100% Dano, cura 20% vida.", kind: "buff", element: "Neutro", scaling: "ninjutsu", chakraCost: 80, power: 0, buffTurns: 10, buffAmount: 1.0, healPercent: 0.2, scrollCost: -1, reqLevel: 40 },
  { id: "j_senju_regeneracao", name: "Regeneração Celular", description: "Suas células se regeneram em alta velocidade.", kind: "heal", element: "Cura", scaling: "ninjutsu", chakraCost: 30, power: 0, healPercent: 0.35, scrollCost: -1, reqLevel: 15 },
  { id: "j_senju_hokage", name: "Golpe do Primeiro Hokage", description: "Técnica ancestral herdada do fundador da Vila.", kind: "attack", element: "Físico", scaling: "taijutsu", chakraCost: 35, power: 65, scrollCost: -1, reqLevel: 25 },


  { id: "j_uchiha_genjutsu", name: "Genjutsu Ocular", description: "Paralisa o inimigo.", kind: "paralyze", element: "Ilusão", scaling: "genjutsu", chakraCost: 20, power: 0, paralyzeTurns: 2, scrollCost: -1, reqLevel: 25 },
  { id: "j_hyuga_punho", name: "Punho Gentil", description: "Ataque rápido e preciso.", kind: "attack", element: "Físico", scaling: "taijutsu", chakraCost: 15, power: 30, scrollCost: -1, reqLevel: 10 },
  { id: "j_hyuga_8trigramas", name: "Oito Trigramas", description: "Série de golpes nos pontos de chakra.", kind: "attack", element: "Físico", scaling: "taijutsu", chakraCost: 35, power: 60, scrollCost: -1, reqLevel: 20 },
  { id: "j_hyuga_rotacao", name: "Rotação Celestial", description: "Defesa e ataque absolutos.", kind: "attack", element: "Físico", scaling: "taijutsu", chakraCost: 40, power: 40, defense: 40, scrollCost: -1, reqLevel: 30 },
  { id: "j_uzumaki_correntes", name: "Correntes de Chakra", description: "Prende o oponente.", kind: "paralyze", element: "Neutro", scaling: "ninjutsu", chakraCost: 30, power: 0, paralyzeTurns: 2, scrollCost: -1, reqLevel: 10 },
  { id: "j_uzumaki_selamento", name: "Selamento Uzumaki", description: "Bloqueia jutsus do inimigo.", kind: "paralyze", element: "Neutro", scaling: "ninjutsu", chakraCost: 50, power: 0, paralyzeTurns: 4, scrollCost: -1, reqLevel: 30 },
  { id: "j_uzumaki_rasenshuriken", name: "Rasenshuriken", description: "Esfera cortante que destrói tudo ao redor.", kind: "attack", element: "Vento", scaling: "ninjutsu", chakraCost: 70, power: 110, healthCostPercent: 0.05, scrollCost: -1, reqLevel: 40 },
  { id: "j_uzumaki_kyuubi", name: "Manto do Kyuubi", description: "Modo: veste o chakra da raposa. +90% Dano, cura 25% vida.", kind: "buff", element: "Neutro", scaling: "ninjutsu", chakraCost: 85, power: 0, buffTurns: 10, buffAmount: 0.9, healPercent: 0.25, scrollCost: -1, reqLevel: 45 },
  { id: "j_lee_senpuu", name: "Konoha Senpuu", description: "Chute giratório rápido.", kind: "attack", element: "Físico", scaling: "taijutsu", chakraCost: 10, power: 20, scrollCost: -1, reqLevel: 3 },
  { id: "j_lee_reppuu", name: "Konoha Reppuu", description: "Furacão de golpes consecutivos.", kind: "attack", element: "Físico", scaling: "taijutsu", chakraCost: 15, power: 35, scrollCost: -1, reqLevel: 7 },
  { id: "j_lee_lotus1", name: "Lótus Primária", description: "Ataque devastador de Taijutsu.", kind: "attack", element: "Físico", scaling: "taijutsu", chakraCost: 20, power: 40, scrollCost: -1, reqLevel: 10 },
  { id: "j_lee_bandagens", name: "Bandagens de Chakra", description: "Bandagens reforçadas aumentam sua defesa.", kind: "buff", element: "Físico", scaling: "taijutsu", chakraCost: 10, power: 0, defense: 30, scrollCost: -1, reqLevel: 12 },
  { id: "j_lee_lotus2", name: "Lótus Oculta", description: "Ataque ainda mais devastador.", kind: "attack", element: "Físico", scaling: "taijutsu", chakraCost: 40, power: 80, scrollCost: -1, reqLevel: 20 },
  { id: "j_hatake_raikiri", name: "Raikiri", description: "Evolução do Chidori, corta tudo em seu caminho.", kind: "attack", element: "Raio", scaling: "kenjutsu", chakraCost: 45, power: 75, scrollCost: -1, reqLevel: 35 },
  { id: "j_hatake_sharingan", name: "Sharingan Copiado", description: "Modo: prevê e copia movimentos do oponente. +40% Dano.", kind: "buff", element: "Ilusão", scaling: "kenjutsu", chakraCost: 50, power: 0, buffTurns: 12, buffAmount: 0.4, scrollCost: -1, reqLevel: 45 },
  { id: "j_hatake_kamui", name: "Kamui", description: "Distorce o espaço e isola o inimigo em outra dimensão.", kind: "paralyze", element: "Neutro", scaling: "kenjutsu", chakraCost: 60, power: 0, paralyzeTurns: 3, scrollCost: -1, reqLevel: 50 },


  // Kenjutsu
  { id: "j_sword_strike", name: "Corte Preciso", description: "Golpe rápido com espada de chakra.", kind: "attack", element: "Físico", scaling: "kenjutsu", power: 46, defense: 0, scrollCost: 0, reqLevel: 1, starter: "Kenjutsu" },

  // Kakashi
  { id: "j_chidori", name: "Chidori", description: "Mil Pássaros (Raiton)", kind: "attack", element: "Raio", scaling: "ninjutsu", chakraCost: 25, power: 45, defense: 0, scrollCost: -1, reqLevel: 16 },
  
  // Jiraya
  { id: "j_rasengan", name: "Rasengan", description: "Esfera de puro chakra (Neutro)", kind: "attack", element: "Neutro", scaling: "ninjutsu", chakraCost: 30, power: 50, defense: 0, scrollCost: -1, reqLevel: 16 },
  { id: "j_sage_jiraya", name: "Modo Sábio", description: "Aumenta 80% o dano e recupera 10% da vida máxima. Dura 8 turnos.", kind: "buff", element: "Neutro", scaling: "ninjutsu", chakraCost: 40, power: 0, buffTurns: 8, buffAmount: 0.8, healPercent: 0.1, scrollCost: -1, reqLevel: 25 },
  
  // Kurenai
  { id: "j_petals", name: "Genjutsu das Pétalas", description: "Paralisa o inimigo por 2 turnos.", kind: "paralyze", element: "Ilusão", scaling: "genjutsu", chakraCost: 25, power: 0, paralyzeTurns: 2, scrollCost: -1, reqLevel: 12 },

  // Maito Guy (Gates)
  { id: "j_gate_1", name: "Primeiro Portão (Abertura)", description: "+10% de Dano, custa 10% da Vida atual.", kind: "buff", element: "Físico", scaling: "taijutsu", power: 0, buffTurns: 10, buffAmount: 0.1, healthCostPercent: 0.1, scrollCost: -1, reqLevel: 5 },
  { id: "j_gate_2", name: "Segundo Portão (Cura)", description: "+20% de Dano, custa 15% da Vida atual.", kind: "buff", element: "Físico", scaling: "taijutsu", power: 0, buffTurns: 10, buffAmount: 0.2, healthCostPercent: 0.15, scrollCost: -1, reqLevel: 10 },
  { id: "j_gate_3", name: "Terceiro Portão (Vida)", description: "+35% de Dano, custa 20% da Vida atual.", kind: "buff", element: "Físico", scaling: "taijutsu", power: 0, buffTurns: 10, buffAmount: 0.35, healthCostPercent: 0.2, scrollCost: -1, reqLevel: 15 },
  { id: "j_gate_4", name: "Quarto Portão (Dor)", description: "+50% de Dano, custa 25% da Vida atual.", kind: "buff", element: "Físico", scaling: "taijutsu", power: 0, buffTurns: 10, buffAmount: 0.5, healthCostPercent: 0.25, scrollCost: -1, reqLevel: 20 },
  { id: "j_gate_5", name: "Quinto Portão (Limite)", description: "+70% de Dano, custa 30% da Vida atual.", kind: "buff", element: "Físico", scaling: "taijutsu", power: 0, buffTurns: 10, buffAmount: 0.7, healthCostPercent: 0.3, scrollCost: -1, reqLevel: 25 },
  { id: "j_gate_6", name: "Sexto Portão (Visão)", description: "+95% de Dano, custa 40% da Vida atual.", kind: "buff", element: "Físico", scaling: "taijutsu", power: 0, buffTurns: 10, buffAmount: 0.95, healthCostPercent: 0.4, scrollCost: -1, reqLevel: 30 },
  { id: "j_gate_7", name: "Sétimo Portão (Assombro)", description: "+130% de Dano, custa 50% da Vida atual.", kind: "buff", element: "Físico", scaling: "taijutsu", power: 0, buffTurns: 10, buffAmount: 1.3, healthCostPercent: 0.5, scrollCost: -1, reqLevel: 35 },
  { id: "j_gate_8", name: "Oitavo Portão (Morte)", description: "+250% de Dano. Ao fim da técnica, vida reduzida a 1 e morte iminente.", kind: "buff", element: "Físico", scaling: "taijutsu", power: 0, buffTurns: 10, buffAmount: 2.5, deathAfterBuff: true, scrollCost: -1, reqLevel: 40 },


  { id: "j_chidori_nagashi", name: "Chidori Nagashi", description: "Corrente elétrica de alta potência emanando do corpo.", kind: "attack", element: "Raio", scaling: "ninjutsu", chakraCost: 80, power: 95, defense: 0, scrollCost: -1, reqLevel: 30 },
  // Fogo
  { id: "j_fogo_0", name: "Pequena Bala de Fogo", description: "Shō Gōkakyū", kind: "attack", element: "Fogo", scaling: "ninjutsu", chakraCost: 8, power: 14, defense: 0, scrollCost: 0, reqLevel: 1 },
  { id: "j_fogo_5", name: "Grande Bola de Fogo", description: "Gōkakyū no Jutsu", kind: "attack", element: "Fogo", scaling: "ninjutsu", chakraCost: 15, power: 28, defense: 0, scrollCost: 0, reqLevel: 5 },
  { id: "j_fogo_12", name: "Chamas da Fênix", description: "Hōsenka no Jutsu", kind: "attack", element: "Fogo", scaling: "ninjutsu", chakraCost: 20, power: 35, defense: 0, scrollCost: 0, reqLevel: 12 },
  { id: "j_fogo_18", name: "Técnica da Labareda", description: "Hōka no Jutsu", kind: "attack", element: "Fogo", scaling: "ninjutsu", chakraCost: 30, power: 48, defense: 0, scrollCost: 0, reqLevel: 18 },
  { id: "j_fogo_26", name: "Grande Explosão de Chamas", description: "Poder devastador de fogo", kind: "attack", element: "Fogo", scaling: "ninjutsu", chakraCost: 45, power: 60, defense: 0, scrollCost: 0, reqLevel: 26 },

  // Água
  { id: "j_agua_0", name: "Bala de Água", description: "Mizudeppō", kind: "attack", element: "Água", scaling: "ninjutsu", chakraCost: 8, power: 10, defense: 0, scrollCost: 0, reqLevel: 1 },
  { id: "j_agua_5", name: "Onda de Água", description: "Mizurappa", kind: "attack", element: "Água", scaling: "ninjutsu", chakraCost: 14, power: 20, defense: 0, scrollCost: 0, reqLevel: 5 },
  { id: "j_agua_10", name: "Chicote de Água", description: "Suiben", kind: "attack", element: "Água", scaling: "ninjutsu", chakraCost: 18, power: 28, defense: 5, scrollCost: 0, reqLevel: 10 },
  { id: "j_agua_18", name: "Prisão de Água", description: "Suirō no Jutsu", kind: "attack", element: "Água", scaling: "ninjutsu", chakraCost: 28, power: 15, defense: 35, scrollCost: 0, reqLevel: 18 },
  { id: "j_agua_26", name: "Parede de Água", description: "Suijinheki", kind: "buff", element: "Água", scaling: "ninjutsu", chakraCost: 40, power: 0, defense: 60, scrollCost: 0, reqLevel: 26 },

  // Vento
  { id: "j_vento_0", name: "Rajada de Vento", description: "Daitoppa", kind: "attack", element: "Vento", scaling: "ninjutsu", chakraCost: 8, power: 10, defense: 0, scrollCost: 0, reqLevel: 1 },
  { id: "j_vento_5", name: "Grande Avanço", description: "Toppa", kind: "attack", element: "Vento", scaling: "ninjutsu", chakraCost: 15, power: 24, defense: 0, scrollCost: 0, reqLevel: 5 },
  { id: "j_vento_10", name: "Lâmina de Vento", description: "Cortadores de vento", kind: "attack", element: "Vento", scaling: "ninjutsu", chakraCost: 20, power: 34, defense: 0, scrollCost: 0, reqLevel: 10 },
  { id: "j_vento_16", name: "Foice de Vento", description: "Lâmina de vento massiva", kind: "attack", element: "Vento", scaling: "ninjutsu", chakraCost: 26, power: 45, defense: 0, scrollCost: 0, reqLevel: 16 },
  { id: "j_vento_24", name: "Esfera de Ar Comprimido", description: "Dano massivo", kind: "attack", element: "Vento", scaling: "ninjutsu", chakraCost: 38, power: 58, defense: 0, scrollCost: 0, reqLevel: 24 },

  // Raio
  { id: "j_raio_0", name: "Bala Elétrica", description: "Dispara eletricidade", kind: "attack", element: "Raio", scaling: "ninjutsu", chakraCost: 8, power: 12, defense: 0, scrollCost: 0, reqLevel: 1 },
  { id: "j_raio_5", name: "Choque Elétrico", description: "Corrente forte", kind: "attack", element: "Raio", scaling: "ninjutsu", chakraCost: 14, power: 22, defense: 0, scrollCost: 0, reqLevel: 5 },
  { id: "j_raio_10", name: "Corrente Elétrica", description: "Eletrifica área", kind: "attack", element: "Raio", scaling: "ninjutsu", chakraCost: 20, power: 34, defense: 8, scrollCost: 0, reqLevel: 10 },
  { id: "j_raio_16", name: "Agulhas Elétricas", description: "Agulhas rápidas", kind: "attack", element: "Raio", scaling: "ninjutsu", chakraCost: 26, power: 46, defense: 0, scrollCost: 0, reqLevel: 16 },
  { id: "j_raio_24", name: "Armadura Elétrica Parcial", description: "Dano e defesa", kind: "attack", element: "Raio", scaling: "ninjutsu", chakraCost: 35, power: 18, defense: 45, scrollCost: 0, reqLevel: 24 },

  // Terra
  { id: "j_terra_0", name: "Bala de Lama", description: "Projétil de terra", kind: "attack", element: "Terra", scaling: "ninjutsu", chakraCost: 8, power: 10, defense: 0, scrollCost: 0, reqLevel: 1 },
  { id: "j_terra_5", name: "Elevação de Terra", description: "Surge terra", kind: "attack", element: "Terra", scaling: "ninjutsu", chakraCost: 14, power: 4, defense: 15, scrollCost: 0, reqLevel: 5 },
  { id: "j_terra_10", name: "Tremor de Terra", description: "Terremoto local", kind: "attack", element: "Terra", scaling: "ninjutsu", chakraCost: 18, power: 18, defense: 0, scrollCost: 0, reqLevel: 10 },
  { id: "j_terra_16", name: "Prisão de Terra", description: "Esmaga o inimigo", kind: "attack", element: "Terra", scaling: "ninjutsu", chakraCost: 24, power: 20, defense: 35, scrollCost: 0, reqLevel: 16 },
  { id: "j_terra_24", name: "Muralha de Terra", description: "Doryūheki", kind: "buff", element: "Terra", scaling: "ninjutsu", chakraCost: 35, power: 0, defense: 75, scrollCost: 0, reqLevel: 24 },

  // --- Iniciais por classe ---
  {
    id: "j_swiftfist", name: "Punho Veloz", description: "Uma sequência rápida de golpes corpo a corpo.",
    kind: "attack", element: "Físico", scaling: "taijutsu", power: 15, critBonus: 8,
    scrollCost: 0, reqLevel: 1, starter: "Taijutsu",
  },
  {
    id: "j_illusion", name: "Ilusão Sufocante", description: "Prende a mente do inimigo em uma ilusão dolorosa.",
    kind: "attack", element: "Ilusão", scaling: "genjutsu", chakraCost: 12, power: 50,
    scrollCost: 0, reqLevel: 1, starter: "Genjutsu",
  },
  {
    id: "j_healpalm", name: "Palma Curativa", description: "Concentra chakra na mão para curar seus ferimentos.",
    kind: "heal", element: "Cura", scaling: "ninjutsu", chakraCost: 14, power: 0, healPercent: 0.35,
    scrollCost: 0, reqLevel: 1, starter: "Médico",
  },
  // --- Aprendíveis em pergaminhos ---
  {
    id: "j_shadowclone", name: "Clones das Sombras", description: "Cria clones que aumentam seu dano por 1 turno",
    kind: "buff", element: "Neutro", scaling: "ninjutsu", chakraCost: 40, power: 0, buffTurns: 1, buffAmount: 0.3,
    scrollCost: 2500, reqLevel: 4,
  },
  {
    id: "j_hiddenlotus", name: "Lótus Principal", description: "Golpe devastador que ignora parte da defesa",
    kind: "attack", element: "Físico", scaling: "taijutsu", power: 45, critBonus: 12,
    scrollCost: 18000, reqLevel: 10,
  },
  {
    id: "j_illusionprison", name: "Prisão Ilusória", description: "Aprisiona o alvo numa ilusão sufocante",
    kind: "attack", element: "Ilusão", scaling: "genjutsu", chakraCost: 25, power: 50,
    scrollCost: 17000, reqLevel: 12,
  },
  {
    id: "j_waterdragon", name: "Dragão d'Água", description: "Invoca um dragão de água que esmaga o inimigo",
    kind: "attack", element: "Água", scaling: "ninjutsu", chakraCost: 30, power: 60,
    scrollCost: 19000, reqLevel: 13,
  },
  {
    id: "j_mysticheal", name: "Cura Mística Suprema", description: "Restaura grande parte da sua vida",
    kind: "heal", element: "Cura", scaling: "ninjutsu", chakraCost: 40, power: 0, healPercent: 0.6,
    scrollCost: 18000, reqLevel: 12,
  },
  {
    id: "j_spiralsphere", name: "Esfera Espiral", description: "Uma esfera giratória de chakra puro e concentrado",
    kind: "attack", element: "Vento", scaling: "ninjutsu", chakraCost: 65, power: 80, critBonus: 6,
    scrollCost: 95000, reqLevel: 20,
  },
  {
    id: "j_lightningblade", name: "Kirin", description: "Grande Dragão de raio em meio a tempestade",
    kind: "attack", element: "Raio", scaling: "speed", chakraCost: 34, power: 80, critBonus: 30,
    scrollCost: 15000, reqLevel: 20,
  },
  {
    id: "j_earthquake", name: "Fenda Sísmica", description: "Rasga a terra sob os pés do inimigo",
    kind: "attack", element: "Terra", scaling: "stamina", chakraCost: 40, power: 60,
    scrollCost: 20000, reqLevel: 16,
  }
];

export const getStarterJutsu = (ninjaClass: ClassType, nature: import("./types").Nature): string => {
  
    if (ninjaClass === "Taijutsu") return "j_swiftfist";
    if (ninjaClass === "Genjutsu") return "j_illusion";
    if (ninjaClass === "Médico") return "j_healpalm";
  if (ninjaClass === "Kenjutsu") return "j_sword_strike";
  
  if (nature === "Fogo") return "j_fireball";
  if (nature === "Água") return "j_waterbullet";
  if (nature === "Raio") return "j_lightningbolt";
  if (nature === "Terra") return "j_earthwall";
  return "j_windblade";
};

// ------------------------------------------------------------------
// ITENS & EQUIPAMENTOS
// ------------------------------------------------------------------
export const ITEMS: Item[] = [

  { id: "w_katana", name: "Katana", description: "Arma branca afiada (Poder 34, 20 usos)", price: 7500, kind: "weapon", weaponPower: 34, qtyPerPurchase: 20 },
  { id: "w_kunai", name: "Kunai", description: "Lâmina arremessável (Poder 14, 3 usos)", price: 300, kind: "weapon", weaponPower: 14, qtyPerPurchase: 3 },
  { id: "w_shuriken", name: "Shurikens", description: "Lâminas giratórias (Poder 9, 1 uso)", price: 50, kind: "weapon", weaponPower: 9, qtyPerPurchase: 1 },
  { id: "w_fuuma", name: "Fuuma Shuriken", description: "Shuriken de Vento Demoníaco (Poder 30, 1 uso)", price: 1200, kind: "weapon", weaponPower: 30, qtyPerPurchase: 1 },

  { id: "kit_medico", name: "Kit Médico", description: "Restaura 60 de Vida. Usável em batalha.", price: 300, kind: "consumable", healAmount: 60, usableInBattle: true },
  { id: "pilula_soldado", name: "Pílula do Soldado", description: "Restaura 50 de Chakra. Usável em batalha.", price: 350, kind: "consumable", chakraAmount: 50, usableInBattle: true },
  { id: "pilula_militar", name: "Pílula Militar", description: "Restaura Vida e Chakra completos. Usável em batalha.", price: 1400, kind: "consumable", fullRestore: true, usableInBattle: true },

  { id: "sandalias_ninja", name: "Sandálias Ninja", description: "+8 de Velocidade permanente.", price: 3500, kind: "gear", statBoost: { stat: "speed", value: 8 } },
  { id: "faixas_treino", name: "Faixas de Treino", description: "+8 de Resistência permanente.", price: 3000, kind: "gear", statBoost: { stat: "stamina", value: 8 } },
  { id: "espada_basica", name: "Espada Básica", description: "+8 de Kenjutsu permanente.", price: 3500, kind: "gear", statBoost: { stat: "kenjutsu", value: 8 } },
  { id: "luvas_peso", name: "Luvas de Peso", description: "+8 de Taijutsu permanente.", price: 4000, kind: "gear", statBoost: { stat: "taijutsu", value: 8 } },
  { id: "pergaminho_elemental", name: "Pergaminho Elemental", description: "+8 de Ninjutsu permanente.", price: 4000, kind: "gear", statBoost: { stat: "ninjutsu", value: 8 } },
  { id: "espelho_ilusorio", name: "Espelho Ilusório", description: "+8 de Genjutsu permanente.", price: 4000, kind: "gear", statBoost: { stat: "genjutsu", value: 8 } },
  { id: "colete_jonin", name: "Colete Jonin", description: "+50 de Vida Máxima permanente.", price: 6500, kind: "gear", healthBoost: 50 },
];

// ------------------------------------------------------------------
// MISSÕES (cada uma tem um inimigo para enfrentar em batalha)
// ------------------------------------------------------------------
export const MISSIONS: Mission[] = [

  {
    id: "m_tutorial", name: "Missão de Treinamento", rank: "Sem Rank", recommendedLevel: 1,
    description: "Um treinamento simples com um espantalho.",
    reward: 10, xpReward: 25,
    enemy: { name: "Espantalho de Treinamento", emoji: "🎋", maxHp: 20, attack: 2, defense: 0, speed: 1,
      moves: [{"name":"Balanço","power":3,"element":"Físico"}] },
  },
  {
    id: "m9", name: "Entregar Correspondência", rank: "D", recommendedLevel: 2,
    description: "Leve um pergaminho para a aldeia vizinha.",
    reward: 100, xpReward: 45,
    enemy: { name: "Lobo Selvagem", emoji: "🐺", maxHp: 40, attack: 10, defense: 2, speed: 12,
      moves: [{"name":"Mordida","power":12,"element":"Físico"}] },
  },
  {
    id: "m10", name: "Limpar Terreno", rank: "D", recommendedLevel: 3,
    description: "Ajude a limpar um terreno cheio de pedras e insetos.",
    reward: 200, xpReward: 50,
    enemy: { name: "Centopéia Gigante", emoji: "🐛", maxHp: 60, attack: 12, defense: 5, speed: 8,
      moves: [{"name":"Picada","power":14,"element":"Físico"}] },
  },
  {
    id: "m11", name: "Capturar Javali", rank: "D", recommendedLevel: 3,
    description: "Um javali está destruindo as plantações.",
    reward: 220, xpReward: 60,
    enemy: { name: "Javali Selvagem", emoji: "🐗", maxHp: 80, attack: 15, defense: 6, speed: 10,
      moves: [{"name":"Investida","power":16,"element":"Físico"}] },
  },
  {
    id: "m12", name: "Escolta Simples", rank: "D", recommendedLevel: 4,
    description: "Acompanhe um cidadão até a fronteira.",
    reward: 230, xpReward: 70,
    enemy: { name: "Bandido Novato", emoji: "🦹", maxHp: 90, attack: 14, defense: 4, speed: 11,
      moves: [{"name":"Facada","power":15,"element":"Físico"}] },
  },
  {
    id: "m13", name: "Recuperar Item Roubado", rank: "D", recommendedLevel: 4,
    description: "Um macaco roubou um colar valioso.",
    reward: 240, xpReward: 75,
    enemy: { name: "Macaco Ladrão", emoji: "🐒", maxHp: 75, attack: 12, defense: 3, speed: 16,
      moves: [{"name":"Arremesso de Pedra","power":12,"element":"Físico"}] },
  },
  {
    id: "m14", name: "Patrulha Noturna", rank: "D", recommendedLevel: 5,
    description: "Fique de vigia na aldeia durante a noite.",
    reward: 250, xpReward: 85,
    enemy: { name: "Ladrão Furtivo", emoji: "🦹", maxHp: 100, attack: 16, defense: 5, speed: 14,
      moves: [{"name":"Golpe Rápido","power":18,"element":"Físico"}] },
  },
  {
    id: "m15", name: "Proteger a Ponte", rank: "C", recommendedLevel: 5,
    description: "Impeça bandidos de destruir a ponte em construção.",
    reward: 400, xpReward: 120,
    enemy: { name: "Chefe dos Bandidos", emoji: "🧔", maxHp: 120, attack: 20, defense: 6, speed: 12,
      moves: [{"name":"Machadada","power":22,"element":"Físico"}] },
  },
  {
    id: "m16", name: "Caçar Fera Mágica", rank: "C", recommendedLevel: 6,
    description: "Uma fera está causando problemas na floresta.",
    reward: 450, xpReward: 135,
    enemy: { name: "Tigre Demoníaco", emoji: "🐅", maxHp: 140, attack: 25, defense: 8, speed: 18,
      moves: [{"name":"Garras de Fogo","power":26,"element":"Fogo"}] },
  },
  {
    id: "m17", name: "Entrega Secreta", rank: "C", recommendedLevel: 7,
    description: "Leve este pergaminho em segredo. Inimigos espreitam.",
    reward: 500, xpReward: 150,
    enemy: { name: "Ninja Mercenário", emoji: "🐱‍👤", maxHp: 160, attack: 26, defense: 7, speed: 20,
      moves: [{"name":"Shuriken Sombria","power":25,"element":"Físico"}] },
  },
  {
    id: "m18", name: "Investigar Caverna", rank: "C", recommendedLevel: 7,
    description: "Moradores ouviram barulhos em uma caverna próxima.",
    reward: 600, xpReward: 255,
    enemy: { name: "Morcego Gigante", emoji: "🦇", maxHp: 130, attack: 22, defense: 5, speed: 24,
      moves: [{"name":"Onda Sonora","power":24,"element":"Vento"}] },
  },
  {
    id: "m19", name: "Resgatar Refém", rank: "C", recommendedLevel: 8,
    description: "Um aldeão foi sequestrado por um grupo rival.",
    reward: 800, xpReward: 275,
    enemy: { name: "Sequestrador", emoji: "🦹", maxHp: 180, attack: 28, defense: 10, speed: 15,
      moves: [{"name":"Golpe Traiçoeiro","power":30,"element":"Físico"}] },
  },
  {
    id: "m20", name: "Destruir Acampamento", rank: "C", recommendedLevel: 9,
    description: "Elimine um pequeno grupo de saqueadores.",
    reward: 900, xpReward: 500,
    enemy: { name: "Líder Saqueador", emoji: "👺", maxHp: 220, attack: 32, defense: 12, speed: 16,
      moves: [{"name":"Esmagamento","power":35,"element":"Físico"}] },
  },
  {
    id: "m21", name: "Escolta VIP", rank: "B", recommendedLevel: 10,
    description: "Proteja um nobre durante sua viagem.",
    reward: 950, xpReward: 2950,
    enemy: { name: "Assassino Contratado", emoji: "🗡️", maxHp: 300, attack: 40, defense: 15, speed: 25,
      moves: [{"name":"Corte Letal","power":45,"element":"Físico"}] },
  },
  {
    id: "m22", name: "Interceptar Suprimentos", rank: "B", recommendedLevel: 11,
    description: "Roube suprimentos de uma aldeia rival.",
    reward: 1100, xpReward: 3650,
    enemy: { name: "Guarda de Elite", emoji: "🛡️", maxHp: 400, attack: 38, defense: 20, speed: 18,
      moves: [{"name":"Investida com Escudo","power":40,"element":"Físico"}] },
  },
  {
    id: "m23", name: "Rastrear Fugitivo", rank: "B", recommendedLevel: 12,
    description: "Encontre um criminoso procurado no Bingo Book.",
    reward: 1500, xpReward: 4750,
    enemy: { name: "Criminoso Rank B", emoji: "👤", maxHp: 450, attack: 45, defense: 18, speed: 24,
      moves: [{"name":"Liberação de Água","power":48,"element":"Água"}] },
  },
  {
    id: "m24", name: "Patrulha de Fronteira", rank: "B", recommendedLevel: 14,
    description: "Defenda a fronteira contra uma pequena invasão.",
    reward: 4000, xpReward: 5850,
    enemy: { name: "Ninja Invasor", emoji: "🐱‍👤", maxHp: 480, attack: 50, defense: 22, speed: 26,
      moves: [{"name":"Liberação de Vento","power":55,"element":"Vento"}] },
  },
  {
    id: "m25", name: "Roubar Pergaminho", rank: "B", recommendedLevel: 16,
    description: "Infiltre-se na base inimiga e pegue o pergaminho.",
    reward: 6000, xpReward: 6250,
    enemy: { name: "Especialista em Armadilhas", emoji: "🕸️", maxHp: 500, attack: 48, defense: 18, speed: 30,
      moves: [{"name":"Agulhas Venenosas","power":50,"element":"Físico"}] },
  },
  {
    id: "m26", name: "Batalha na Chuva", rank: "B", recommendedLevel: 18,
    description: "Enfrente um nukenin perigoso durante uma tempestade.",
    reward: 8000, xpReward: 7950,
    enemy: { name: "Nukenin das Águas", emoji: "🌧️", maxHp: 550, attack: 58, defense: 35, speed: 28,
      moves: [{"name":"Dragão Aquático","power":65,"element":"Água"}] },
  },
  {
    id: "m27", name: "Assassinar Comandante", rank: "A", recommendedLevel: 22,
    description: "Elimine um líder de uma facção rebelde.",
    reward: 9000, xpReward: 8500,
    enemy: { name: "Comandante Rebelde", emoji: "👹", maxHp: 1600, attack: 75, defense: 40, speed: 35,
      moves: [{"name":"Golpe Devastador","power":85,"element":"Físico"}] },
  },
  {
    id: "m28", name: "Deter Invocação", rank: "A", recommendedLevel: 24,
    description: "Um ninja está tentando invocar um monstro gigante.",
    reward: 15000, xpReward: 9250,
    enemy: { name: "Ninja Invocador", emoji: "📜", maxHp: 1650, attack: 70, defense: 48, speed: 40,
      moves: [{"name":"Sapo Esmagador","power":80,"element":"Terra"}] },
  },
  {
    id: "m29", name: "Proteger a Aldeia", rank: "A", recommendedLevel: 26,
    description: "Forças inimigas estão atacando os portões.",
    reward: 20000, xpReward: 12500,
    enemy: { name: "Vanguarda Inimiga", emoji: "⚔️", maxHp: 1800, attack: 85, defense: 45, speed: 30,
      moves: [{"name":"Tempestade de Fogo","power":95,"element":"Fogo"}] },
  },
  {
    id: "m30", name: "Recuperar Artefato", rank: "A", recommendedLevel: 28,
    description: "Entre em uma ruína perigosa e pegue o artefato.",
    reward: 30000, xpReward: 16800,
    enemy: { name: "Guardião Antigo", emoji: "🗿", maxHp: 2000, attack: 90, defense: 45, speed: 25,
      moves: [{"name":"Raio Laser","power":100,"element":"Raio"}] },
  },
  {
    id: "m31", name: "Deter Nukenin Rank S", rank: "A", recommendedLevel: 30,
    description: "Um criminoso perigoso foi avistado. Cuidado.",
    reward: 35000, xpReward: 17200,
    enemy: { name: "Nukenin Perigoso", emoji: "😈", maxHp: 2200, attack: 105, defense: 50, speed: 50,
      moves: [{"name":"Técnica Proibida","power":120,"element":"Ilusão"}] },
  },
  {
    id: "m32", name: "Destruir Laboratório", rank: "A", recommendedLevel: 32,
    description: "Um cientista louco está fazendo experimentos.",
    reward: 40000, xpReward: 18800,
    enemy: { name: "Cientista Sombrio", emoji: "🧪", maxHp: 2500, attack: 110, defense: 58, speed: 45,
      moves: [{"name":"Gás Tóxico","power":110,"element":"Físico"}] },
  },
  {
    id: "m33", name: "Combate de Kages", rank: "A", recommendedLevel: 35,
    description: "Lute contra um clone do seu próprio Kage.",
    reward: 50000, xpReward: 29500,
    enemy: { name: "Clone de Kage", emoji: "👑", maxHp: 3000, attack: 130, defense: 50, speed: 60,
      moves: [{"name":"Jutsu Secreto","power":140,"element":"Fogo"}] },
  },
  {
    id: "m34", name: "Deter Invasão de Bijuu", rank: "S", recommendedLevel: 42,
    description: "Outra Besta com Cauda está à solta.",
    reward: 150000, xpReward: 35000,
    enemy: { name: "Besta de Várias Caudas", emoji: "🦁", maxHp: 200000, attack: 1200, defense: 50, speed: 50,
      moves: [{"name":"Bomba Bijuu","power":8000,"element":"Neutro"}] },
  },
  {
    id: "m35", name: "Enfrentar o Líder da Akatsuki", rank: "S", recommendedLevel: 45,
    description: "O líder da organização criminosa revelou sua face.",
    reward: 250000, xpReward: 45000,
    enemy: { name: "Líder Sombrio", emoji: "👁️", maxHp: 350000, attack: 1800, defense: 60, speed: 65,
      moves: [{"name":"Repulsão Divina","power":12000,"element":"Físico"}] },
  },
  {
    id: "m36", name: "Guerra Ninja", rank: "S", recommendedLevel: 48,
    description: "Participe da grande batalha que decidirá o futuro.",
    reward: 400000, xpReward: 75000,
    enemy: { name: "Exército Inimigo", emoji: "🪖", maxHp: 500000, attack: 2500, defense: 80, speed: 55,
      moves: [{"name":"Chuva de Meteoros","power":18000,"element":"Terra"}] },
  },
  {
    id: "m37", name: "Deus Shinobi", rank: "S", recommendedLevel: 50,
    description: "Enfrente o fantasma do ninja mais forte que já existiu.",
    reward: 750000, xpReward: 90000,
    enemy: { name: "Fantasma do Passado", emoji: "👻", maxHp: 1000000, attack: 4000, defense: 100, speed: 80,
      moves: [{"name":"Mil Mãos de Madeira","power":30000,"element":"Terra"}] },
  },
  {
    id: "m38", name: "O Fim do Mundo", rank: "S", recommendedLevel: 60,
    description: "Uma ameaça de outro mundo chegou para absorver todo o chakra.",
    reward: 1500000, xpReward: 150000,
    enemy: { name: "Deusa do Chakra", emoji: "🌌", maxHp: 3000000, attack: 8000, defense: 150, speed: 120,
      moves: [{"name":"Agulhas de Osso","power":60000,"element":"Neutro"}] },
  },

];


export type MasterTeach = { type: "jutsu" | "perk"; id: string; name: string; reqLevel: number; };
export type Master = { id: string; name: string; description: string; teaches: MasterTeach[]; };

export const MASTERS: Master[] = [
  {
    id: "kakashi", name: "Kakashi Hatake", description: "O Ninja Copiador. Ensina técnicas avançadas de Raiton e Katon.",
    teaches: [
      { type: "jutsu", id: "j_chidori", name: "Chidori (Raiton, Ataque 45)", reqLevel: 16 },
      { type: "perk", id: "nature_raiton", name: "Natureza de Raiton", reqLevel: 16 },
      { type: "perk", id: "nature_fogo", name: "Natureza de Katon", reqLevel: 22 },
      { type: "jutsu", id: "j_chidori_nagashi", name: "Chidori Nagashi (Raiton, Ataque 95)", reqLevel: 30 }
    ]
  },
  {
    id: "hiruzen", name: "Hiruzen Sarutobi", description: "O Terceiro Hokage, o Professor. Conhecido por dominar todas as cinco naturezas básicas de chakra.",
    teaches: [
      { type: "perk", id: "nature_fogo", name: "Natureza de Katon", reqLevel: 16 },
      { type: "perk", id: "nature_agua", name: "Natureza de Suiton", reqLevel: 19 },
      { type: "perk", id: "nature_raiton", name: "Natureza de Raiton", reqLevel: 24 },
      { type: "perk", id: "nature_terra", name: "Natureza de Doton", reqLevel: 32 },
      { type: "perk", id: "nature_vento", name: "Natureza de Fuuton", reqLevel: 38 }
    ]
  },
  {
    id: "jiraya", name: "Jiraiya", description: "Um dos Sannin Lendários. Ensina controle de chakra e o lendário Modo Sábio.",
    teaches: [
      { type: "jutsu", id: "j_rasengan", name: "Rasengan (Neutro, Ataque 50)", reqLevel: 16 },
      { type: "jutsu", id: "j_sage_jiraya", name: "Modo Sábio", reqLevel: 25 }
    ]
  },
  {
    id: "guy", name: "Maito Guy", description: "A Besta Verde de Konoha. Ensina os Oito Portões Internos para Taijutsu extremo.",
    teaches: [
      { type: "jutsu", id: "j_gate_1", name: "Primeiro Portão (Abertura)", reqLevel: 5 },
      { type: "jutsu", id: "j_gate_2", name: "Segundo Portão (Cura)", reqLevel: 10 },
      { type: "jutsu", id: "j_gate_3", name: "Terceiro Portão (Vida)", reqLevel: 15 },
      { type: "jutsu", id: "j_gate_4", name: "Quarto Portão (Dor)", reqLevel: 20 },
      { type: "jutsu", id: "j_gate_5", name: "Quinto Portão (Limite)", reqLevel: 25 },
      { type: "jutsu", id: "j_gate_6", name: "Sexto Portão (Visão)", reqLevel: 30 },
      { type: "jutsu", id: "j_gate_7", name: "Sétimo Portão (Assombro)", reqLevel: 35 },
      { type: "jutsu", id: "j_gate_8", name: "Oitavo Portão (Morte)", reqLevel: 40 },
    ]
  },
  {
    id: "asuma", name: "Asuma Sarutobi", description: "Especialista em combate a curta distância e mestre no uso do Katon com lâminas de chakra.",
    teaches: [
      { type: "perk", id: "nature_fogo", name: "Natureza de Katon", reqLevel: 16 },
      { type: "perk", id: "ninjutsu_kenjutsu", name: "Ninjutsu no Kenjutsu", reqLevel: 24 },
    ]
  },
  {
    id: "kurenai", name: "Kurenai Yūhi", description: "Mestra de Genjutsu. Ensina ilusões poderosas e técnicas de defesa mental.",
    teaches: [
      { type: "jutsu", id: "j_petals", name: "Genjutsu das Pétalas", reqLevel: 12 },
      { type: "perk", id: "contra_genjutsu", name: "Contra Genjutsu", reqLevel: 28 }
    ]
  }
];

export const CHUNIN_EXAM_ENEMIES: Enemy[] = [
  {
    name: "Akira Uchiha",
    emoji: "🔥",
    avatarId: "m1",
    maxHp: 240,
    attack: 25,
    defense: 12,
    speed: 30,
    moves: [
      { name: "Corte com Kunai", power: 12, element: "Físico" },
      { name: "Grande Bola de Fogo", power: 25, element: "Fogo" },
      { name: "Chute Giratório", power: 15, element: "Físico" },
      { name: "Sharingan", power: 0, element: "Físico", buffAmount: 0.15, buffTurns: 15 }
    ]
  },
  {
    name: "Daichi Senju",
    emoji: "🌳",
    avatarId: "m2",
    maxHp: 275,
    attack: 20,
    defense: 18,
    speed: 25,
    moves: [
      { name: "Soco Pesado", power: 16, element: "Físico" },
      { name: "Bala de Lama", power: 22, element: "Terra" },
      { name: "Investida", power: 14, element: "Físico" }
    ]
  },
  {
    name: "Ren Hatake",
    emoji: "⚡",
    avatarId: "m3",
    maxHp: 225,
    attack: 28,
    defense: 10,
    speed: 35,
    moves: [
      { name: "Corrente Elétrica", power: 29, element: "Raio" },
      { name: "Shuriken Precisa", power: 13, element: "Físico" },
      { name: "Rasteira", power: 11, element: "Físico" }
    ]
  },
  {
    name: "Hana Hyūga",
    emoji: "👁️",
    avatarId: "w1",
    maxHp: 230,
    attack: 22,
    defense: 15,
    speed: 28,
    moves: [
      { name: "Punho Gentil", power: 19, element: "Físico" },
      { name: "Palma Dupla", power: 21, element: "Físico" },
      { name: "Chute Frontal", power: 12, element: "Físico" },
      { name: "Byakugan", power: 0, element: "Físico", buffAmount: 0.15, buffTurns: 10 }
    ]
  },
  {
    name: "Kaito Inuzuka",
    emoji: "🐺",
    avatarId: "m4",
    maxHp: 235,
    attack: 24,
    defense: 14,
    speed: 32,
    moves: [
      { name: "Garra Selvagem", power: 16, element: "Físico" },
      { name: "Mordida Feroz", power: 20, element: "Físico" },
      { name: "Ataque em Dupla", power: 18, element: "Físico" }
    ]
  },
  {
    name: "Mika Nara",
    emoji: "🦌",
    avatarId: "w2",
    maxHp: 218,
    attack: 18,
    defense: 12,
    speed: 26,
    moves: [
      { name: "Sombra Principal", power: 0, element: "Ilusão", paralyzeTurns: 2 },
      { name: "Arremesso de Kunai", power: 14, element: "Físico" },
      { name: "Golpe Surpresa", power: 18, element: "Físico" }
    ]
  },
  {
    name: "Yumi Yamanaka",
    emoji: "🌸",
    avatarId: "w3",
    maxHp: 215,
    attack: 16,
    defense: 10,
    speed: 24,
    moves: [
      { name: "Chute Ágil", power: 12, element: "Físico" },
      { name: "Golpe Mental", power: 0, element: "Ilusão", paralyzeTurns: 2 },
      { name: "Kunai Dupla", power: 15, element: "Físico" }
    ]
  },
  {
    name: "Takeshi Uzumaki",
    emoji: "🌪️",
    avatarId: "m5",
    maxHp: 228,
    attack: 26,
    defense: 15,
    speed: 29,
    moves: [
      { name: "Soco", power: 19, element: "Físico" },
      { name: "Chute", power: 20, element: "Físico" },
      { name: "Soco Impulsionado", power: 24, element: "Físico" }
    ]
  },
  {
    name: "Saiki Aburame",
    emoji: "🪲",
    avatarId: "m6",
    maxHp: 232,
    attack: 22,
    defense: 16,
    speed: 27,
    moves: [
      { name: "Enxame de Insetos", power: 28, element: "Físico" },
      { name: "Picada Venenosa", power: 16, element: "Físico" },
      { name: "Kunai Envenenada", power: 15, element: "Físico" }
    ]
  },
  {
    name: "Aoi Lee",
    emoji: "🥋",
    avatarId: "w4",
    maxHp: 340,
    attack: 30,
    defense: 12,
    speed: 38,
    moves: [
      { name: "Lótus Principal", power: 20, element: "Físico" },
      { name: "Lótus Oculta", power: 22, element: "Físico" },
      { name: "Joelhada", power: 19, element: "Físico" },
      { name: "Primeiro Portão", power: 0, element: "Físico", buffAmount: 0.1, buffTurns: 10 }
    ]
  }
];

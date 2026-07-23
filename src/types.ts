export type Rank = "Estudante" | "Genin" | "Chunin" | "Jonin" | "ANBU" | "Kage";
export type Village = "Folha" | "Areia" | "Névoa" | "Nuvem" | "Pedra";
export type ClassType = "Ninjutsu" | "Taijutsu" | "Genjutsu" | "Médico" | "Kenjutsu";

export type Stats = {
  ninjutsu: number;
  taijutsu: number;
  genjutsu: number;
  kenjutsu: number;
  speed: number;
  stamina: number;
};

export type MissionRank = "Sem Rank" | "D" | "C" | "B" | "A" | "S";

export type Element =
  | "Fogo"
  | "Água"
  | "Raio"
  | "Terra"
  | "Vento"
  | "Físico"
  | "Ilusão"
  | "Cura"
  | "Neutro";

export type JutsuKind = "attack" | "heal" | "buff" | "paralyze";

export type Jutsu = {
  id: string;
  name: string;
  description: string;
  kind: JutsuKind;
  element: Element;
  scaling: keyof Stats;
  chakraCost?: number;
  power: number;
  defense?: number;
  critBonus?: number;
  buffTurns?: number;
  buffAmount?: number; // fração de dano extra, ex 0.5 = +50%
  healPercent?: number; // fração da vida máxima
  healthCostPercent?: number; // custo de vida (fração, ex: 0.1 para 10%)
  paralyzeTurns?: number; // turnos de paralisia do inimigo
  deathAfterBuff?: boolean; // oitavo portão
  scrollCost: number; // ryo para aprender
  reqLevel: number;
  starter?: ClassType; // jutsu inicial de uma classe
};

export type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
  kind: "consumable" | "gear" | "weapon";
  weaponPower?: number;
  qtyPerPurchase?: number;
  // consumíveis
  healAmount?: number;
  chakraAmount?: number;
  fullRestore?: boolean;
  usableInBattle?: boolean;
  // equipamento (compra única, permanente)
  statBoost?: { stat: keyof Stats; value: number };
  healthBoost?: number;
};

export type EnemyMove = {
  name: string;
  power: number;
  element: Element;
  heal?: number;
};

export type Enemy = {
  name: string;
  emoji: string;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  moves: EnemyMove[];
};

export type Mission = {
  id: string;
  name: string;
  rank: MissionRank;
  description: string;
  reward: number;
  xpReward: number;
  recommendedLevel: number;
  enemy: Enemy;
};

export type Nature = "Fogo" | "Água" | "Raio" | "Terra" | "Vento";
export type Clan = "Uchiha" | "Senju" | "Hyūga" | "Uzumaki" | "Lee" | "Hatake";

export type Ninja = {
  name: string;
  village: Village;
  ninjaClass: ClassType;
  clan: Clan;
  nature: Nature;
  avatarId: string;
  rank: Rank;
  level: number;
  xp: number;
  xpToNextLevel: number;
  ryo: number;
  health: number;
  maxHealth: number;
  chakra: number;
  maxChakra: number;
  vigor: number; // recurso alternativo ao Chakra, usado pelo clã Lee (que não usa chakra)
  maxVigor: number;
  stats: Stats;
  skillPoints: number;
  missionsCompleted: Record<MissionRank, number>;
  knownJutsus: string[];
  inventory: Record<string, number>; // consumível id -> quantidade
  ownedGear: string[]; // ids de equipamentos comprados
  perks: string[]; // passivas (ex: nature_fogo, ninjutsu_kenjutsu)
  master?: string | null; // id do mestre
  day: number;
};

export type BattleOutcome = {
  result: "win" | "lose" | "flee";
  health: number;
  chakra: number;
  vigor: number;
  usedItems: Record<string, number>;
};

export type LogEntry = { id: number; message: string; type: "success" | "danger" | "info" };

export type Screen = "START" | "DASHBOARD" | "MISSIONS" | "TRAINING" | "SHOP" | "EXAM" | "MASTERS";

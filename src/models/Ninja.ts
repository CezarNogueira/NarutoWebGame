import { Ninja as NinjaData, Village, ClassType, Nature, Clan, Stats, MissionRank, Jutsu, Item, Element } from "../types";
import { JUTSUS, CLASSES, getStarterJutsu } from "../data";

export class Ninja {
  public data: NinjaData;

  constructor(data: NinjaData) {
    this.data = data;
    this.data.perks = this.data.perks || [];
    this.data.ownedGear = this.data.ownedGear || [];
    this.data.knownJutsus = this.data.knownJutsus || [];
    this.data.day = this.data.day || 1;
    if (this.data.maxVigor === undefined) this.data.maxVigor = 50;
    if (this.data.vigor === undefined) this.data.vigor = this.data.maxVigor;
  }

  static create(name: string, village: Village, ninjaClass: ClassType, nature: Nature, clan: Clan, avatarId: string): Ninja {
    const startingStats: Stats = { ninjutsu: 10, taijutsu: 10, genjutsu: 10, kenjutsu: 10, speed: 10, stamina: 10 };
    const selectedClass = CLASSES.find((c) => c.name === ninjaClass);
    if (selectedClass) startingStats[selectedClass.statFocus] += 10;

    const data: NinjaData = {
      name,
      village,
      ninjaClass,
      nature,
      clan,
      avatarId,
      rank: "Estudante",
      level: 1,
      xp: 0,
      xpToNextLevel: 50,
      ryo: 500,
      maxHealth: 100,
      health: 100,
      maxChakra: 50,
      chakra: 50,
      maxVigor: 50,
      vigor: 50,
      stats: startingStats,
      skillPoints: 0,
      missionsCompleted: { "Sem Rank": 0, D: 0, C: 0, B: 0, A: 0, S: 0 },
      knownJutsus: [],
      inventory: { i_ramen_cup: 3, i_kunai: 5 },
      ownedGear: [],
      perks: [],
      master: null,
      day: 1
    };

    const starter = getStarterJutsu(ninjaClass, nature);
    if (starter && clan !== "Lee") data.knownJutsus.push(starter);

    return new Ninja(data);
  }


  getMaxHealth(): number {
    let mult = 1.0;
    if (this.data.clan === "Senju") {
      mult += 0.1;
      if (this.data.level >= 20) mult += 0.3;
    }
    if (this.data.clan === "Uzumaki") {
      if (this.data.level >= 20) mult += 0.3;
      if (this.data.level >= 40) mult += 0.5;
    }
    if (this.data.clan === "Hatake") {
      if (this.data.level >= 40) mult += 0.2;
    }
    return Math.floor(this.data.maxHealth * mult);
  }

  getMaxChakra(): number {
    if (this.data.clan === "Lee") return 0;
    
    let mult = 1.0;
    if (this.data.clan === "Uzumaki") {
      mult += 0.2;
      if (this.data.level >= 40) mult += 0.3;
    }
    if (this.data.clan === "Senju" && this.data.level >= 10) {
      mult += 0.2;
    }
    if (this.data.clan === "Hatake") {
      if (this.data.level >= 40) mult += 0.2;
    }
    return Math.floor(this.data.maxChakra * mult);
  }

getMaxVigor(): number {
    let mult = 1.0;
    if (this.data.clan === "Lee") mult += 0.2; // compensa a ausência de Chakra
    return Math.floor(this.data.maxVigor * mult);
  }

  getTaijutsuStat(): number {
    let val = this.data.stats.taijutsu;
    if (this.data.clan === "Lee") {
      val = Math.floor(val * 1.15); // Inicial: +15% Taijutsu
    }
    return val;
  }

  getKenjutsuStat(): number {
    let mult = 1.0;
    if (this.data.clan === "Hatake") {
      mult += 0.2;
      if (this.data.level >= 10) mult += 0.2;
    }
    return Math.floor(this.data.stats.kenjutsu * mult);
  }

  getSpeedStat(): number {
    let mult = 1.0;
    if (this.data.clan === "Hatake") {
      mult += 0.1;
      if (this.data.level >= 20) mult += 0.2;
    }
    return Math.floor(this.data.stats.speed * mult);
  }

  getNinjutsuStat(): number {
    let mult = 1.0;
    if (this.data.clan === "Hatake") {
      if (this.data.level >= 30) mult += 0.2;
      if (this.data.level >= 40) mult += 0.3;
    }
    return Math.floor(this.data.stats.ninjutsu * mult);
  }

  hasElementAffinity(element: string): boolean {
    if (this.data.clan === "Lee") return false;
    if (this.data.clan === "Senju" && this.data.level >= 40) return true;
    if (element === this.data.nature) return true;
    if (element === "Fogo" && this.data.perks.includes("nature_fogo")) return true;
    if (element === "Água" && this.data.perks.includes("nature_agua")) return true;
    if (element === "Terra" && this.data.perks.includes("nature_terra")) return true;
    if (element === "Vento" && this.data.perks.includes("nature_vento")) return true;
    if (element === "Raio" && this.data.perks.includes("nature_raiton")) return true;
    return false;
  }

  autoLearnNatureJutsus(): string[] {
    let clanSkills = this.checkClanSkills();
    let newLearned: string[] = [];
    JUTSUS.forEach(j => {
      if (this.hasElementAffinity(j.element) && this.data.level >= j.reqLevel && j.scrollCost === 0 && !this.data.knownJutsus.includes(j.id)) {
        this.data.knownJutsus.push(j.id);
        newLearned.push(j.name);
      }
    });
    return [...newLearned, ...clanSkills];
  }

  checkClanSkills(): string[] {
    let newLearned: string[] = [];
    const learn = (id: string, name: string) => {
      if (!this.data.knownJutsus.includes(id)) {
        this.data.knownJutsus.push(id);
        newLearned.push(name);
      }
    };
    if (this.data.clan === "Uchiha") {
      if (this.data.level >= 10) learn("j_uchiha_sharingan", "Sharingan");
      if (this.data.level >= 25) learn("j_uchiha_genjutsu", "Genjutsu Ocular");
      if (this.data.level >= 40) learn("j_uchiha_mangekyou", "Mangekyō Sharingan");
      if (this.data.level >= 45) learn("j_uchiha_amaterasu", "Amaterasu");
      if (this.data.level >= 50) learn("j_uchiha_susanoo", "Susanoo");
    }
    if (this.data.clan === "Hyūga") {
      if (this.data.level >= 10) learn("j_hyuga_byakugan", "Byakugan");
      if (this.data.level >= 10) learn("j_hyuga_punho", "Punho Gentil");
      if (this.data.level >= 20) learn("j_hyuga_8trigramas", "Oito Trigramas");
      if (this.data.level >= 30) learn("j_hyuga_rotacao", "Rotação Celestial");
      if (this.data.level >= 40) learn("j_hyuga_64palmas", "64 Palmas do Trigrama Celestial");
      if (this.data.level >= 45) learn("j_hyuga_byakugan_absoluto", "Byakugan Absoluto");
    }
    if (this.data.clan === "Uzumaki") {
      if (this.data.level >= 10) learn("j_uzumaki_correntes", "Correntes de Chakra");
      if (this.data.level >= 30) learn("j_uzumaki_selamento", "Selamento Uzumaki");
      if (this.data.level >= 40) learn("j_uzumaki_rasenshuriken", "Rasenshuriken");
      if (this.data.level >= 45) learn("j_uzumaki_kyuubi", "Manto do Kyuubi");
    }
    if (this.data.clan === "Lee") {
      if (this.data.level >= 3) learn("j_lee_senpuu", "Konoha Senpuu");
      if (this.data.level >= 7) learn("j_lee_reppuu", "Konoha Reppuu");
      if (this.data.level >= 10) learn("j_lee_lotus1", "Lótus Primária");
      if (this.data.level >= 12) learn("j_lee_bandagens", "Bandagens de Chakra");
      if (this.data.level >= 20) learn("j_lee_lotus2", "Lótus Oculta");
    }
    if (this.data.clan === "Senju") {
      if (this.data.level >= 15) learn("j_senju_regeneracao", "Regeneração Celular");
      if (this.data.level >= 25) learn("j_senju_hokage", "Golpe do Primeiro Hokage");
      if (this.data.level >= 40) learn("j_senju_sabio", "Modo Sábio da Madeira");
    }
    if (this.data.clan === "Hatake") {
      if (this.data.level >= 35) learn("j_hatake_raikiri", "Raikiri");
      if (this.data.level >= 45) learn("j_hatake_sharingan", "Sharingan Copiado");
      if (this.data.level >= 50) learn("j_hatake_kamui", "Kamui");
    }
    return newLearned;
  }

  addXp(amount: number): { leveledUp: boolean; fromLevel: number; toLevel: number; skillPointsGained: number; healthGained: number; secondaryGained: number } {
    this.data.xp += amount;
    const fromLevel = this.data.level;
    let skillPointsGained = 0;
    let healthGained = 0;
    let secondaryGained = 0;
    while (this.data.xp >= this.data.xpToNextLevel) {
      this.data.xp -= this.data.xpToNextLevel;
      this.data.level++;
      this.data.xpToNextLevel = Math.floor(this.data.xpToNextLevel * 1.5);
      this.data.skillPoints += 3;
      skillPointsGained += 3;
      this.data.maxHealth += 20;
      healthGained += 20;
      this.data.health = this.data.maxHealth;
      this.data.maxChakra += 10;
      this.data.chakra = this.getMaxChakra();
      this.data.maxVigor += 10;
      this.data.vigor = this.getMaxVigor();
      secondaryGained += 10;
      this.data.health = this.getMaxHealth();
    }
    return { leveledUp: this.data.level > fromLevel, fromLevel, toLevel: this.data.level, skillPointsGained, healthGained, secondaryGained };
  }

  restore(healthAmount?: number, chakraAmount?: number, fullRestore?: boolean) {
    if (fullRestore) {
      this.data.health = this.getMaxHealth();
      this.data.chakra = this.getMaxChakra();
      this.data.vigor = this.getMaxVigor();
    } else {
      if (healthAmount) this.data.health = Math.min(this.getMaxHealth(), this.data.health + healthAmount);
      if (chakraAmount) {
        this.data.chakra = Math.min(this.getMaxChakra(), this.data.chakra + chakraAmount);
        this.data.vigor = Math.min(this.getMaxVigor(), this.data.vigor + chakraAmount);
      }
    }
  }

  nextRankInfo() {
    let nextRank = "";
    let reqLevel = 0;
    let reqMissions = 0;
    let rankReq: MissionRank = "D";
    switch (this.data.rank) {
      case "Estudante": nextRank = "Genin"; reqLevel = 5; rankReq = "D"; reqMissions = 4; break;
      case "Genin": nextRank = "Chunin"; reqLevel = 15; rankReq = "C"; reqMissions = 6; break;
      case "Chunin": nextRank = "Jonin"; reqLevel = 30; rankReq = "B"; reqMissions = 10; break;
      case "Jonin": nextRank = "ANBU"; reqLevel = 50; rankReq = "A"; reqMissions = 15; break;
      case "ANBU": nextRank = "Kage"; reqLevel = 80; rankReq = "S"; reqMissions = 20; break;
      default: return null;
    }
    return { nextRank, reqLevel, rankReq, reqMissions };
  }

  canTakeExam(): boolean {
    const info = this.nextRankInfo();
    if (!info) return false;
    return this.data.level >= info.reqLevel && this.data.missionsCompleted[info.rankReq] >= info.reqMissions;
  }

  promote() {
    const info = this.nextRankInfo();
    if (info) this.data.rank = info.nextRank as any;
  }

  toJSON() {
    return this.data;
  }

  clone(): Ninja {
    return new Ninja(JSON.parse(JSON.stringify(this.data)));
  }
}

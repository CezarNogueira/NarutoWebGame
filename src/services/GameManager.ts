import { Ninja as NinjaModel } from "../models/Ninja";
import { LogEntry } from "../types";

const SAVE_KEY = "caminho-ninja-save-v2";

export class GameManager {
  static loadSave(): { ninja: NinjaModel | null; log: LogEntry[] } {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p && p.ninja) {
          return { ninja: new NinjaModel(p.ninja), log: (p.log as LogEntry[]) ?? [] };
        }
      }
    } catch {
      /* ignore */
    }
    return { ninja: null, log: [] };
  }

  static save(ninja: NinjaModel | null, log: LogEntry[]) {
    if (ninja) {
      localStorage.setItem(SAVE_KEY, JSON.stringify({ ninja: ninja.toJSON(), log }));
    }
  }

  static clearSave() {
    localStorage.removeItem(SAVE_KEY);
  }
}

const fs = require("fs");
let content = fs.readFileSync("src/App.tsx", "utf-8");

const oldLoadSave = `function loadSave(): { ninja: Ninja | null; log: LogEntry[] } {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      if (p && p.ninja) return { ninja: p.ninja as Ninja, log: (p.log as LogEntry[]) ?? [] };
    }
  } catch {
    /* ignore */
  }
  return { ninja: null, log: [] };
}`;

const newLoadSave = `function loadSave(): { ninja: Ninja | null; log: LogEntry[] } {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      if (p && p.ninja) {
        const n = p.ninja as Ninja;
        n.perks = n.perks || [];
        n.ownedGear = n.ownedGear || [];
        n.knownJutsus = n.knownJutsus || [];
        return { ninja: n, log: (p.log as LogEntry[]) ?? [] };
      }
    }
  } catch {
    /* ignore */
  }
  return { ninja: null, log: [] };
}`;

content = content.replace(oldLoadSave, newLoadSave);
fs.writeFileSync("src/App.tsx", content);

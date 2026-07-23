const fs = require("fs");
let content = fs.readFileSync("src/App.tsx", "utf-8");

const oldBuyItem = `  const buyItem = (item: Item) => {
    if (!ninja) return;
    if (ninja.ryo < item.price) return addLog("Ryo insuficiente.", "danger");
    const updated = { ...ninja, stats: { ...ninja.stats }, inventory: { ...ninja.inventory }, ownedGear: [...ninja.ownedGear] };
    updated.ryo -= item.price;
    if (item.kind === "consumable") {
      updated.inventory[item.id] = (updated.inventory[item.id] ?? 0) + 1;
      addLog(\`Você comprou \${item.name}.\`, "success");
    } else {
      if (updated.ownedGear.includes(item.id)) return;
      updated.ownedGear.push(item.id);
      if (item.statBoost) updated.stats[item.statBoost.stat] += item.statBoost.value;
      if (item.healthBoost) {
        updated.maxHealth += item.healthBoost;
        updated.health += item.healthBoost;
      }
      addLog(\`Você equipou \${item.name}!\`, "success");
    }
    setNinja(updated);
  };`;

const newBuyItem = `  const buyItem = (item: Item) => {
    if (!ninja) return;
    if (ninja.ryo < item.price) return addLog("Ryo insuficiente.", "danger");
    const updated = { ...ninja, stats: { ...ninja.stats }, inventory: { ...ninja.inventory }, ownedGear: [...ninja.ownedGear] };
    updated.ryo -= item.price;
    if (item.kind === "consumable" || item.kind === "weapon") {
      const qty = item.qtyPerPurchase ?? 1;
      updated.inventory[item.id] = (updated.inventory[item.id] ?? 0) + qty;
      addLog(\`Você comprou \${qty > 1 ? qty + "x " : ""}\${item.name}.\`, "success");
    } else {
      if (updated.ownedGear.includes(item.id)) return;
      updated.ownedGear.push(item.id);
      if (item.statBoost) updated.stats[item.statBoost.stat] += item.statBoost.value;
      if (item.healthBoost) {
        updated.maxHealth += item.healthBoost;
        updated.health += item.healthBoost;
      }
      addLog(\`Você equipou \${item.name}!\`, "success");
    }
    setNinja(updated);
  };`;

content = content.replace(oldBuyItem, newBuyItem);
fs.writeFileSync("src/App.tsx", content);

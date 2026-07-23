import { useState } from "react";
import { motion } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { useGameContext } from "../../contexts/GameContext";
import { ITEMS, JUTSUS } from "../../data";

export function ShopScreen() {
  const { ninja, buyItem, learnJutsu } = useGameContext();
  const [shopTab, setShopTab] = useState<"itens" | "pergaminhos">("itens");
  
  if (!ninja) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2"><ShoppingBag className="w-6 h-6" /> Loja Ninja</h2>
        <div className="flex bg-neutral-900 rounded-lg p-1">
          <button onClick={() => setShopTab("itens")} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-colors ${shopTab === "itens" ? "bg-neutral-700 text-white" : "text-neutral-500"}`}>Itens & Equipamentos</button>
          <button onClick={() => setShopTab("pergaminhos")} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-colors ${shopTab === "pergaminhos" ? "bg-neutral-700 text-white" : "text-neutral-500"}`}>Pergaminhos (Jutsus)</button>
        </div>
      </div>

      {shopTab === "itens" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ITEMS.map((item) => {
            const owned = item.kind === "gear" && ninja.data.ownedGear.includes(item.id);
            return (
              <div key={item.id} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex justify-between items-center gap-3">
                <div>
                  <div className="font-bold text-sm">{item.name} {item.qtyPerPurchase && item.qtyPerPurchase > 1 ? `(x${item.qtyPerPurchase})` : ""}</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">{item.description}</div>
                </div>
                <button
                  disabled={owned || ninja.data.ryo < item.price}
                  onClick={() => buyItem(item)}
                  className="bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-white font-bold py-1.5 px-3 rounded-lg transition-colors text-xs flex-shrink-0"
                >
                  {owned ? "Adquirido" : `${item.price} Ryo`}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {shopTab === "pergaminhos" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {JUTSUS.filter((j) => j.scrollCost > 0 && (ninja.hasElementAffinity(j.element) || ["Físico", "Ilusão", "Cura", "Neutro"].includes(j.element))).map((j) => {
            const known = ninja.data.knownJutsus.includes(j.id);
            const locked = ninja.data.level < j.reqLevel;
            return (
              <div key={j.id} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex justify-between items-center gap-3">
                <div>
                  <div className="font-bold text-sm">{j.name}</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">{j.description}</div>
                  <div className="text-[10px] text-neutral-500 mt-1">{j.element} · {j.kind === "attack" ? `Poder ${j.power}` : j.kind === "heal" ? "Cura" : "Buff"} · Nível {j.reqLevel}</div>
                </div>
                <button
                  disabled={known || locked || ninja.data.ryo < j.scrollCost}
                  onClick={() => learnJutsu(j)}
                  className="bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-white font-bold py-1.5 px-3 rounded-lg transition-colors text-xs flex-shrink-0"
                >
                  {known ? "Aprendido" : locked ? `Nv ${j.reqLevel}` : `${j.scrollCost} Ryo`}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

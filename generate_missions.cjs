const fs = require("fs");
let missions = [];
let id = 9;
const addMission = (name, rank, recLvl, desc, reward, xp, eName, eEmoji, hp, att, def, spd, moves) => {
  missions.push(`  {
    id: "m${id++}", name: "${name}", rank: "${rank}", recommendedLevel: ${recLvl},
    description: "${desc}",
    reward: ${reward}, xpReward: ${xp},
    enemy: { name: "${eName}", emoji: "${eEmoji}", maxHp: ${hp}, attack: ${att}, defense: ${def}, speed: ${spd},
      moves: ${JSON.stringify(moves)} },
  },`);
}

// D Rank (Level 1-4)
addMission("Entregar Correspondência", "D", 2, "Leve um pergaminho para a aldeia vizinha.", 600, 45, "Lobo Selvagem", "🐺", 40, 10, 2, 12, [{name: "Mordida", power: 12, element: "Físico"}]);
addMission("Limpar Terreno", "D", 3, "Ajude a limpar um terreno cheio de pedras e insetos.", 700, 50, "Centopéia Gigante", "🐛", 60, 12, 5, 8, [{name: "Picada", power: 14, element: "Físico"}]);
addMission("Capturar Javali", "D", 3, "Um javali está destruindo as plantações.", 800, 60, "Javali Selvagem", "🐗", 80, 15, 6, 10, [{name: "Investida", power: 16, element: "Físico"}]);
addMission("Escolta Simples", "D", 4, "Acompanhe um cidadão até a fronteira.", 900, 70, "Bandido Novato", "🦹", 90, 14, 4, 11, [{name: "Facada", power: 15, element: "Físico"}]);
addMission("Recuperar Item Roubado", "D", 4, "Um macaco roubou um colar valioso.", 950, 75, "Macaco Ladrão", "🐒", 75, 12, 3, 16, [{name: "Arremesso de Pedra", power: 12, element: "Físico"}]);
addMission("Patrulha Noturna", "D", 5, "Fique de vigia na aldeia durante a noite.", 1000, 85, "Ladrão Furtivo", "🥷", 100, 16, 5, 14, [{name: "Golpe Rápido", power: 18, element: "Físico"}]);

// C Rank (Level 5-9)
addMission("Proteger a Ponte", "C", 5, "Impeça bandidos de destruir a ponte em construção.", 1800, 120, "Chefe dos Bandidos", "🧔", 120, 20, 6, 12, [{name: "Machadada", power: 22, element: "Físico"}]);
addMission("Caçar Fera Mágica", "C", 6, "Uma fera está causando problemas na floresta.", 2000, 135, "Tigre Demoníaco", "🐅", 140, 25, 8, 18, [{name: "Garras de Fogo", power: 26, element: "Fogo"}]);
addMission("Entrega Secreta", "C", 7, "Leve este pergaminho em segredo. Inimigos espreitam.", 2400, 150, "Ninja Mercenário", "🥷", 160, 26, 7, 20, [{name: "Shuriken Sombria", power: 25, element: "Físico"}]);
addMission("Investigar Caverna", "C", 7, "Moradores ouviram barulhos em uma caverna próxima.", 2500, 155, "Morcego Gigante", "🦇", 130, 22, 5, 24, [{name: "Onda Sonora", power: 24, element: "Vento"}]);
addMission("Resgatar Refém", "C", 8, "Um aldeão foi sequestrado por um grupo rival.", 2800, 175, "Sequestrador", "🦹", 180, 28, 10, 15, [{name: "Golpe Traiçoeiro", power: 30, element: "Físico"}]);
addMission("Destruir Acampamento", "C", 9, "Elimine um pequeno grupo de saqueadores.", 3200, 200, "Líder Saqueador", "👺", 220, 32, 12, 16, [{name: "Esmagamento", power: 35, element: "Físico"}]);

// B Rank (Level 10-19)
addMission("Escolta VIP", "B", 11, "Proteja um nobre durante sua viagem.", 6000, 350, "Assassino Contratado", "🗡️", 260, 40, 15, 25, [{name: "Corte Letal", power: 45, element: "Físico"}]);
addMission("Interceptar Suprimentos", "B", 12, "Roube suprimentos de uma aldeia rival.", 7000, 380, "Guarda de Elite", "🛡️", 300, 38, 20, 18, [{name: "Investida com Escudo", power: 40, element: "Físico"}]);
addMission("Rastrear Fugitivo", "B", 13, "Encontre um criminoso procurado no Bingo Book.", 8500, 450, "Criminoso Rank B", "👤", 320, 45, 18, 24, [{name: "Liberação de Água", power: 48, element: "Água"}]);
addMission("Patrulha de Fronteira", "B", 15, "Defenda a fronteira contra uma pequena invasão.", 10000, 500, "Ninja Invasor", "🥷", 380, 50, 22, 26, [{name: "Liberação de Vento", power: 55, element: "Vento"}]);
addMission("Roubar Pergaminho", "B", 16, "Infiltre-se na base inimiga e pegue o pergaminho.", 12000, 600, "Especialista em Armadilhas", "🕸️", 350, 48, 18, 30, [{name: "Agulhas Venenosas", power: 50, element: "Físico"}]);
addMission("Batalha na Chuva", "B", 18, "Enfrente um nukenin perigoso durante uma tempestade.", 15000, 750, "Nukenin das Águas", "🌧️", 450, 58, 25, 28, [{name: "Dragão Aquático", power: 65, element: "Água"}]);

// A Rank (Level 20-35)
addMission("Assassinar Comandante", "A", 22, "Elimine um líder de uma facção rebelde.", 22000, 1100, "Comandante Rebelde", "👹", 600, 75, 30, 35, [{name: "Golpe Devastador", power: 85, element: "Físico"}]);
addMission("Deter Invocação", "A", 24, "Um ninja está tentando invocar um monstro gigante.", 25000, 1250, "Ninja Invocador", "📜", 650, 70, 28, 40, [{name: "Sapo Esmagador", power: 80, element: "Terra"}]);
addMission("Proteger a Aldeia", "A", 26, "Forças inimigas estão atacando os portões.", 30000, 1500, "Vanguarda Inimiga", "⚔️", 800, 85, 35, 30, [{name: "Tempestade de Fogo", power: 95, element: "Fogo"}]);
addMission("Recuperar Artefato", "A", 28, "Entre em uma ruína perigosa e pegue o artefato.", 35000, 1800, "Guardião Antigo", "🗿", 1000, 90, 45, 25, [{name: "Raio Laser", power: 100, element: "Raio"}]);
addMission("Deter Nukenin Rank S", "A", 30, "Um criminoso perigoso foi avistado. Cuidado.", 45000, 2200, "Nukenin Perigoso", "😈", 1200, 105, 40, 50, [{name: "Técnica Proibida", power: 120, element: "Ilusão"}]);
addMission("Destruir Laboratório", "A", 32, "Um cientista louco está fazendo experimentos.", 55000, 2800, "Cientista Sombrio", "🧪", 1500, 110, 38, 45, [{name: "Gás Tóxico", power: 110, element: "Físico"}]);
addMission("Combate de Kages", "A", 35, "Lute contra um clone do seu próprio Kage.", 70000, 3500, "Clone de Kage", "👑", 2000, 130, 50, 60, [{name: "Jutsu Secreto", power: 140, element: "Fogo"}]);

// S Rank (Level 36+)
addMission("Deter Invasão de Bijuu", "S", 42, "Outra Besta com Cauda está à solta.", 150000, 12000, "Besta de Várias Caudas", "🦁", 200000, 1200, 50, 50, [{name: "Bomba Bijuu", power: 8000, element: "Neutro"}]);
addMission("Enfrentar o Líder da Akatsuki", "S", 45, "O líder da organização criminosa revelou sua face.", 250000, 20000, "Líder Sombrio", "👁️", 350000, 1800, 60, 65, [{name: "Repulsão Divina", power: 12000, element: "Físico"}]);
addMission("Guerra Ninja", "S", 48, "Participe da grande batalha que decidirá o futuro.", 400000, 35000, "Exército Inimigo", "🪖", 500000, 2500, 80, 55, [{name: "Chuva de Meteoros", power: 18000, element: "Terra"}]);
addMission("Deus Shinobi", "S", 50, "Enfrente o fantasma do ninja mais forte que já existiu.", 750000, 60000, "Fantasma do Passado", "👻", 1000000, 4000, 100, 80, [{name: "Mil Mãos de Madeira", power: 30000, element: "Terra"}]);
addMission("O Fim do Mundo", "S", 60, "Uma ameaça de outro mundo chegou para absorver todo o chakra.", 1500000, 150000, "Deusa do Chakra", "🌌", 3000000, 8000, 150, 120, [{name: "Agulhas de Osso", power: 60000, element: "Neutro"}]);

console.log(missions.join("\n"));

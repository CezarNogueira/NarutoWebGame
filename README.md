# 🍥 Caminho Ninja RPG

Um RPG de simulação ninja feito em React + TypeScript + Vite. Crie seu shinobi,
domine jutsus, evolua de Estudante até Kage.

## ✨ O que tem de novo nesta versão

- **⚔️ Batalhas por turnos** — missões agora são combates reais. Use ataque
  básico, jutsus, itens ou tente fugir. Dano com variação, críticos (baseados em
  Velocidade), defesa e IA inimiga que ataca, cura e usa golpes especiais.
- **🌀 Sistema de Jutsus** — cada classe começa com um jutsu próprio e você
  aprende novos comprando **pergaminhos** na loja (Bola de Fogo, Esfera Espiral,
  Lâmina Relâmpago, Clones das Sombras, Modo Sábio e mais). Jutsus de ataque,
  cura e buff, cada um consumindo chakra.
- **🛒 Loja Ninja** — itens consumíveis (Kit Médico, Pílula do Soldado, Pílula
  Militar) usáveis em batalha, e **equipamentos permanentes** que aumentam
  atributos ou vida máxima.
- **📊 Pontos de Habilidade** — a cada nível você ganha pontos para distribuir
  manualmente entre os atributos.
- **🧑‍🎤 Seleção de Avatar** — 12 avatares ninja (gerados em SVG, nítidos em
  qualquer tamanho) exibidos na criação de personagem, na barra de topo e na
  batalha.
- **💾 Save automático** — o progresso é salvo no navegador (localStorage). Feche
  e volte quando quiser. Botão de "Novo Jogo" na barra de topo.
- **🎯 Exame de Promoção** — agora mostra claramente os requisitos que faltam.

> ⚠️ Nota: os avatares originais em PNG chegaram corrompidos (bytes binários
> viraram texto em algum export/zip). Foram substituídos por avatares em SVG.
> Para usar imagens próprias, edite `src/avatars.tsx`.

## 🎮 Como jogar

1. Escolha nome, avatar, aldeia e especialidade.
2. Aceite missões no Quadro de Missões e vença as batalhas.
3. Gaste Ryo em Treino, na Loja (itens/gear/pergaminhos) e no Ichiraku.
4. Suba de nível, distribua pontos e faça o Exame para subir de rank.

## 🚀 Rodar localmente

Pré-requisitos: Node.js

```bash
npm install
npm run dev
```

Abra http://localhost:3000

Outros comandos: `npm run build`, `npm run preview`, `npm run lint`.

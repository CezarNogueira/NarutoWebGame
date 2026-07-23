import React from "react";

type HairStyle = "spiky" | "short" | "bun" | "ponytail" | "long" | "mohawk";

type AvatarPreset = { id: string; clan: string; skin: string; hair: string; style: HairStyle; band: string; eye: string; cloth: string; gender: "M" | "F"; };

const SKIN = { light: "#f2c9a0", med: "#d69f7e", tan: "#c2895f", deep: "#8d5a3c", pale: "#f7d9bf" };
const HAIR = { blonde: "#f4d35e", black: "#2b2b33", brown: "#6b4423", red: "#c1443c", pink: "#ec9ec5", white: "#e9ebf0", silver: "#c9ccd3", blue: "#3f6fb5" };
const BAND = { blue: "#2f6fb0", red: "#b03a3a", black: "#3a3a44", green: "#3f8f5a", orange: "#c9772f" };

export const AVATARS: AvatarPreset[] = [
  // Uchiha (Pele Clara, Cabelo Preto, Olho Preto)
  { id: "uc1", clan: "Uchiha", skin: SKIN.light, hair: HAIR.black, style: "spiky", band: BAND.blue, eye: "#1a1a1a", cloth: "#2f3b52", gender: "M" },
  { id: "uc2", clan: "Uchiha", skin: SKIN.light, hair: HAIR.black, style: "short", band: BAND.black, eye: "#1a1a1a", cloth: "#1a1a1a", gender: "M" },
  { id: "uc3", clan: "Uchiha", skin: SKIN.light, hair: HAIR.black, style: "mohawk", band: BAND.red, eye: "#1a1a1a", cloth: "#b03a3a", gender: "M" },
  { id: "uc4", clan: "Uchiha", skin: SKIN.light, hair: HAIR.black, style: "long", band: BAND.blue, eye: "#1a1a1a", cloth: "#4b3f6b", gender: "F" },
  { id: "uc5", clan: "Uchiha", skin: SKIN.light, hair: HAIR.black, style: "ponytail", band: BAND.red, eye: "#1a1a1a", cloth: "#7a2f2f", gender: "F" },
  { id: "uc6", clan: "Uchiha", skin: SKIN.light, hair: HAIR.black, style: "bun", band: BAND.black, eye: "#1a1a1a", cloth: "#3d6b52", gender: "F" },

  // Uzumaki (Pele Clara, Cabelo Loiro, Olho Azul)
  { id: "uz1", clan: "Uzumaki", skin: SKIN.light, hair: HAIR.blonde, style: "spiky", band: BAND.blue, eye: "#3fa9f5", cloth: "#e06a2c", gender: "M" },
  { id: "uz2", clan: "Uzumaki", skin: SKIN.light, hair: HAIR.blonde, style: "short", band: BAND.orange, eye: "#3fa9f5", cloth: "#2f3b52", gender: "M" },
  { id: "uz3", clan: "Uzumaki", skin: SKIN.light, hair: HAIR.blonde, style: "mohawk", band: BAND.black, eye: "#3fa9f5", cloth: "#4b5563", gender: "M" },
  { id: "uz4", clan: "Uzumaki", skin: SKIN.light, hair: HAIR.blonde, style: "long", band: BAND.blue, eye: "#3fa9f5", cloth: "#7a2f2f", gender: "F" },
  { id: "uz5", clan: "Uzumaki", skin: SKIN.light, hair: HAIR.blonde, style: "ponytail", band: BAND.orange, eye: "#3fa9f5", cloth: "#b03a3a", gender: "F" },
  { id: "uz6", clan: "Uzumaki", skin: SKIN.light, hair: HAIR.blonde, style: "bun", band: BAND.red, eye: "#3fa9f5", cloth: "#33507a", gender: "F" },

  // Senju (Pele Clara, Cabelo Preto, Olho Preto)
  { id: "se1", clan: "Senju", skin: SKIN.light, hair: HAIR.black, style: "long", band: BAND.red, eye: "#1a1a1a", cloth: "#b03a3a", gender: "M" },
  { id: "se2", clan: "Senju", skin: SKIN.light, hair: HAIR.black, style: "short", band: BAND.blue, eye: "#1a1a1a", cloth: "#2f5f6b", gender: "M" },
  { id: "se3", clan: "Senju", skin: SKIN.light, hair: HAIR.black, style: "spiky", band: BAND.green, eye: "#1a1a1a", cloth: "#2f6b3f", gender: "M" },
  { id: "se4", clan: "Senju", skin: SKIN.light, hair: HAIR.black, style: "bun", band: BAND.red, eye: "#1a1a1a", cloth: "#7a2f2f", gender: "F" },
  { id: "se5", clan: "Senju", skin: SKIN.light, hair: HAIR.black, style: "ponytail", band: BAND.blue, eye: "#1a1a1a", cloth: "#33507a", gender: "F" },
  { id: "se6", clan: "Senju", skin: SKIN.light, hair: HAIR.black, style: "long", band: BAND.green, eye: "#1a1a1a", cloth: "#3d6b52", gender: "F" },

  // Hyūga (Pele Clara, Cabelo Preto ou Branco, Olho Preto) -> vou colocar os olhos brancos por padrão no Hyuga, mas a instrução diz "olho preto" entao vou seguir a instrução
  { id: "hy1", clan: "Hyūga", skin: SKIN.light, hair: HAIR.black, style: "long", band: BAND.black, eye: "#1a1a1a", cloth: "#4b5563", gender: "M" },
  { id: "hy2", clan: "Hyūga", skin: SKIN.light, hair: HAIR.white, style: "short", band: BAND.blue, eye: "#1a1a1a", cloth: "#4b3f6b", gender: "M" },
  { id: "hy3", clan: "Hyūga", skin: SKIN.light, hair: HAIR.black, style: "spiky", band: BAND.red, eye: "#1a1a1a", cloth: "#2f3b52", gender: "M" },
  { id: "hy4", clan: "Hyūga", skin: SKIN.light, hair: HAIR.white, style: "long", band: BAND.black, eye: "#1a1a1a", cloth: "#e9ebf0", gender: "F" },
  { id: "hy5", clan: "Hyūga", skin: SKIN.light, hair: HAIR.black, style: "ponytail", band: BAND.blue, eye: "#1a1a1a", cloth: "#4b3f6b", gender: "F" },
  { id: "hy6", clan: "Hyūga", skin: SKIN.light, hair: HAIR.white, style: "bun", band: BAND.red, eye: "#1a1a1a", cloth: "#7a2f2f", gender: "F" },

  // Lee (Qualquer)
  { id: "rl1", clan: "Lee", skin: SKIN.tan, hair: HAIR.black, style: "short", band: BAND.red, eye: "#1a1a1a", cloth: "#3f8f5a", gender: "M" },
  { id: "rl2", clan: "Lee", skin: SKIN.med, hair: HAIR.brown, style: "spiky", band: BAND.blue, eye: "#4a3220", cloth: "#2f3b52", gender: "M" },
  { id: "rl3", clan: "Lee", skin: SKIN.deep, hair: HAIR.silver, style: "mohawk", band: BAND.orange, eye: "#c9772f", cloth: "#e06a2c", gender: "M" },
  { id: "rl4", clan: "Lee", skin: SKIN.light, hair: HAIR.pink, style: "bun", band: BAND.green, eye: "#2fae74", cloth: "#c73f5a", gender: "F" },
  { id: "rl5", clan: "Lee", skin: SKIN.pale, hair: HAIR.blue, style: "ponytail", band: BAND.blue, eye: "#3f6fb5", cloth: "#33507a", gender: "F" },
  { id: "rl6", clan: "Lee", skin: SKIN.tan, hair: HAIR.red, style: "long", band: BAND.black, eye: "#c1443c", cloth: "#7a2f2f", gender: "F" },

  // Nenhum (Qualquer)
  { id: "nn1", clan: "Hatake", skin: SKIN.med, hair: HAIR.brown, style: "short", band: BAND.black, eye: "#4a3220", cloth: "#4b5563", gender: "M" },
  { id: "nn2", clan: "Hatake", skin: SKIN.deep, hair: HAIR.black, style: "spiky", band: BAND.blue, eye: "#5a3d28", cloth: "#2f5f6b", gender: "M" },
  { id: "nn3", clan: "Hatake", skin: SKIN.light, hair: HAIR.blonde, style: "mohawk", band: BAND.orange, eye: "#3fa9f5", cloth: "#e06a2c", gender: "M" },
  { id: "nn4", clan: "Hatake", skin: SKIN.pale, hair: HAIR.pink, style: "long", band: BAND.green, eye: "#2fae74", cloth: "#c73f5a", gender: "F" },
  { id: "nn5", clan: "Hatake", skin: SKIN.med, hair: HAIR.silver, style: "ponytail", band: BAND.red, eye: "#8a8f99", cloth: "#b03a3a", gender: "F" },
  { id: "nn6", clan: "Hatake", skin: SKIN.tan, hair: HAIR.blue, style: "bun", band: BAND.black, eye: "#3f6fb5", cloth: "#33507a", gender: "F" },
];

export function getAvatar(id: string): AvatarPreset {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0];
}

function Hair({ style, color }: { style: HairStyle; color: string }) {
  const dark = "rgba(0,0,0,0.18)";
  switch (style) {
    case "spiky":
      return (
        <g>
          <path d="M24 40 Q22 15 34 20 Q40 6 50 16 Q60 6 66 20 Q78 15 76 40 Q64 26 50 28 Q36 26 24 40 Z" fill={color} />
          <path d="M31 24 L36 8 L42 22 Z M46 20 L52 6 L57 22 Z M58 22 L64 10 L68 26 Z" fill={color} />
          <path d="M24 40 Q36 26 50 28 Q64 26 76 40 Q64 30 50 32 Q36 30 24 40 Z" fill={dark} />
        </g>
      );
    case "short":
      return (
        <g>
          <path d="M23 42 Q22 16 50 16 Q78 16 77 42 Q66 30 50 30 Q34 30 23 42 Z" fill={color} />
          <path d="M23 42 Q34 32 50 32 Q66 32 77 42 Q66 34 50 34 Q34 34 23 42 Z" fill={dark} />
        </g>
      );
    case "bun":
      return (
        <g>
          <circle cx="50" cy="12" r="9" fill={color} />
          <circle cx="50" cy="12" r="9" fill={dark} opacity="0.4" transform="translate(1.5 1.5) scale(0.8)" style={{ transformOrigin: "50px 12px" }} />
          <path d="M23 42 Q22 18 50 18 Q78 18 77 42 Q66 30 50 30 Q34 30 23 42 Z" fill={color} />
        </g>
      );
    case "ponytail":
      return (
        <g>
          <path d="M70 26 Q86 40 80 74 Q74 60 70 44 Z" fill={color} />
          <path d="M23 42 Q22 16 50 16 Q78 16 77 42 Q66 30 50 30 Q34 30 23 42 Z" fill={color} />
          <path d="M70 30 Q82 44 79 68 Q75 54 70 42 Z" fill={dark} />
        </g>
      );
    case "long":
      return (
        <g>
          <path d="M20 40 Q18 82 30 90 L34 44 Z M80 40 Q82 82 70 90 L66 44 Z" fill={color} />
          <path d="M22 42 Q20 14 50 14 Q80 14 78 42 Q66 30 50 30 Q34 30 22 42 Z" fill={color} />
          <path d="M20 40 Q19 70 26 84 L30 46 Z" fill={dark} />
        </g>
      );
    case "mohawk":
      return (
        <g>
          <path d="M26 42 Q26 30 34 28 L34 42 Z M74 42 Q74 30 66 28 L66 42 Z" fill={color} />
          <path d="M42 30 L46 6 L50 28 L54 6 L58 30 Q50 24 42 30 Z" fill={color} />
          <path d="M42 30 Q50 26 58 30 Q50 28 42 30 Z" fill={dark} />
        </g>
      );
  }
}

export function NinjaAvatar({ id, size = 64, className = "" }: { id: string; size?: number; className?: string }) {
  const a = getAvatar(id);
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} role="img" aria-label="Avatar ninja">
      <defs>
        <clipPath id={`clip-${a.id}`}>
          <rect x="0" y="0" width="100" height="100" rx="16" />
        </clipPath>
        <radialGradient id={`bg-${a.id}`} cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#2b2b33" />
          <stop offset="100%" stopColor="#16161b" />
        </radialGradient>
      </defs>

      <g clipPath={`url(#clip-${a.id})`}>
        <rect x="0" y="0" width="100" height="100" fill={`url(#bg-${a.id})`} />

        {/* ombros / gola */}
        <path d="M18 100 Q22 78 40 74 L44 82 Q50 86 56 82 L60 74 Q78 78 82 100 Z" fill={a.cloth} />
        <path d="M44 82 Q50 87 56 82 L52 92 Q50 94 48 92 Z" fill="rgba(0,0,0,0.25)" />

        {/* pescoço */}
        <rect x="43" y="66" width="14" height="14" rx="4" fill={a.skin} />
        <rect x="43" y="66" width="14" height="5" rx="4" fill="rgba(0,0,0,0.12)" />

        {/* cabeça */}
        <ellipse cx="50" cy="49" rx="22" ry="25" fill={a.skin} />
        {/* orelhas */}
        <ellipse cx="28" cy="52" rx="3.5" ry="5" fill={a.skin} />
        <ellipse cx="72" cy="52" rx="3.5" ry="5" fill={a.skin} />

        {/* cabelo */}
        <Hair style={a.style} color={a.hair} />

        {/* bandana */}
        <rect x="26" y="31" width="48" height="9" rx="2" fill={a.band} />
        <rect x="26" y="31" width="48" height="3" rx="2" fill="rgba(255,255,255,0.18)" />
        {/* placa metálica */}
        <rect x="39" y="30.5" width="22" height="10" rx="2.5" fill="#9ca3af" />
        <rect x="39" y="30.5" width="22" height="3.5" rx="2.5" fill="#d5dbe3" opacity="0.7" />
        {/* espiral genérica */}
        <path d="M50 32.6 c-1.8 0 -3.1 1.3 -3.1 2.9 c0 1.3 1 2.3 2.3 2.3 c0.9 0 1.6 -0.7 1.6 -1.5"
          fill="none" stroke="#4b5563" strokeWidth="0.9" strokeLinecap="round" />

        {/* sobrancelhas */}
        <path d="M39 46 q4 -2 8 0" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M53 46 q4 -2 8 0" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1.4" strokeLinecap="round" />

        {/* olhos */}
        <ellipse cx="43" cy="52" rx="4" ry="4.3" fill="#fff" />
        <ellipse cx="57" cy="52" rx="4" ry="4.3" fill="#fff" />
        <circle cx="43.4" cy="52.4" r="2.3" fill={a.eye} />
        <circle cx="57.4" cy="52.4" r="2.3" fill={a.eye} />
        <circle cx="43.4" cy="52.4" r="1" fill="#1a1a1f" />
        <circle cx="57.4" cy="52.4" r="1" fill="#1a1a1f" />
        <circle cx="42.5" cy="51.2" r="0.7" fill="#fff" />
        <circle cx="56.5" cy="51.2" r="0.7" fill="#fff" />

        {/* nariz + boca */}
        <path d="M50 55 l-1.5 4 h3 Z" fill="rgba(0,0,0,0.10)" />
        <path d="M45 63 q5 3 10 0" fill="none" stroke="rgba(0,0,0,0.30)" strokeWidth="1.3" strokeLinecap="round" />
      </g>
      <rect x="0.5" y="0.5" width="99" height="99" rx="16" fill="none" stroke="rgba(255,255,255,0.08)" />
    </svg>
  );
}

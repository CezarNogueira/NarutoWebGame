const fs = require("fs");
let content = fs.readFileSync("src/avatars.tsx", "utf-8");

const newTypes = `
import React from "react";
import { Clan } from "./types";

type HairStyle = "spiky" | "short" | "bun" | "ponytail" | "long" | "mohawk";
type AvatarPreset = {
  id: string;
  clan: Clan;
  skin: string;
  hair: string;
  style: HairStyle;
  band: string;
  eye: string;
  cloth: string;
  gender: "M" | "F";
};
`;

content = content.replace(
  'import React from "react";\ntype HairStyle = "spiky" | "short" | "bun" | "ponytail" | "long" | "mohawk";\ntype AvatarPreset = {\n  id: string;\n  skin: string;\n  hair: string;\n  style: HairStyle;\n  band: string; // cor do tecido da bandana\n  eye: string;\n  cloth: string;\n};',
  newTypes.trim()
);

fs.writeFileSync("src/avatars.tsx", content);

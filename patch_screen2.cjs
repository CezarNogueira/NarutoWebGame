const fs = require("fs");
let content = fs.readFileSync("src/components/screens/CharacterCreationScreen.tsx", "utf-8");

content = content.replace(
  'import { useState } from "react";',
  'import { useState, useEffect, useMemo } from "react";'
);

content = content.replace(
  '  const [avatarId, setAvatarId] = useState(AVATARS[0].id);',
  `  const [avatarId, setAvatarId] = useState(AVATARS[0].id);

  const filteredAvatars = useMemo(() => {
    return clan ? AVATARS.filter((a) => a.clan === clan) : AVATARS.filter((a) => a.clan === "Nenhum");
  }, [clan]);

  useEffect(() => {
    if (filteredAvatars.length > 0 && !filteredAvatars.find(a => a.id === avatarId)) {
      setAvatarId(filteredAvatars[0].id);
    }
  }, [filteredAvatars, avatarId]);`
);

content = content.replace(
  '{AVATARS.map((a) => (',
  '{filteredAvatars.map((a) => ('
);

fs.writeFileSync("src/components/screens/CharacterCreationScreen.tsx", content);

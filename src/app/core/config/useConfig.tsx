import { useState } from "react";

import t from "@/app/core/i18n";

import { DEFAULT_MIXER, DEFAULT_TRACKS } from "@/app/core/config/constants";

import { IConfig } from "@/app/core/config/types";

export default function useConfig(loadProjectOrPreset?: IConfig) {
  const [tracks, setTracks] = useState(DEFAULT_TRACKS);

  const DEFAULT_CONFIG: IConfig = {
    arranger: { tracks, setTracks },
    mixer: { ...DEFAULT_MIXER },
    name: t("untitled"),
  };

  return loadProjectOrPreset || DEFAULT_CONFIG;
}

import {
  DEFAULT_MIXER,
  DEFAULT_POSITION,
  DEFAULT_QUANTIZATION,
  DEFAULT_TRACKS,
} from "@/app/core/config/constants";

import type { IProjectSettings } from "@/app/core/config/types";

const DeathcorePreset: IProjectSettings = {
  bpm: 0,
  clef: "C",
  measureCount: 8,
  mixer: DEFAULT_MIXER,
  name: "Metal – Deathcore",
  position: DEFAULT_POSITION,
  quantization: DEFAULT_QUANTIZATION,
  tracks: DEFAULT_TRACKS,
};

export { DeathcorePreset };

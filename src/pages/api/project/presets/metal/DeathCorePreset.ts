import {
  DEFAULT_MEASURE_COUNT,
  DEFAULT_MIXER,
  DEFAULT_POSITION,
  DEFAULT_QUANTIZATION,
} from "@/app/core/config/constants";

import type { IProjectSettings } from "@/app/core/config/types";

const DeathcorePreset: IProjectSettings = {
  bpm: 0,
  clef: "C",
  measureCount: DEFAULT_MEASURE_COUNT,
  mixer: DEFAULT_MIXER,
  name: "Metal – Deathcore",
  position: DEFAULT_POSITION,
  quantization: DEFAULT_QUANTIZATION,
  tracks: [],
};

export { DeathcorePreset };

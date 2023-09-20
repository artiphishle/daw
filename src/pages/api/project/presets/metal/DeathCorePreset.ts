import {
  DEFAULT_MEASURE_COUNT,
  DEFAULT_POSITION,
  DEFAULT_QUANTIZATION,
} from "@/app/core/config/constants";

import type { IProjectSettings } from "@/app/core/config/types";

const DeathcorePreset: IProjectSettings = {
  bpm: 0,
  clef: "C",
  measureCount: DEFAULT_MEASURE_COUNT,
  name: "Metal – Deathcore",
  position: DEFAULT_POSITION,
  quantization: DEFAULT_QUANTIZATION,
  tracks: [],
};

export { DeathcorePreset };

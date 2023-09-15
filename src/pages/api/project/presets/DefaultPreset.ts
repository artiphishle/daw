import {
  DEFAULT_BPM,
  DEFAULT_CLEF,
  DEFAULT_MEASURE_COUNT,
  DEFAULT_MIXER,
  DEFAULT_NAME,
  DEFAULT_POSITION,
  DEFAULT_QUANTIZATION,
  DEFAULT_TRACKS,
} from "@/app/core/config/constants";

import type { IProjectSettings } from "@/app/core/config/types";

const DefaultPreset: IProjectSettings = {
  bpm: DEFAULT_BPM,
  clef: DEFAULT_CLEF,
  measureCount: DEFAULT_MEASURE_COUNT,
  mixer: DEFAULT_MIXER,
  name: DEFAULT_NAME,
  position: DEFAULT_POSITION,
  quantization: DEFAULT_QUANTIZATION,
  tracks: DEFAULT_TRACKS,
};

export { DefaultPreset };

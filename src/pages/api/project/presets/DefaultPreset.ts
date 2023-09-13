import {
  DEFAULT_MIXER,
  DEFAULT_NAME,
  DEFAULT_POSITION,
  DEFAULT_QUANTIZATION,
  DEFAULT_TRACKS,
} from "../../../../app/core/config/constants";

import type { IProjectSettings } from "@/app/core/config/types";

const DefaultPreset: IProjectSettings = {
  bpm: 120,
  clef: "C",
  measureCount: 8,
  mixer: DEFAULT_MIXER,
  name: DEFAULT_NAME,
  position: DEFAULT_POSITION,
  quantization: DEFAULT_QUANTIZATION,
  tracks: DEFAULT_TRACKS,
};

export { DefaultPreset };

import {
  DEFAULT_TRACK_AUDIO,
  DEFAULT_MEASURE_COUNT,
  DEFAULT_POSITION,
  DEFAULT_QUANTIZATION,
  DEFAULT_STATES,
  DEFAULT_CLEF,
  DEFAULT_BPM,
} from "@/app/core/config/constants";

import type { IProjectContext } from "@/app/types/project.types";

const tracks = [DEFAULT_TRACK_AUDIO];
const DeathcorePreset: IProjectContext = {
  activeTrackId: tracks[0].id,
  bpm: DEFAULT_BPM,
  clef: DEFAULT_CLEF,
  measureCount: DEFAULT_MEASURE_COUNT,
  name: "Deathcore",
  position: DEFAULT_POSITION,
  quantization: DEFAULT_QUANTIZATION,
  states: DEFAULT_STATES,
  swing: 0,
  swingSubdivision: "8n",
  tracks,
};

export { DeathcorePreset };

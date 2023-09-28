import {
  DEFAULT_TRACK_AUDIO,
  DEFAULT_MEASURE_COUNT,
  DEFAULT_POSITION,
  DEFAULT_QUANTIZATION,
} from "@/app/core/config/constants";

import type { IProjectContext } from "@/app/core/config/types";
import type { ITrack } from "@/app/types/daw";

const tracks: ITrack<any, any>[] = [DEFAULT_TRACK_AUDIO];

const DeathcorePreset: IProjectContext = {
  tracks,
  activeTrackId: tracks[0].id,
  bpm: 0,
  clef: "C",
  measureCount: DEFAULT_MEASURE_COUNT,
  name: "Metal – Deathcore",
  position: DEFAULT_POSITION,
  quantization: DEFAULT_QUANTIZATION,
  swing: 0,
  swingSubdivision: "8n",
};

export { DeathcorePreset };

import {
  DEFAULT_STATES,
  DEFAULT_BPM,
  DEFAULT_CLEF,
  DEFAULT_GROUP_DRUMS,
  DEFAULT_GROUP_MIXBUS,
  DEFAULT_MEASURE_COUNT,
  DEFAULT_NAME,
  DEFAULT_POSITION,
  DEFAULT_QUANTIZATION,
  DEFAULT_TRACK_AUDIO,
  DEFAULT_TRACK_INSTRUMENT_BASS,
  DEFAULT_TRACK_INSTRUMENT_BD,
  DEFAULT_TRACK_INSTRUMENT_CHH,
  DEFAULT_TRACK_INSTRUMENT_SD,
  DEFAULT_TRACK_SAMPLER,
} from "@/app/core/config/constants";

import type { IProjectContext } from "@/app/core/config/types";
import { ITrack } from "@/app/types/daw";

const tracks: ITrack<any, any>[] = [
  DEFAULT_TRACK_AUDIO,
  DEFAULT_TRACK_INSTRUMENT_BD,
  DEFAULT_TRACK_INSTRUMENT_SD,
  DEFAULT_TRACK_INSTRUMENT_CHH,
  DEFAULT_TRACK_INSTRUMENT_BASS,
  DEFAULT_TRACK_SAMPLER,
  DEFAULT_GROUP_DRUMS,
  DEFAULT_GROUP_MIXBUS,
];
const DefaultPreset: IProjectContext = {
  states: DEFAULT_STATES,
  tracks,
  activeTrackId: tracks[5].id,
  bpm: DEFAULT_BPM,
  clef: DEFAULT_CLEF,
  measureCount: DEFAULT_MEASURE_COUNT,
  name: DEFAULT_NAME,
  position: DEFAULT_POSITION,
  quantization: DEFAULT_QUANTIZATION,
  swing: 0,
  swingSubdivision: "8n",
};

export { DefaultPreset };

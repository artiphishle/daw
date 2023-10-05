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
  DEFAULT_TRACK_SAMPLER,
  DEFAULT_TRACK_MASTER,
} from "@/app/core/config/constants";

import type { IProjectContext } from "@/app/types/daw";

const tracks = [
  DEFAULT_TRACK_INSTRUMENT_BASS,
  DEFAULT_TRACK_SAMPLER,
  DEFAULT_TRACK_AUDIO,
  DEFAULT_GROUP_DRUMS,
  DEFAULT_GROUP_MIXBUS,
  DEFAULT_TRACK_MASTER,
];
const DefaultPreset: IProjectContext = {
  activeTrackId: "track-sampler",
  bpm: DEFAULT_BPM,
  clef: DEFAULT_CLEF,
  measureCount: DEFAULT_MEASURE_COUNT,
  name: DEFAULT_NAME,
  position: DEFAULT_POSITION,
  quantization: DEFAULT_QUANTIZATION,
  states: DEFAULT_STATES,
  swing: 0,
  swingSubdivision: "8n",
  tracks,
};

export { DefaultPreset };

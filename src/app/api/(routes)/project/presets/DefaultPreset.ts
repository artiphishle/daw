import {
  DEFAULT_STATES,
  DEFAULT_BPM,
  DEFAULT_CLEF,
  DEFAULT_MEASURE_COUNT,
  DEFAULT_NAME,
  DEFAULT_POSITION,
  DEFAULT_QUANTIZATION,
  // DEFAULT_TRACK_AUDIO,
  // DEFAULT_TRACK_INSTRUMENT_BASS,
  // DEFAULT_TRACK_SAMPLER,
  // DEFAULT_TRACK_PLAYERS,
  DEFAULT_CHANNEL_DRUMS,
  DEFAULT_CHANNEL_MASTER,
  DEFAULT_TRACK_HI_TOM,
  DEFAULT_TRACK_MI_TOM,
  DEFAULT_TRACK_LO_TOM,
  DEFAULT_TRACK_BD,
  DEFAULT_TRACK_SD,
  DEFAULT_SCALE,
  DEFAULT_ACTIVE_TRACK_ID,
  DEFAULT_TRACK_OH,
} from '@/constants';

import type { IProjectContext } from '@/types/project.types';

const DefaultPreset: IProjectContext = {
  activeTrackId: DEFAULT_ACTIVE_TRACK_ID,
  bpm: DEFAULT_BPM,
  scale: DEFAULT_SCALE,
  channels: [DEFAULT_CHANNEL_DRUMS, DEFAULT_CHANNEL_MASTER],
  clef: DEFAULT_CLEF,
  measureCount: DEFAULT_MEASURE_COUNT,
  name: DEFAULT_NAME,
  position: DEFAULT_POSITION,
  quantization: DEFAULT_QUANTIZATION,
  states: DEFAULT_STATES,
  swing: 0.25,
  swingSubdivision: '8n',
  tracks: [
    DEFAULT_TRACK_BD,
    DEFAULT_TRACK_SD,
    DEFAULT_TRACK_OH,
    DEFAULT_TRACK_HI_TOM,
    DEFAULT_TRACK_MI_TOM,
    DEFAULT_TRACK_LO_TOM,
    // DEFAULT_TRACK_INSTRUMENT_BASS,
    // DEFAULT_TRACK_SAMPLER,
    // DEFAULT_TRACK_AUDIO,
    // DEFAULT_TRACK_PLAYERS,
  ],
};

export { DefaultPreset };

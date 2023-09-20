import {
  DEFAULT_AUDIO_TRACK,
  DEFAULT_MEASURE_COUNT,
  DEFAULT_POSITION,
  DEFAULT_QUANTIZATION,
  DEFAULT_TRACK_TIME,
} from "@/app/core/config/constants";

import type { IProjectSettings } from "@/app/core/config/types";
import type { ITrack } from "@/app/core/tracks/Track";

const tracks: ITrack[] = [DEFAULT_TRACK_TIME, DEFAULT_AUDIO_TRACK];

const DeathcorePreset: IProjectSettings = {
  tracks,
  activeTrackId: tracks[1].id,
  bpm: 0,
  clef: "C",
  measureCount: DEFAULT_MEASURE_COUNT,
  name: "Metal – Deathcore",
  position: DEFAULT_POSITION,
  quantization: DEFAULT_QUANTIZATION,
};

export { DeathcorePreset };

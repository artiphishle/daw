import {
  DEFAULT_AUDIO_TRACK,
  DEFAULT_BPM,
  DEFAULT_CLEF,
  DEFAULT_GROUP_DRUMS,
  DEFAULT_GROUP_MIXBUS,
  DEFAULT_MEASURE_COUNT,
  DEFAULT_MIDI_BASS_TRACK,
  DEFAULT_MIDI_BD_TRACK,
  DEFAULT_MIDI_CHH_TRACK,
  DEFAULT_MIDI_SD_TRACK,
  DEFAULT_NAME,
  DEFAULT_POSITION,
  DEFAULT_QUANTIZATION,
  DEFAULT_TRACK_TIME,
} from "@/app/core/config/constants";

import type { IProjectSettings } from "@/app/core/config/types";
import type { ITrack } from "@/app/core/tracks/Track";

const tracks: ITrack[] = [
  DEFAULT_TRACK_TIME,
  DEFAULT_MIDI_BD_TRACK,
  DEFAULT_MIDI_SD_TRACK,
  DEFAULT_MIDI_CHH_TRACK,
  DEFAULT_MIDI_BASS_TRACK,
  DEFAULT_AUDIO_TRACK,
  DEFAULT_GROUP_DRUMS,
  DEFAULT_GROUP_MIXBUS,
];
const DefaultPreset: IProjectSettings = {
  tracks,
  activeTrackId: tracks[1].id,
  bpm: DEFAULT_BPM,
  clef: DEFAULT_CLEF,
  measureCount: DEFAULT_MEASURE_COUNT,
  name: DEFAULT_NAME,
  position: DEFAULT_POSITION,
  quantization: DEFAULT_QUANTIZATION,
};

export { DefaultPreset };

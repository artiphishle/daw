import t from "../i18n";

import midiChannels from "@/app/core/tracks/midi/constants/channels.midi.constants";

import { ETrackType } from "@/app/core/tracks/types";
import {
  EMidiPluginType,
  TMidiDrumSequence,
  type IMidiPlugin,
  type IMidiTrackConfig,
} from "@/app/core/tracks/midi/types";
import type { IAudioTrackConfig } from "@/app/core/tracks/audio/types";
import type { IMixer } from "@/app/components/Mixer";
import type { TTrackConfig } from "./types";

const DEFAULT_BPM = 120;
const DEFAULT_CLEF = "C";
const DEFAULT_OFFSET_LEFT = 185;
const DEFAULT_MEASURE_COUNT = 8;
const DEFAULT_POSITION = "0:0:0";
const DEFAULT_QUANTIZATION = 8;

// 's' means # (sharp), and 'o' is normal
const C_1 = midiChannels[36].key; // C1
const D_1 = midiChannels[38].key; // D1
const Fs1 = midiChannels[42].key; // F#1
const _ = null;
const x = "x";

const drums: TMidiDrumSequence = {
  /**
   *    16 tones, let's assume duration: '8n'
   *    = 16x8n = 8x4n = 4x2n = 2x1n = 2x1m (1 measure = 1 full note afaik)
   *    1  .  .  .  2  .  .  .  3  .  .  .  4  .  .  .
   *       2  3  4     2  3  4     2  3  4     2  3  4   */
  C_1: [x, x, _, _, _, _, x, _, x, _, x, _, _, _, _, _], // Ch36: BD BaseDrum
  D_1: [_, _, _, _, x, _, _, _, _, _, _, _, x, _, _, _], // Ch38: SD SnareDrum
  Fs1: [_, x, x, x, _, x, x, x, _, x, x, x, _, x, x, x], // Ch42: CH ClosedHihat
};

const DEFAULT_MIDI_DRUM_PLUGIN: IMidiPlugin = {
  type: EMidiPluginType.Drums,
  channels: [
    { id: 36, notes: drums.C_1 },
    { id: 38, notes: drums.D_1 },
    { id: 42, notes: drums.Fs1 },
  ],
};

const DEFAULT_AUDIO_TRACK: IAudioTrackConfig = {
  id: "track-audio-0",
  name: t("untitled"),
  type: ETrackType.Audio,
};

const DEFAULT_MIDI_TRACK: IMidiTrackConfig = {
  id: "track-midi",
  name: t("untitled"),
  type: ETrackType.Midi,
};

const DEFAULT_MIDI_DRUM_TRACK: IMidiTrackConfig = {
  ...DEFAULT_MIDI_TRACK,
  id: "track-midi-drums",
  name: "Drums",
  plugins: [DEFAULT_MIDI_DRUM_PLUGIN],
};

const DEFAULT_TRACKS: TTrackConfig[] = [
  { id: "track-time", name: "", type: ETrackType.Time },
  { ...DEFAULT_MIDI_DRUM_TRACK },
  { ...DEFAULT_AUDIO_TRACK, name: "Example.wav" },
];

const DEFAULT_MIXER: IMixer = {
  visibility: {
    [ETrackType.Audio]: true,
    [ETrackType.Midi]: true,
  },
};

// Tracks
export {
  DEFAULT_AUDIO_TRACK,
  DEFAULT_MIDI_TRACK,
  DEFAULT_MIDI_DRUM_TRACK,
  DEFAULT_TRACKS,
};

// Arranger
export {
  DEFAULT_BPM,
  DEFAULT_CLEF,
  DEFAULT_OFFSET_LEFT,
  DEFAULT_POSITION,
  DEFAULT_QUANTIZATION,
  DEFAULT_MEASURE_COUNT,
};

// Mixer
export { DEFAULT_MIXER };

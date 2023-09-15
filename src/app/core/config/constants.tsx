import t from "@/app/core/i18n";

import { EInstrument } from "@/app/hooks/useProjectSettings";
import { ETrackType } from "@/app/core/tracks/types";
import {
  EMidiPluginType,
  TMidiChannel,
  type IMidiPlugin,
} from "@/app/core/tracks/midi/types";
import type { IMixer } from "@/app/components/Mixer";
import type { TTrack } from "./types";
import type { IAudioTrack, IGroupTrack, IMidiTrack } from "../tracks";

const DEFAULT_BPM = 120;
const DEFAULT_CLEF = "C";
const DEFAULT_MEASURE_COUNT = 8;
const DEFAULT_NAME = t("untitled");
const DEFAULT_OFFSET_LEFT = 185;
const DEFAULT_POSITION = "0:0:0";
const DEFAULT_QUANTIZATION = 8;

const bd = [
  "C1",
  null,
  "C1",
  null,
  "C1",
  null,
  "C1",
  null,
  "C1",
  null,
  "C1",
  null,
  "C1",
  null,
  "C1",
  null,
  "C1",
  null,
  "C1",
  null,
  "C1",
  null,
  "C1",
  null,
  "C1",
  null,
  "C1",
  null,
  "C1",
  null,
  "C1",
  null,
] as TMidiChannel;
const sd = [
  null,
  "D1",
  null,
  "D1",
  null,
  "D1",
  null,
  "D1",
  null,
  "D1",
  null,
  "D1",
  null,
  "D1",
  null,
  "D1",
  null,
  "D1",
  null,
  "D1",
  null,
  "D1",
  null,
  "D1",
  null,
  "D1",
  null,
  "D1",
  null,
  "D1",
  null,
  "D1",
] as TMidiChannel;
const ch = [
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
  "F#1",
] as TMidiChannel;

const channels: TMidiChannel[] = [];
channels[36] = bd;
channels[38] = sd;
channels[42] = ch;

const DEFAULT_MIDI_DRUM_PLUGIN: IMidiPlugin = {
  type: EMidiPluginType.Drums,
  channels,
};

const DEFAULT_AUDIO_TRACK: IAudioTrack = {
  id: "audio-test",
  name: "Test Sample",
  url: "/SalamanderGP-V3_48khz24bit/A0v1.wav",
  routing: {
    input: {
      label: "audio.wav",
      onClick: () => alert("soon"),
    },
    output: "mixbus",
  },
  type: ETrackType.Audio,
};
const DEFAULT_MIDI_TRACK: IMidiTrack = {
  id: "track-midi",
  name: "Bass",
  routing: {
    input: {
      label: "BassSynth",
      onClick: () => alert("soon"),
      instrument: EInstrument.BassSynth,
    },
    output: "mixbus",
  },
  type: ETrackType.Midi,
};
const DEFAULT_MIDI_DRUM_TRACK: IMidiTrack = {
  ...DEFAULT_MIDI_TRACK,
  id: "track-midi-drums",
  name: "Drums",
  routing: {
    input: {
      label: "MidiDrums",
      onClick: () => alert("soon"),
    },
    output: "mixbus",
  },
  plugins: [DEFAULT_MIDI_DRUM_PLUGIN],
};
const DEFAULT_GROUP_MIXBUS: IGroupTrack = {
  id: "track-group-mixbus",
  name: "Mixbus",
  routing: {
    input: {
      label: "All",
      onClick: () => alert("soon"),
    },
    output: "master",
  },
  type: ETrackType.Group,
};

const DEFAULT_TRACKS: TTrack[] = [
  {
    id: "track-time",
    name: "",
    routing: {
      input: { label: "None", onClick: () => {} },
      output: null,
    },
    type: ETrackType.Time,
  },
  { ...DEFAULT_MIDI_DRUM_TRACK },
  { ...DEFAULT_MIDI_TRACK },
  { ...DEFAULT_AUDIO_TRACK },
  { ...DEFAULT_GROUP_MIXBUS },
];

const DEFAULT_MIXER: IMixer = {
  settings: {
    [ETrackType.Audio]: {
      bg: "bg-purple-100",
      label: "Audio",
      text: "text-purple-800",
      visible: true,
    },
    [ETrackType.Group]: {
      bg: "bg-white",
      label: "Group",
      text: "text-black",
      visible: true,
    },
    [ETrackType.Midi]: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      label: "Midi",
      visible: true,
    },
  },
};

export {
  DEFAULT_AUDIO_TRACK,
  DEFAULT_MIDI_TRACK,
  DEFAULT_MIDI_DRUM_TRACK,
  DEFAULT_TRACKS,
  //
  DEFAULT_BPM,
  DEFAULT_CLEF,
  DEFAULT_NAME,
  DEFAULT_OFFSET_LEFT,
  DEFAULT_POSITION,
  DEFAULT_QUANTIZATION,
  DEFAULT_MEASURE_COUNT,
  //
  DEFAULT_MIXER,
};

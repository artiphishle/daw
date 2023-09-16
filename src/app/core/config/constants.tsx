import t from "@/app/core/i18n";

import { EInstrument } from "@/app/hooks/useProjectSettings";
import { ETrackType } from "@/app/core/tracks/types";
import type { IMixer } from "@/app/components/Mixer";
import type {
  IAudioTrack,
  IGroupTrack,
  IMidiTrack,
  ITimeTrack,
} from "../tracks";

/**
 * GENERAL
 */

const DEFAULT_BPM = 120;
const DEFAULT_CLEF = "C";
const DEFAULT_MEASURE_COUNT = 8;
const DEFAULT_NAME = t("untitled");
const DEFAULT_OFFSET_LEFT = 185;
const DEFAULT_POSITION = "0:0:0";
const DEFAULT_QUANTIZATION = 8;

/**
 * TRACKS
 */

// TIME
const DEFAULT_TRACK_TIME: ITimeTrack = {
  id: "track-time",
  name: "",
  routing: {
    input: { label: "None", onClick: () => {} },
    output: null,
  },
  type: ETrackType.Time,
};

// AUDIO
const DEFAULT_AUDIO_TRACK: IAudioTrack = {
  id: "audio-test",
  name: "Halloween",
  url: "/halloween.mp3",
  routing: {
    input: {
      label: "Audio",
      onClick: () => alert("soon"),
    },
    output: "mixbus",
  },
  type: ETrackType.Audio,
};

// DRUMS
const DEFAULT_MIDI_BD_TRACK: IMidiTrack = {
  id: "track-midi-bd",
  name: "BD",
  routing: {
    input: {
      label: EInstrument.BaseDrum,
      notes: [
        "C1",
        undefined,
        "C1",
        undefined,
        "C1",
        undefined,
        "C1",
        undefined,
        "C1",
        undefined,
        "C1",
        undefined,
        "C1",
        undefined,
        "C1",
        undefined,
        "C1",
        undefined,
        "C1",
        undefined,
        "C1",
        undefined,
        "C1",
        undefined,
        "C1",
        undefined,
        "C1",
        undefined,
        "C1",
        undefined,
        "C1",
        undefined,
      ],
      onClick: () => alert("BaseDrum"),
      instrument: EInstrument.BaseDrum,
    },
    output: "drums",
  },
  type: ETrackType.Midi,
};
const DEFAULT_MIDI_SD_TRACK: IMidiTrack = {
  id: "track-midi-sd",
  name: "SD",
  routing: {
    input: {
      label: EInstrument.SnareDrum,
      notes: [
        undefined,
        "D1",
        undefined,
        "D1",
        undefined,
        "D1",
        undefined,
        "D1",
        undefined,
        "D1",
        undefined,
        "D1",
        undefined,
        "D1",
        undefined,
        "D1",
        undefined,
        "D1",
        undefined,
        "D1",
        undefined,
        "D1",
        undefined,
        "D1",
        undefined,
        "D1",
        undefined,
        "D1",
        undefined,
        "D1",
        undefined,
        "D1",
      ],
      onClick: () => alert("SnareDrum"),
      instrument: EInstrument.SnareDrum,
    },
    output: "drums",
  },
  type: ETrackType.Midi,
};
const DEFAULT_MIDI_CHH_TRACK: IMidiTrack = {
  id: "track-midi-chh",
  name: "CHH",
  routing: {
    input: {
      label: EInstrument.ClosedHiHat,
      notes: new Array(32).fill("F#1").map((n) => n),
      onClick: () => alert("SnareDrum"),
      instrument: EInstrument.SnareDrum,
    },
    output: "drums",
  },
  type: ETrackType.Midi,
};

// BASS
const DEFAULT_MIDI_BASS_TRACK: IMidiTrack = {
  id: "track-midi-bass",
  name: "Bass",
  routing: {
    input: {
      label: EInstrument.BassSynth,
      onClick: () => alert("soon"),
      instrument: EInstrument.BassSynth,
      notes: [
        "C2",
        "E2",
        "G2",
        undefined,
        "C2",
        "E2",
        "G2",
        undefined,
        "C2",
        "E2",
        "G2",
        undefined,
        "C2",
        "E2",
        "G2",
        undefined,
        "C2",
        "E2",
        "G2",
        undefined,
        "C2",
        "E2",
        "G2",
        undefined,
        "C2",
        "E2",
        "G2",
        undefined,
        "C2",
        "E2",
        "G2",
        undefined,
      ],
    },
    output: "mixbus",
  },
  type: ETrackType.Midi,
};

// GROUP
const DEFAULT_GROUP_DRUMS: IGroupTrack = {
  id: "drums",
  type: ETrackType.Group,
  name: "Drums",
  routing: {
    input: {
      label: "Drums",
      onClick: () => alert("Group: Drums"),
    },
    output: "mixbus",
  },
};
const DEFAULT_GROUP_MIXBUS: IGroupTrack = {
  id: "mixbus",
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

// MIXER
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
  DEFAULT_BPM,
  DEFAULT_CLEF,
  DEFAULT_NAME,
  DEFAULT_OFFSET_LEFT,
  DEFAULT_POSITION,
  DEFAULT_QUANTIZATION,
  DEFAULT_MEASURE_COUNT,
  //
  DEFAULT_TRACK_TIME,
  DEFAULT_AUDIO_TRACK,
  DEFAULT_MIDI_BD_TRACK,
  DEFAULT_MIDI_SD_TRACK,
  DEFAULT_MIDI_CHH_TRACK,
  DEFAULT_MIDI_BASS_TRACK,
  //
  DEFAULT_GROUP_DRUMS,
  DEFAULT_GROUP_MIXBUS,
  //
  DEFAULT_MIXER,
};

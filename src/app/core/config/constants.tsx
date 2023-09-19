import t from "@/app/core/i18n";

import { EInstrument } from "@/app/core/hooks/useProjectSettings";
import { ETrackType } from "@/app/core/tracks/types";
import type { ITrack } from "../tracks/Track";

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
const DEFAULT_TRACK_TIME: ITrack = {
  id: "track-time",
  name: "",
  routing: {
    input: {
      id: "track-time-01",
      instrument: null,
      label: "None",
      notes: [],
      onClick: () => {},
    },
    output: null,
  },
  type: ETrackType.Time,
};

// AUDIO
const DEFAULT_AUDIO_TRACK: ITrack = {
  id: "audio-test",
  name: "Halloween",
  url: "/halloween.mp3",
  routing: {
    input: {
      id: "track-audio-halloween",
      instrument: null,
      label: "Audio",
      notes: [],
      onClick: () => alert("soon"),
    },
    output: "mixbus",
  },
  type: ETrackType.Audio,
};

// DRUMS
const DEFAULT_MIDI_BD_TRACK: ITrack = {
  id: "track-midi-bd",
  name: "BD",
  routing: {
    input: {
      id: "track-midi-bd-01",
      label: EInstrument.BaseDrum,
      notes: [
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
      ],
      onClick: () => alert("BaseDrum"),
      instrument: EInstrument.BaseDrum,
    },
    output: "drums",
  },
  type: ETrackType.Midi,
};
const DEFAULT_MIDI_SD_TRACK: ITrack = {
  id: "track-midi-sd",
  name: "SD",
  routing: {
    input: {
      id: "",
      label: EInstrument.SnareDrum,
      notes: [
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
      ],
      onClick: () => alert("SnareDrum"),
      instrument: EInstrument.SnareDrum,
    },
    output: "drums",
  },
  type: ETrackType.Midi,
};
const DEFAULT_MIDI_CHH_TRACK: ITrack = {
  id: "track-midi-chh",
  name: "CHH",
  routing: {
    input: {
      id: "",
      label: EInstrument.ClosedHiHat,
      notes: new Array(32).fill("F#1").map((n) => n),
      onClick: () => alert("SnareDrum"),
      instrument: EInstrument.ClosedHiHat,
    },
    output: "drums",
  },
  type: ETrackType.Midi,
};

// BASS
const DEFAULT_MIDI_BASS_TRACK: ITrack = {
  id: "track-midi-bass",
  name: "Bass",
  routing: {
    input: {
      id: "",
      label: EInstrument.BassSynth,
      onClick: () => alert("soon"),
      instrument: EInstrument.BassSynth,
      notes: [
        null,
        null,
        null,
        null,
        "C2",
        null,
        null,
        null,
        "E2",
        null,
        null,
        null,
        "G2",
        null,
        null,
        null,

        null,
        null,
        null,
        null,
        "C2",
        null,
        null,
        null,
        "E2",
        null,
        null,
        null,
        "G2",
        null,
        null,
        null,
      ],
    },
    output: "mixbus",
  },
  type: ETrackType.Midi,
};

// GROUP
const DEFAULT_GROUP_DRUMS: ITrack = {
  id: "drums",
  type: ETrackType.Group,
  name: "Drums",
  routing: {
    input: {
      id: "",
      instrument: null,
      label: "Drums",
      notes: [],
      onClick: () => alert("Group: Drums"),
    },
    output: "mixbus",
  },
};
const DEFAULT_GROUP_MIXBUS: ITrack = {
  id: "mixbus",
  name: "Mixbus",
  routing: {
    input: {
      id: "",
      instrument: null,
      label: "All",
      notes: [],
      onClick: () => alert("soon"),
    },
    output: "master",
  },
  type: ETrackType.Group,
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
};

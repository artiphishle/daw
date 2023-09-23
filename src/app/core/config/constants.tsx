import t from "@/app/core/i18n";

import { EInstrument } from "@/app/core/hooks/useProjectContext";
import { ETrackType } from "@/app/components/track/types";
import type { ITrack } from "@/app/components/track/Track";

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
const DEFAULT_SWING = 0;
const DEFAULT_SWING_SUBDIVISION = "8n";

/**
 * TRACKS
 */

// TIME
const DEFAULT_TRACK_TIME: ITrack = {
  id: "track-time",
  name: "",
  routing: {
    input: {
      instrument: null,
      label: "None",
      notes: [],
      onClick: (event) => {
        event.preventDefault();
      },
    },
    output: null,
  },
  type: ETrackType.Time,
};

// AUDIO
const DEFAULT_AUDIO_TRACK: ITrack = {
  id: "track-audio-halloween",
  name: "Halloween",
  url: "/halloween.mp3",
  routing: {
    input: {
      instrument: null,
      label: "Audio",
      notes: [],
      onClick: (event) => {
        event.preventDefault();
        alert("AudioTrack: Halloween");
      },
    },
    output: "mixbus",
  },
  type: ETrackType.Audio,
};
const DEFAULT_ACTIVE_TRACK_ID = DEFAULT_AUDIO_TRACK.id;

// DRUMS
const DEFAULT_MIDI_BD_TRACK: ITrack = {
  id: "track-midi-bd",
  name: "BD",
  routing: {
    input: {
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
      onClick: (event) => {
        event.preventDefault();
        alert("BaseDrum");
      },
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
      onClick: (event) => {
        event.preventDefault();
        alert("MidiTrack: SnareDrum");
      },
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
      label: EInstrument.ClosedHiHat,
      notes: new Array(32).fill("F#1").map((n) => n),
      onClick: (event) => {
        event.preventDefault();
        alert("MidiTrack: ClosedHiHat");
      },
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
      instrument: EInstrument.BassSynth,
      label: EInstrument.BassSynth,
      onClick: (event) => {
        event.preventDefault();
        alert("MidiTrack: BassSynth");
      },
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
  id: "track-group-drums",
  type: ETrackType.Group,
  name: "Drums",
  routing: {
    input: {
      instrument: null,
      label: "Drums",
      notes: [],
      onClick: (event) => {
        event.preventDefault();
        alert("Group: Drums");
      },
    },
    output: "mixbus",
  },
};
const DEFAULT_GROUP_MIXBUS: ITrack = {
  id: "mixbus",
  name: "Mixbus",
  routing: {
    input: {
      instrument: null,
      label: "All",
      notes: [],
      onClick: (event) => {
        event.preventDefault();
        alert("Group: Mixbus");
      },
    },
    output: "master",
  },
  type: ETrackType.Group,
};
export {
  DEFAULT_ACTIVE_TRACK_ID,
  DEFAULT_BPM,
  DEFAULT_CLEF,
  DEFAULT_MEASURE_COUNT,
  DEFAULT_NAME,
  DEFAULT_OFFSET_LEFT,
  DEFAULT_POSITION,
  DEFAULT_QUANTIZATION,
  DEFAULT_SWING,
  DEFAULT_SWING_SUBDIVISION,
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

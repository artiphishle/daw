import t from "@/app/core/i18n";

import { EInstrument, ETrackType, type ITrack } from "@/app/types/daw";

/**
 * GENERAL
 */

const DEFAULT_BPM = 120;
const DEFAULT_CLEF = "C";
const DEFAULT_MEASURE_COUNT = 2;
const DEFAULT_NAME = t("untitled");
const DEFAULT_OFFSET_LEFT = 168;
const DEFAULT_POSITION = "0:0:0";
const DEFAULT_QUANTIZATION = 8;
const DEFAULT_SWING = 0;
const DEFAULT_SWING_SUBDIVISION = "8n";

/**
 * STATES
 */
const DEFAULT_STATES = {
  tabTopActive: 0,
  tabBtmActive: 0,
};

/**
 * TRACKS
 */

// AUDIO
const DEFAULT_TRACK_AUDIO: ITrack = {
  id: "track-audio-halloween",
  name: "Halloween",
  routing: {
    input: {
      id: "track-audio-input",
      label: "Audio",
      options: {
        url: "/halloween.mp3",
      },
    },
    output: "mixbus",
  },
  type: ETrackType.Audio,
};
const DEFAULT_ACTIVE_TRACK_ID = DEFAULT_TRACK_AUDIO.id;
const TICKS_PER_16N = 48;
// BASS
const DEFAULT_TRACK_INSTRUMENT_BASS: ITrack = {
  id: "track-instrument-bass",
  name: "Bass",
  routing: {
    input: {
      id: EInstrument.MonoSynth,
      label: "BA",
      options: {
        oscillator: { type: "sawtooth" },
        envelope: { attack: 0.1, decay: 0.5, release: 1, sustain: 0.7 },
        filterEnvelope: {
          attack: 0.001,
          baseFrequency: 200,
          decay: 0.01,
          octaves: 0,
          release: 0.1,
          sustain: 0.5,
        },
        volume: -14,
      },
      notes: ["A1", "D#2", "D2", null] as any,
    },
    output: "mixbus",
  },
  type: ETrackType.Instrument,
};

// SAMPLER (Drums)
const DEFAULT_TRACK_SAMPLER: ITrack = {
  id: "track-sampler",
  name: "Sampler",
  routing: {
    input: {
      id: EInstrument.Sampler,
      label: "Drums",
      options: {
        baseUrl: "./samples/WaveAlchemy/wa_808_tape/",
        urls: {
          C3: "wa_808tape_kick_01_sat.wav",
          D3: "wa_808tape_snare_10_clean.wav",
          E3: "wa_808tape_closedhat_08_clean.wav",
        },
        volume: -12,
      },
      notes: [
        "C3",
        [["E3", "E3", "E3", "E3"]],
        ["D3", "D3"],
        "E3",
        "C3",
        ["E3", "E3"],
        "D3",
        ["E3", "E3"],
      ] as any,
    },
    output: "mixbus",
  },
  type: ETrackType.Instrument,
};

// GROUP
const DEFAULT_GROUP_DRUMS: ITrack = {
  id: "track-group-drums",
  type: ETrackType.Group,
  name: "Drums",
  routing: {
    input: {
      id: "track-group-drums-input",
      label: "Drums",
      options: {
        volume: -12,
        pan: 0,
        solo: false,
        mute: false,
        channelCount: 1,
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
      id: "mixbus-input",
      label: "All",
      options: {
        channelCount: 1,
        mute: false,
        pan: 0,
        solo: false,
        volume: 0,
      },
      notes: [],
    },
    output: "master",
  },
  type: ETrackType.Group,
};

// MASTER
const DEFAULT_TRACK_MASTER: ITrack = {
  id: "master",
  name: "Master",
  routing: {
    input: {
      id: "master-input",
      label: "Master",
      options: {
        channelCount: 1,
        mute: false,
        pan: 0,
        solo: false,
        volume: 0,
      },
    },
    output: "destination",
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
  DEFAULT_STATES,
  //
  DEFAULT_TRACK_AUDIO,
  DEFAULT_TRACK_INSTRUMENT_BASS,
  //
  DEFAULT_TRACK_SAMPLER,
  //
  DEFAULT_GROUP_DRUMS,
  DEFAULT_GROUP_MIXBUS,
  //
  DEFAULT_TRACK_MASTER,
};

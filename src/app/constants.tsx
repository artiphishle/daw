import _ from "lodash/fp";

import t from "@/core/i18n";

import { EInstrument } from "@/types/instrument.types";
import { ETrackType, type ITrack } from "@/types/track.types";
import { PlayersOptions } from "tone";

/**
 * General
 */
export const PROGRESSION = [
  /**
   * Diatonic
   */

  // Major
  "ii V I",

  /**
   * Pop
   */

  // 50s Progression
  "I vi IV V",

  // Pachelbel's Canon
  "I V vi iii IV I IV V",

  /**
   * Medieval
   */

  // Passamezzo antico
  "i VII i V III VII i V i",

  // Passamezzo moderno
  "I IV I V I IV I V I",

  /**
   * Classical
   */

  // Circle Progression
  "vi ii V I",

  /**
   * Blues
   */

  // "12-bar blues" (verify AI msg)
  "I V vi IV",

  // Eight-bar blues
  "I V IV IV I V I V",

  // Sixteen-bar blues
  "I I I I I I I I IV IV I I V IV I I",

  /**
   * Jazz
   */

  // Montgomery Ward bridge
  "I IV ii V",
];

export const isPlayableTrackType = (trackType: ETrackType) =>
  [ETrackType.Instrument, ETrackType.Sampler].includes(trackType);

export const isRomanNum = (test: string) =>
  ["i", "ii", "iii", "iv", "v", "vi", "vii"].includes(test.toLowerCase());

/**
 * Project
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
 * Routing
 */
const DEFAULT_CHANNEL_ROUTING = [
  ["player-drums", "channel-drums"],
  ["*!{master}", "mixbus"],
  ["mixbus", "master"],
];

/**
 * Tracks
 */

// Audio
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
// Bass
const DEFAULT_TRACK_INSTRUMENT_BASS: ITrack = {
  id: "track-instrument-bass",
  name: "Bass",
  type: ETrackType.Instrument,
  routing: {
    output: "mixbus",
    input: {
      id: EInstrument.MonoSynth,
      label: "BA",
      options: {
        oscillator: { type: "sawtooth" },
        envelope: { attack: 0.01, decay: 0.4, release: 0.3, sustain: 0.2 },
        filterEnvelope: {
          attack: 0.001,
          baseFrequency: 180,
          decay: 0.2,
          octaves: 0,
          release: 0.2,
          sustain: 0.25,
        },
        volume: -35,
      },
      parts: [
        {
          label: "BA-Part1",
          sequences: [
            {
              label: "Bass",
              events: [
                { n: "D#2", v: 100 },
                { n: "D#2", v: 100 },
                { n: "D#2", v: 100 },
                { n: "D#2", v: 100 },

                { n: "E2", v: 100 },
                { n: "E2", v: 100 },
                { n: "E2", v: 100 },
                { n: "E2", v: 100 },

                { n: "F#2", v: 100 },
                { n: "F#2", v: 100 },
                { n: "F#2", v: 100 },
                { n: "F#2", v: 100 },

                { n: "G2", v: 100 },
                { n: "G2", v: 100 },
                { n: "G2", v: 100 },
                { n: "G2", v: 100 },
              ],
            },
          ],
        },
      ],
    },
  },
};
// Player(s)
const DEFAULT_TRACK_PLAYERS: ITrack = {
  id: "track-players",
  name: "Toms",
  routing: {
    input: {
      id: "Players",
      label: "Players",
      options: {
        mute: false,
        volume: -3,
        // baseUrl: "./samples/WaveAlchemy/wa_drm_drums/",
        urls: {
          F4: "./samples/WaveAlchemy/wa_drm_drums/high_tom/wadrm_hitom_acc1_r2.wav",
          G4: "./samples/WaveAlchemy/wa_drm_drums/mid_tom/wadrm_midtom_acc0_r5.wav",
          A4: "./samples/WaveAlchemy/wa_drm_drums/low_tom/wadrm_lotom_acc2_r5.wav",
        },
        fadeIn: 0.001,
        fadeOut: 0.001,
        onerror: (error: any) => console.error("Toms error", error),
        onload: () => console.log("Toms loaded"),
        onstop: () => console.log("toms stopped"),
      } as Partial<PlayersOptions>,
      parts: [
        {
          label: "Drums (Players)",
          sequences: [
            {
              label: "TomsRoll",
              events: [
                { n: null },
                { n: null },
                { n: null },
                { n: null },
                { n: "F4" },
                { n: null },
                { n: null },
                { n: null },
              ],
            },
            {
              label: "Tom Mid",
              events: [
                { n: null },
                { n: null },
                { n: null },
                { n: null },
                { n: null },
                { n: "G4" },
                { n: "G4" },
                { n: null },
              ],
            },
            {
              label: "Tom Low",
              events: [
                { n: null },
                { n: null },
                { n: null },
                { n: null },
                { n: null },
                { n: null },
                { n: null },
                { n: "A4" },
              ],
            },
          ],
        },
      ],
    },
    output: "mixbus",
  },
  type: ETrackType.Instrument,
};
// Sampler (Drums)
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
        volume: -40,
        fadeIn: 0.2,
        fadeOut: 0.2,
      },
      parts: [
        {
          label: "Drums (Sampler)",
          sequences: [
            {
              label: "Kick",
              events: [
                { n: "C3", v: 95 },
                { n: null },
                { n: null },
                { n: null },
                { n: "C3", v: 89 },
                { n: null },
                { n: null },
                { n: null },
              ],
            },
            {
              label: "Snare",
              events: [
                { n: null },
                { n: null },
                { n: null },
                { n: "D3", v: 94 },
                { n: null },
                { n: null },
                { n: null },
                { n: "D3", v: 89 },
              ],
            },
            {
              label: "Closed HiHat",
              events: [
                [
                  { n: "E3", v: 104 },
                  { n: "E3", v: 89 },
                ],
                { n: "E3", v: 104 },
                { n: "E3", v: 99 },
                { n: "E3", v: 99 },
                [
                  { n: "E3", v: 104 },
                  { n: "E3", v: 79 },
                ],
                { n: "E3", v: 89 },
                { n: "E3", v: 74 },
                { n: null },
              ],
            },
          ],
        },
      ],
    },
    output: "mixbus",
  },
  type: ETrackType.Sampler,
};
// Channels
const DEFAULT_GROUP_DRUMS: ITrack = {
  id: "track-group-drums",
  type: ETrackType.Group,
  name: "Drums",
  routing: {
    input: {
      id: "track-group-drums-input",
      label: "Drums",
      options: {
        volume: -24,
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
        volume: -24,
      },
    },
    output: "master",
  },
  type: ETrackType.Group,
};
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
        volume: -24,
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
  DEFAULT_TRACK_PLAYERS,
  DEFAULT_TRACK_SAMPLER,
  //
  DEFAULT_GROUP_DRUMS,
  DEFAULT_GROUP_MIXBUS,
  //
  DEFAULT_TRACK_MASTER,
};

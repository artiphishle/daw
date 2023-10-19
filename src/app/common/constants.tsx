import _ from "lodash/fp";
import * as Tone from "tone";

import t from "@/core/i18n";

import { ETrackType, type ITrack } from "@/common/types/track.types";
import type { IChannel } from "./types/channel.types";

// ---------- General

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
export const isRomanNum = (test: string) =>
  ["i", "ii", "iii", "iv", "v", "vi", "vii"].includes(test.toLowerCase());

// ---------- Project

const DEFAULT_ACTIVE_TRACK_ID = "track-bd";
const DEFAULT_BPM = 98;
const DEFAULT_CLEF = "D";
const DEFAULT_SCALE = "minor";
const DEFAULT_MEASURE_COUNT = 2;
const DEFAULT_NAME = t("untitled");
const DEFAULT_OFFSET_LEFT = 184;
const DEFAULT_POSITION = "0:0:0";
const DEFAULT_QUANTIZATION = 16;
const DEFAULT_SWING = 0;
const DEFAULT_SWING_SUBDIVISION = "8n";
const DEFAULT_STATES = {
  tabTopActive: 0,
  tabBtmActive: 0,
};

// -------- Tracks

/* const DEFAULT_TRACK_INSTRUMENT_BASS: ITrack = {
  id: "track-instrument-bass",
  name: "Bass",
  type: ETrackType.Instrument,
  routing: {
    output: "master",
    input: {
      id: EInstrument.MonoSynth,
      label: "BA",
      options: {
        oscillator: { type: "sawtooth" },
        envelope: { attack: 0.01, decay: 0.4, release: 0.3, sustainote: 0.2 },
        filterEnvelope: {
          attack: 0.001,
          baseFrequency: 180,
          decay: 0.2,
          octaves: 0,
          release: 0.2,
          sustainote: 0.25,
        },
        volume: -35,
      },
      parts: [
        {
          label: "BA-Part1",
              events: [
                { note: "D#2", v: 100 },
                { note: "D#2", v: 100 },
                { note: "D#2", v: 100 },
                { note: "D#2", v: 100 },

                { note: "E2", v: 100 },
                { note: "E2", v: 100 },
                { note: "E2", v: 100 },
                { note: "E2", v: 100 },

                { note: "F#2", v: 100 },
                { note: "F#2", v: 100 },
                { note: "F#2", v: 100 },
                { note: "F#2", v: 100 },

                { note: "G2", v: 100 },
                { note: "G2", v: 100 },
                { note: "G2", v: 100 },
                { note: "G2", v: 100 },
              ],
            },
          ],
        },
      ],
    },
  },
};
*/
/*
const DEFAULT_TRACK_AUDIO: ITrack = {
  id: "track-audio-halloween",
  name: "Halloween",
  routing: {
    input: {
      parts: [],
      id: "track-audio-input",
      label: "Audio",
      options: {
        url: "/halloween.mp3",
      },
    },
    output: "master",
  },
  type: ETrackType.Audio,
};
*/

// -------- Drums

/***
 * @Track
 */
const DEFAULT_TRACK_BD: ITrack = {
  id: "track-bd",
  name: "Kick",
  routing: {
    input: {
      id: "Player",
      label: "KickPlayer",
      options: {
        url: "/samples/Roland_TR-909/BT3AAD0.WAV",
      },
      parts: [
        {
          label: "BD",
          length: "1m",
          events: [
            { note: "C2" },
            { note: null },
            { note: null },
            { note: null },

            { note: null },
            { note: null },
            { note: null },
            { note: null },
          ],
        },
        {
          label: "BD",
          length: "1m",
          events: [
            { note: "C2" },
            { note: null },
            { note: null },
            { note: null },

            { note: null },
            { note: null },
            { note: null },
            { note: null },
          ],
        },
      ],
    },
    output: "ch-drums",
  },
  type: ETrackType.Player,
};
/***
 * @Track
 */
const DEFAULT_TRACK_SD: ITrack = {
  id: "track-sd",
  name: "Snare",
  routing: {
    input: {
      id: "Player",
      label: "SnarePlayer",
      options: {
        url: "/samples/WaveAlchemy/wa_808_tape/wa_808tape_snare_16_clean.wav",
      },
      parts: [
        {
          label: "SD",
          length: "1m",
          events: [
            { note: null },
            { note: null },
            { note: null },
            { note: null },

            { note: "D2" },
            { note: null },
            { note: null },
            { note: null },
          ],
        },
        {
          label: "SD",
          length: "1m",
          events: [
            { note: null },
            { note: null },
            { note: null },
            { note: null },

            { note: "D2" },
            { note: null },
            { note: null },
            { note: null },
          ],
        },
      ],
    },
    output: "ch-drums",
  },
  type: ETrackType.Player,
};
const DEFAULT_TRACK_OH: ITrack = {
  id: "track-oh",
  name: "OH",
  routing: {
    input: {
      id: "Player",
      label: "inp-oh",
      options: {
        url: "/samples/WaveAlchemy/wa_808_tape/wa_808tape_openhat_01_clean.wav",
      },
      parts: [
        {
          label: "p1-oh",
          length: "1m",
          events: [
            { note: "F#2" },
            { note: null },
            { note: "F#2" },
            { note: null },

            { note: "F#2" },
            { note: null },
            { note: "F#2" },
            { note: null },
          ],
        },
        {
          label: "p2-oh",
          length: "1m",
          events: [
            { note: "F#2" },
            { note: null },
            { note: "F#2" },
            { note: null },

            { note: "F#2" },
            { note: null },
            { note: "F#2" },
            { note: null },
          ],
        },
      ],
    },
    output: "ch-drums",
  },
  type: ETrackType.Player,
};
/***
 * @Track
 */
const DEFAULT_TRACK_HI_TOM: ITrack = {
  id: "track-hi-tom",
  name: "HiTom",
  routing: {
    input: {
      id: "Player",
      label: "Tom Hi",
      options: {
        url: "/samples/WaveAlchemy/wa_drm_drums/high_tom/wadrm_hitom_acc1_r2.wav",
      },
      parts: [
        {
          label: "HiTomPart",
          length: "1m",
          events: [
            { note: null },
            { note: null },
            { note: null },
            { note: null },

            { note: null },
            { note: null },
            { note: null },
            { note: null },
          ],
        },
        {
          label: "HiTomPart",
          length: "1m",
          events: [
            { note: null },
            { note: null },
            { note: null },
            { note: null },

            { note: null },
            { note: "C4" },
            { note: null },
            { note: null },
          ],
        },
      ],
    },
    output: "ch-drums",
  },
  type: ETrackType.Player,
};
/***
 * @Track
 */
const DEFAULT_TRACK_MI_TOM: ITrack = {
  id: "track-mi-tom",
  name: "MiToms",
  routing: {
    input: {
      id: "Player",
      label: "Tom Mi",
      options: {
        url: "./samples/WaveAlchemy/wa_drm_drums/low_tom/wadrm_lotom_acc2_r5.wav",
      },
      parts: [
        {
          label: "MiTomPart",
          length: "1m",
          events: [
            { note: null },
            { note: null },
            { note: null },
            { note: null },

            { note: null },
            { note: null },
            { note: null },
            { note: null },
          ],
        },
        {
          label: "MiTomPart",
          length: "1m",
          events: [
            { note: null },
            { note: null },
            { note: null },
            { note: null },

            { note: null },
            { note: null },
            { note: "F4" },
            { note: null },
          ],
        },
      ],
    },
    output: "ch-drums",
  },
  type: ETrackType.Player,
};
/***
 * @Track
 */
const DEFAULT_TRACK_LO_TOM: ITrack = {
  id: "track-lo-tom",
  name: "LoTom",
  routing: {
    input: {
      id: "Player",
      label: "Tom Lo",
      options: {
        url: "./samples/WaveAlchemy/wa_drm_drums/mid_tom/wadrm_midtom_acc0_r5.wav",
      },
      parts: [
        {
          label: "LoTomPart",
          length: "1m",
          events: [
            { note: null },
            { note: null },
            { note: null },
            { note: null },

            { note: null },
            { note: null },
            { note: null },
            { note: null },
          ],
        },
        {
          label: "LoTomPart",
          length: "1m",
          events: [
            { note: null },
            { note: null },
            { note: null },
            { note: null },

            { note: null },
            { note: null },
            { note: null },
            { note: "E4" },
          ],
        },
      ],
    },
    output: "ch-drums",
  },
  type: ETrackType.Player,
};
/*
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
                { note: "C3", v: 95 },
                { note: null },
                { note: null },
                { note: null },
                { note: "C3", v: 89 },
                { note: null },
                { note: null },
                { note: null },
              ],
            },
            {
              label: "Snare",
              events: [
                { note: null },
                { note: null },
                { note: null },
                { note: "D3", v: 94 },
                { note: null },
                { note: null },
                { note: null },
                { note: "D3", v: 89 },
              ],
            },
            {
              label: "Closed HiHat",
              events: [
                [
                  { note: "E3", v: 104 },
                  { note: "E3", v: 89 },
                ],
                { note: "E3", v: 104 },
                { note: "E3", v: 99 },
                { note: "E3", v: 99 },
                [
                  { note: "E3", v: 104 },
                  { note: "E3", v: 79 },
                ],
                { note: "E3", v: 89 },
                { note: "E3", v: 74 },
                { note: null },
              ],
            },
          ],
        },
      ],
    },
    output: "ch-drums",
  },
  type: ETrackType.Sampler,
};
*/

// --------- Channels

/***
  @Channel
*/
const DEFAULT_CHANNEL_DRUMS: IChannel = {
  id: "ch-drums",
  label: "Drums",
  routing: {
    input: "(drums)",
    output: "master",
  },
  options: {
    channelCount: 1,
    mute: false,
    pan: 0,
    solo: false,
    volume: 0,
  },
};
/***
  @Channel
*/
const DEFAULT_CHANNEL_MASTER: IChannel = {
  id: "master",
  label: "Master",
  routing: { input: "(all)", output: "Stereo out" },
  options: {
    channelCount: 1,
    mute: false,
    pan: 0,
    solo: false,
    volume: 0,
  },
};

export {
  DEFAULT_ACTIVE_TRACK_ID,
  DEFAULT_BPM,
  DEFAULT_CLEF,
  DEFAULT_SCALE,
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
  // DEFAULT_TRACK_AUDIO,
  // DEFAULT_TRACK_INSTRUMENT_BASS,
  // DEFAULT_TRACK_PLAYERS,
  // DEFAULT_TRACK_SAMPLER,
  DEFAULT_TRACK_BD,
  DEFAULT_TRACK_SD,
  DEFAULT_TRACK_OH,
  DEFAULT_TRACK_HI_TOM,
  DEFAULT_TRACK_MI_TOM,
  DEFAULT_TRACK_LO_TOM,
  DEFAULT_CHANNEL_DRUMS,
  DEFAULT_CHANNEL_MASTER,
  //
};

import _ from 'lodash/fp';
import * as Tone from 'tone';

import t from 'app/_core/i18n';

import { ETrackType, type ITrack } from 'app/_common/types/track.types';
import type { IChannel } from './types/channel.types';
import { EInstrument } from './types/instrument.types';
import { Note } from 'tone/build/esm/core/type/NoteUnits';
import { Subdivision } from 'tone/build/esm/core/type/Units';
import { useProgress } from '@nextui-org/react';

// ---------- General
/*** @constants */
export const PROGRESSION = [
  /*** @Diatonic */
  // Major
  'ii V I',

  /*** @Pop */
  // 50s Progression
  'I vi IV V',
  // Pachelbel's Canon
  'I V vi iii IV I IV V',

  /*** @Medieval */
  // Passamezzo antico
  'i VII i V III VII i V i',
  // Passamezzo moderno
  'I IV I V I IV I V I',

  /*** @Classical */
  // Circle Progression
  'vi ii V I',

  /*** @Blues */
  // "12-bar blues" (verify AI msg)
  'I V vi IV',
  // Eight-bar blues
  'I V IV IV I V I V',
  // Sixteen-bar blues
  'I I I I I I I I IV IV I I V IV I I',

  /*** @Jazz */
  // Montgomery Ward bridge
  'I IV ii V',
];
export const getMaxNotes = (notes: Note[][]) =>
  Math.max(notes.reduce((a, b) => (a > b.length ? a : b.length), 0));

// ---------- Project
const DEFAULT_ACTIVE_TRACK_ID = 'audio-halloween';
const DEFAULT_BPM = 120;
const DEFAULT_CLEF = 'D';
const DEFAULT_SCALE = 'minor';
const DEFAULT_MEASURE_COUNT = 2;
const DEFAULT_NAME = t('untitled');
const DEFAULT_OFFSET_LEFT = 179;
const DEFAULT_POSITION = '0:0:0';
const DEFAULT_QUANTIZATION = 16;
const DEFAULT_SWING = 0;
const DEFAULT_SWING_SUBDIVISION: Subdivision = '8n';
const DEFAULT_STATES = {
  tabTopActive: 0,
  tabBtmActive: 0,
};

// -------- Tracks
/*** @Track */
const DEFAULT_TRACK_INSTRUMENT_BASS: ITrack = {
  id: 'track-instrument-bass',
  name: 'Bass',
  type: ETrackType.Instrument,
  routing: {
    output: 'master',
    input: {
      id: EInstrument.MonoSynth,
      label: 'in-bass',
      options: {
        oscillator: { type: 'sawtooth' },
        envelope: { attack: 0.01, decay: 0.4, release: 0.3, sustain: 0.2 },
        filterEnvelope: {
          attack: 0.001,
          baseFrequency: 180,
          decay: 0.2,
          octaves: 2,
          release: 0.2,
          sustain: 0.25,
        },
        volume: -31,
      },
      parts: [
        {
          label: 'p1-bass',
          notes: [
            ['D1'],
            ['D1', 'G#1'],
            ['G#1', 'G#2'],
            ['G#1', 'E2'],
            ['A1', 'A2'],
            ['A1', 'C#2'],
            ['A#1'],
            ['A#1', 'A#2'],

            ['A#1'],
            ['A#1'],
            ['G#1'],
            ['G#1'],
            ['D1'],
            [],
            [],
            [],
          ],
        },
      ],
    },
  },
};
// -------- Audio
/*** @Track */
const DEFAULT_TRACK_AUDIO: ITrack = {
  id: 'audio-halloween',
  name: 'Halloween',
  routing: {
    input: {
      parts: [{ label: 'p1-audio', times: [0] }],
      id: EInstrument.Player,
      label: 'in-audio',
      options: {
        url: './halloween.mp3',
        volume: -25,
      },
    },
    output: 'master',
  },
  type: ETrackType.Audio,
};
// -------- Drums
/*** @Track */
const DEFAULT_TRACK_BD: ITrack = {
  id: 'track-bd',
  name: 'Kick',
  routing: {
    input: {
      id: 'Player',
      label: 'KickPlayer',
      options: {
        url: './samples/Roland_TR-909/BT3AAD0.WAV',
      },
      parts: [
        {
          label: 'BD',
          times: [0],
        },
        {
          label: 'BD',
          times: [0],
        },
      ],
    },
    output: 'ch-drums',
  },
  type: ETrackType.Player,
};
/*** @Track */
const DEFAULT_TRACK_SD: ITrack = {
  id: 'track-sd',
  name: 'Snare',
  routing: {
    input: {
      id: EInstrument.Player,
      label: 'SnarePlayer',
      options: {
        url: './samples/WaveAlchemy/wa_808_tape/wa_808tape_snare_16_clean.wav',
      },
      parts: [
        {
          label: 'p1-SD',
          times: [8],
        },
        {
          label: 'p2-SD',
          times: [8],
        },
      ],
    },
    output: 'ch-drums',
  },
  type: ETrackType.Player,
};
/*** @Track */
const DEFAULT_TRACK_OH: ITrack = {
  id: 'track-oh',
  name: 'Open HiHat',
  routing: {
    input: {
      id: 'Player',
      label: 'inp-oh',
      options: {
        url: './samples/WaveAlchemy/wa_808_tape/wa_808tape_openhat_01_clean.wav',
      },
      parts: [
        {
          label: 'p1-oh',
          times: [0, 2, 4, 6, 8, 10, 12, 14],
        },
        {
          label: 'p2-oh',
          times: [0, 2, 4, 6, 8, 10],
        },
      ],
    },
    output: 'ch-drums',
  },
  type: ETrackType.Player,
};
/*** @Track */
const DEFAULT_TRACK_HI_TOM: ITrack = {
  id: 'track-hi-tom',
  name: 'HiTom',
  routing: {
    input: {
      id: 'Player',
      label: 'Tom Hi',
      options: {
        url: './samples/WaveAlchemy/wa_drm_drums/high_tom/wadrm_hitom_acc1_r2.wav',
      },
      parts: [
        { label: 'HiTomPart1', times: [] },
        {
          label: 'HiTomPart2',
          times: [12, 13],
        },
      ],
    },
    output: 'ch-drums',
  },
  type: ETrackType.Player,
};
/*** @Track */
const DEFAULT_TRACK_MI_TOM: ITrack = {
  id: 'track-mi-tom',
  name: 'MiToms',
  routing: {
    input: {
      id: 'Player',
      label: 'Tom Mi',
      options: {
        url: './samples/WaveAlchemy/wa_drm_drums/low_tom/wadrm_lotom_acc2_r5.wav',
      },
      parts: [
        {
          label: 'MiTomPart',
          times: [],
        },
        {
          label: 'MiTomPart',
          times: [14],
        },
      ],
    },
    output: 'ch-drums',
  },
  type: ETrackType.Player,
};
/*** @Track */
const DEFAULT_TRACK_LO_TOM: ITrack = {
  id: 'track-lo-tom',
  name: 'LoTom',
  routing: {
    input: {
      id: 'Player',
      label: 'Tom Lo',
      options: {
        url: './samples/WaveAlchemy/wa_drm_drums/mid_tom/wadrm_midtom_acc0_r5.wav',
      },
      parts: [
        {
          label: 'LoTomPart',
          times: [],
        },
        {
          label: 'LoTomPart',
          times: [15],
        },
      ],
    },
    output: 'ch-drums',
  },
  type: ETrackType.Player,
};
// -------- Sampler
/*** @Track */
const DEFAULT_TRACK_SAMPLER: ITrack = {
  id: 'sampler-drums',
  name: 'Drums',
  routing: {
    input: {
      id: EInstrument.Sampler,
      label: 'in-drums',
      options: {
        baseUrl: './samples/WaveAlchemy/wa_808_tape/',
        urls: {
          C3: 'wa_808tape_kick_01_sat.wav',
          D3: 'wa_808tape_snare_10_clean.wav',
          E3: 'wa_808tape_closedhat_08_clean.wav',
        },
        volume: -40,
        fadeIn: 0.01,
        fadeOut: 0.01,
        curve: 'linear',
      },
      parts: [
        {
          label: 'p1-sampler',
          notes: [
            ['C3', 'E3'],
            [],
            [],
            ['C3'],

            ['D3', 'E3'],
            [],
            ['C3'],
            [],

            ['C3', 'E3'],
            ['C3'],
            [],
            [],

            ['D3', 'E3'],
            [],
            [],
            [],
          ],
        },
        {
          label: 'p2-sampler',
          notes: [
            ['C3', 'E3'],
            [],
            [],
            ['C3', 'E3'],

            ['D3'],
            [],
            ['C3'],
            [],

            ['C3', 'E3'],
            ['C3'],
            [],
            [],

            ['D3'],
            [],
            [],
            [],
          ],
        },
      ],
    },
    output: 'ch-drums',
  },
  type: ETrackType.Sampler,
};
/*** @Track */
const DEFAULT_TRACK_PIANO: ITrack = {
  id: 'sampler-piano',
  name: 'Piano',
  routing: {
    input: {
      id: EInstrument.Sampler,
      label: 'in-piano',
      options: {
        baseUrl: './samples/SalamanderGP-V3_48khz24bit/',
        urls: {
          A0: 'A0v1.wav',
          C1: 'C1v1.wav',
          'D#1': 'Ds1v1.wav',
          'F#1': 'Fs1v1.wav',
          A1: 'A1v1.wav',
          C2: 'C2v1.wav',
          'D#2': 'Ds2v1.wav',
          'F#2': 'Fs2v1.wav',
          A2: 'A2v1.wav',
          C3: 'C3v1.wav',
          'D#3': 'Ds3v1.wav',
          'F#3': 'Fs3v1.wav',
          A3: 'A3v1.wav',
          C4: 'C4v1.wav',
          'D#4': 'Ds4v1.wav',
          'F#4': 'Fs4v1.wav',
          A4: 'A4v1.wav',
          C5: 'C5v1.wav',
          'D#5': 'Ds5v1.wav',
          'F#5': 'Fs5v1.wav',
          A5: 'A5v1.wav',
          C6: 'C6v1.wav',
          'D#6': 'Ds6v1.wav',
          'F#6': 'Fs6v1.wav',
          A6: 'A6v1.wav',
          C7: 'C7v1.wav',
          'D#7': 'Ds7v1.wav',
          'F#7': 'Fs7v1.wav',
          A7: 'A7v1.wav',
          C8: 'C8v1.wav',
        },
        volume: -40,
        // fadeIn: 0.01,
        // fadeOut: 0.01,
        // curve: 'linear',
      },
      parts: [
        {
          label: 'p1-sampler-pno',
          notes: [
            ['A4', 'D4', 'F4'],
            [],
            [],
            [],

            ['A4', 'D4', 'F4'],
            [],
            [],
            [],

            ['A4', 'D4', 'F4'],
            [],
            [],
            [],

            ['A4', 'D4', 'F4'],
            [],
            [],
            [],
          ],
        },
        {
          label: 'p2-sampler-pno',
          notes: [
            ['A4', 'D4', 'F4'],
            [],
            [],
            [],

            ['A4', 'D4', 'F4'],
            [],
            [],
            [],

            ['A4', 'D4', 'F4'],
            [],
            [],
            [],

            ['A4', 'D4', 'F4'],
            [],
            [],
            [],
          ],
        },
      ],
    },
    output: 'master',
  },
  type: ETrackType.Sampler,
};

// --------- Channels
/*** @Channel */
const DEFAULT_CHANNEL_DRUMS: IChannel = {
  id: 'ch-drums',
  label: 'Drums',
  routing: {
    input: '(drums)',
    output: 'master',
  },
  options: {
    channelCount: 1,
    mute: false,
    pan: 0,
    solo: false,
    volume: 0,
  },
};
/*** @Channel */
const DEFAULT_CHANNEL_MASTER: IChannel = {
  id: 'master',
  label: 'Master',
  routing: { input: '(all)', output: 'Stereo out' },
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
  DEFAULT_TRACK_AUDIO,
  DEFAULT_TRACK_SAMPLER,
  DEFAULT_TRACK_PIANO,
  DEFAULT_TRACK_INSTRUMENT_BASS,
  // DEFAULT_TRACK_PLAYERS,
  // DEFAULT_TRACK_BD,
  // DEFAULT_TRACK_SD,
  // DEFAULT_TRACK_OH,
  // DEFAULT_TRACK_HI_TOM,
  // DEFAULT_TRACK_MI_TOM,
  // DEFAULT_TRACK_LO_TOM,
  DEFAULT_CHANNEL_DRUMS,
  DEFAULT_CHANNEL_MASTER,
};

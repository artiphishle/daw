import t from "@/app/core/i18n";

import Sampler from "../instruments/sampler/Sampler";

import { EInstrument } from "@/app/core/hooks/useProjectContext";
import { ETrackType, type ITrack } from "@/app/types/daw";
import type {
  Instrument,
  InstrumentOptions,
} from "tone/build/esm/instrument/Instrument";
import { type ChannelOptions, type SamplerOptions, getContext } from "tone";
import type { RecursivePartial } from "tone/build/esm/core/util/Interface";
import type { IWaveForm } from "@/app/components/track/WaveForm";

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
 * TRACKS
 */

// AUDIO
const DEFAULT_TRACK_AUDIO: ITrack<IWaveForm, undefined> = {
  id: "track-audio-halloween",
  name: "Halloween",
  routing: {
    input: {
      id: "track-audio-input",
      instrument: undefined,
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

// DRUMS
const DEFAULT_TRACK_INSTRUMENT_BD: ITrack<
  RecursivePartial<InstrumentOptions>,
  typeof Instrument | null
> = {
  id: "track-midi-bd",
  name: "BD",
  routing: {
    input: {
      id: EInstrument.BaseDrum,
      instrument: null,
      label: EInstrument.BaseDrum,
      options: {},
      events: [
        { note: "C1", duration: "48i", time: "0i" },
        { note: "C1", duration: "48i", time: `${TICKS_PER_16N * 6}i` },
        { note: "C1", duration: "48i", time: `${TICKS_PER_16N * 8}i` },
        { note: "C1", duration: "48i", time: `${TICKS_PER_16N * 10}i` },
        { note: "C1", duration: "48i", time: `${TICKS_PER_16N * 16}i` },
        { note: "C1", duration: "48i", time: `${TICKS_PER_16N * 24}i` },
      ],
    },
    output: "drums",
  },
  type: ETrackType.Instrument,
};
const DEFAULT_TRACK_INSTRUMENT_SD: ITrack<
  RecursivePartial<InstrumentOptions>,
  typeof Instrument | null
> = {
  id: "track-instrument-sd",
  name: "SD",
  routing: {
    input: {
      id: EInstrument.SnareDrum,
      instrument: null,
      label: EInstrument.SnareDrum,
      options: {},
      events: [
        { note: "D1", duration: "24i", time: `${TICKS_PER_16N * 4}i` },
        { note: "D1", duration: "24i", time: `${TICKS_PER_16N * 12}i` },
        { note: "D1", duration: "24i", time: `${TICKS_PER_16N * 20}i` },
        { note: "D1", duration: "24i", time: `${TICKS_PER_16N * 28}i` },
      ],
    },
    output: "drums",
  },
  type: ETrackType.Instrument,
};
const DEFAULT_TRACK_INSTRUMENT_CHH: ITrack<
  RecursivePartial<InstrumentOptions>,
  typeof Instrument | null
> = {
  id: "track-instrument-chh",
  name: "CHH",
  routing: {
    input: {
      events: [
        { note: "F#1", duration: "24i", time: "0i" },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 1}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 2}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 3}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 4}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 5}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 6}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 7}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 8}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 9}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 10}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 11}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 12}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 13}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 14}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 15}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 16}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 17}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 18}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 19}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 20}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 21}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 22}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 23}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 24}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 25}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 26}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 27}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 28}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 29}i` },
        { note: "F#1", duration: "24i", time: `${TICKS_PER_16N * 30}i` },
      ],
      instrument: null,
      label: EInstrument.ClosedHiHat,
      options: {},
      id: EInstrument.ClosedHiHat,
    },
    output: "drums",
  },
  type: ETrackType.Instrument,
};

// BASS
const DEFAULT_TRACK_INSTRUMENT_BASS: ITrack<
  RecursivePartial<InstrumentOptions>,
  typeof Instrument | null
> = {
  id: "track-instrument-bass",
  name: "Bass",
  routing: {
    input: {
      id: EInstrument.BassSynth,
      instrument: null,
      label: EInstrument.BassSynth,
      options: { volume: -24 },
      events: [
        { note: "A1", duration: `${4 * 48}i`, time: "0i" },
        { note: "D#2", duration: `${1 * 48}i`, time: `${TICKS_PER_16N * 14}i` },
        { note: "D2", duration: `${4 * 48}i`, time: `${TICKS_PER_16N * 16}i` },
        { note: "B#1", duration: `${1 * 48}i`, time: `${TICKS_PER_16N * 30}i` },
      ],
    },
    output: "mixbus",
  },
  type: ETrackType.Instrument,
};

// SAMPLER
const DEFAULT_TRACK_SAMPLER: ITrack<
  Partial<SamplerOptions>,
  typeof Sampler | null
> = {
  id: "track-sampler",
  name: "Sampler",
  routing: {
    input: {
      id: EInstrument.Sampler,
      instrument: null,
      label: EInstrument.Sampler,
      options: {
        baseUrl: "./samples/WaveAlchemy/wa_808_tape/",
        urls: { C3: "wa_808tape_kick_01_sat.wav" },
      },
      events: [
        { note: "D1", duration: "24i", time: `${TICKS_PER_16N * 4}i` },
        { note: "D1", duration: "24i", time: `${TICKS_PER_16N * 5}i` },
        { note: "D1", duration: "24i", time: `${TICKS_PER_16N * 6}i` },
        { note: "D1", duration: "24i", time: `${TICKS_PER_16N * 7}i` },
        { note: "D3", duration: "24i", time: `${TICKS_PER_16N * 25}i` },
        { note: "D4", duration: "24i", time: `${TICKS_PER_16N * 26}i` },
      ],
    },
    output: "mixbus",
  },
  type: ETrackType.Instrument,
};

// GROUP
const DEFAULT_GROUP_DRUMS: ITrack<ChannelOptions, null> = {
  id: "track-group-drums",
  type: ETrackType.Group,
  name: "Drums",
  routing: {
    input: {
      id: "track-group-drums-input",
      instrument: null,
      label: "Drums",
      options: {
        volume: -12,
        pan: 0,
        solo: false,
        mute: false,
        channelCount: 1,
        context: getContext(),
      },
    },
    output: "mixbus",
  },
};
const DEFAULT_GROUP_MIXBUS: ITrack<ChannelOptions, null> = {
  id: "mixbus",
  name: "Mixbus",
  routing: {
    input: {
      id: "mixbus-input",
      instrument: null,
      label: "All",
      options: {
        volume: 0,
        pan: 0,
        solo: false,
        mute: false,
        channelCount: 1,
        context: getContext(),
      },
      events: [],
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
  DEFAULT_TRACK_AUDIO,
  DEFAULT_TRACK_INSTRUMENT_BD,
  DEFAULT_TRACK_INSTRUMENT_SD,
  DEFAULT_TRACK_INSTRUMENT_CHH,
  DEFAULT_TRACK_INSTRUMENT_BASS,
  //
  DEFAULT_TRACK_SAMPLER,
  //
  DEFAULT_GROUP_DRUMS,
  DEFAULT_GROUP_MIXBUS,
};

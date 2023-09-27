import t from "@/app/core/i18n";

import { EInstrument } from "@/app/core/hooks/useProjectContext";
import { ETrackType, ITrack } from "@/app/types/daw";

/**
 * GENERAL
 */
const DEFAULT_BPM = 120;
const DEFAULT_CLEF = "C";
const DEFAULT_MEASURE_COUNT = 2;
const DEFAULT_NAME = t("untitled");
const DEFAULT_OFFSET_LEFT = 185;
const DEFAULT_POSITION = "0:0:0";
const DEFAULT_QUANTIZATION = 8;
const DEFAULT_SWING = 0;
const DEFAULT_SWING_SUBDIVISION = "8n";

/**
 * TRACKS
 */

// TIME TODO: it's a normal component
const DEFAULT_TRACK_TIME: Pick<ITrack, "id" | "type"> = {
  id: "track-time",
  type: ETrackType.Time,
};

// AUDIO
const DEFAULT_AUDIO_TRACK: ITrack = {
  id: "track-audio-halloween",
  name: "Halloween",
  url: "/halloween.mp3",
  routing: {
    input: { id: "track-audio-input", label: "Audio" },
    output: "mixbus",
  },
  type: ETrackType.Audio,
};
const DEFAULT_ACTIVE_TRACK_ID = DEFAULT_AUDIO_TRACK.id;
const TICKS_PER_16N = 48;

// DRUMS
const DEFAULT_MIDI_BD_TRACK: ITrack = {
  id: "track-midi-bd",
  name: "BD",
  routing: {
    input: {
      id: EInstrument.BaseDrum,
      label: EInstrument.BaseDrum,
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
  type: ETrackType.Midi,
};
const DEFAULT_MIDI_SD_TRACK: ITrack = {
  id: "track-midi-sd",
  name: "SD",
  routing: {
    input: {
      id: EInstrument.SnareDrum,
      label: EInstrument.SnareDrum,
      events: [
        { note: "D1", duration: "24i", time: `${TICKS_PER_16N * 4}i` },
        { note: "D1", duration: "24i", time: `${TICKS_PER_16N * 12}i` },
        { note: "D1", duration: "24i", time: `${TICKS_PER_16N * 20}i` },
        { note: "D1", duration: "24i", time: `${TICKS_PER_16N * 28}i` },
      ],
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
      label: EInstrument.ClosedHiHat,
      id: EInstrument.ClosedHiHat,
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
      id: EInstrument.BassSynth,
      label: EInstrument.BassSynth,
      events: [
        { note: "A1", duration: `${4 * 48}i`, time: "0i" },
        { note: "D#2", duration: `${1 * 48}i`, time: `${TICKS_PER_16N * 14}i` },
        { note: "D2", duration: `${4 * 48}i`, time: `${TICKS_PER_16N * 16}i` },
        { note: "B#1", duration: `${1 * 48}i`, time: `${TICKS_PER_16N * 30}i` },
      ],
    },
    output: "mixbus",
  },
  type: ETrackType.Midi,
};

// SAMPLER
const DEFAULT_MIDI_SAMPLER_TRACK: ITrack = {
  id: "track-midi-sampler",
  name: "Sampler",
  routing: {
    input: {
      id: EInstrument.SamPlay,
      urls: { C2: "/samples/808/kick.wav" },
      label: EInstrument.SamPlay,
      events: [{ note: "C3", duration: `${48}i`, time: "0i" }],
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
      id: "track-group-drums-input",
      label: "Drums",
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
  DEFAULT_TRACK_TIME,
  DEFAULT_AUDIO_TRACK,
  DEFAULT_MIDI_BD_TRACK,
  DEFAULT_MIDI_SD_TRACK,
  DEFAULT_MIDI_CHH_TRACK,
  DEFAULT_MIDI_BASS_TRACK,
  DEFAULT_MIDI_SAMPLER_TRACK,
  //
  DEFAULT_GROUP_DRUMS,
  DEFAULT_GROUP_MIXBUS,
};

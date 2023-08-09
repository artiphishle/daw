import { Envelope, Oscillator, Synth } from "tone";
import type { OmniOscillatorType } from "tone/build/esm/source/oscillator/OscillatorInterface";

import t from "../i18n";

import AudioTrack from "@/app/components/tracks/AudioTrack";
import MidiTrack from "@/app/components/tracks/MidiTrack";
import TimeTrack from "@/app/components/tracks/TimeTrack";
import StepSequencer from "@/app/components/tracks/StepSequencer";

import {
  ETrackType,
  type IAudioTrackConfig,
  type IMidiTrackConfig,
  type IStepSequencerTrackConfig,
  type ITrack,
} from "@/app/components/tracks/types";
import type { IMixerConfig } from "@/app/components/Mixer";
import type { IConfig } from "./types";

const DEFAULT_MIXER: IMixerConfig = {
  visibility: {
    [ETrackType.Audio]: true,
    [ETrackType.Midi]: true,
  },
};

function getDefaultSynth(type: OscillatorType) {
  const envelope = new Envelope({
    attack: 0.01,
    decay: 0.01,
    sustain: 0.01,
    release: 0.01,
  });

  return new Synth({ oscillator: { type }, envelope }).toDestination();
}

const TRACK_MAP = new Map([
  [ETrackType.Audio, AudioTrack],
  [ETrackType.Midi, MidiTrack],
  [ETrackType.StepSequencer, StepSequencer],
  [ETrackType.Time, TimeTrack],
]);

const DEFAULT_INACTIVE_STEP = { key: "C1", active: false };

const DEFAULT_AUDIO_TRACK: ITrack<IAudioTrackConfig> = {
  type: ETrackType.Audio,
};
const DEFAULT_MIDI_TRACK: ITrack<IMidiTrackConfig> = { type: ETrackType.Midi };
const DEFAULT_STEP_SEQUENCER: ITrack<IStepSequencerTrackConfig> = {
  type: ETrackType.StepSequencer,
  config: {
    tracks: [
      {
        instrument: getDefaultSynth("sawtooth"),
        name: "Kick",
        steps: [
          { key: "C1", active: true },
          { ...DEFAULT_INACTIVE_STEP },
          { ...DEFAULT_INACTIVE_STEP },
          { ...DEFAULT_INACTIVE_STEP },

          { ...DEFAULT_INACTIVE_STEP },
          { ...DEFAULT_INACTIVE_STEP },
          { ...DEFAULT_INACTIVE_STEP },
          { ...DEFAULT_INACTIVE_STEP },
        ],
      },
      {
        instrument: getDefaultSynth("sine"),
        name: "Snare",
        steps: [
          { ...DEFAULT_INACTIVE_STEP },
          { ...DEFAULT_INACTIVE_STEP },
          { key: "C2", active: true },
          { ...DEFAULT_INACTIVE_STEP },

          { ...DEFAULT_INACTIVE_STEP },
          { ...DEFAULT_INACTIVE_STEP },
          { ...DEFAULT_INACTIVE_STEP },
          { ...DEFAULT_INACTIVE_STEP },
        ],
      },
      {
        instrument: getDefaultSynth("triangle"),
        name: "Hihat",
        steps: [
          { ...DEFAULT_INACTIVE_STEP },
          { ...DEFAULT_INACTIVE_STEP },
          { ...DEFAULT_INACTIVE_STEP },
          { ...DEFAULT_INACTIVE_STEP },

          { key: "C4", active: true },
          { ...DEFAULT_INACTIVE_STEP },
          { key: "C4", active: true },
          { ...DEFAULT_INACTIVE_STEP },
        ],
      },
    ],
  },
};

/**
 * Default project config
 */
const DEFAULT: IConfig = {
  mixer: { ...DEFAULT_MIXER },
  name: t("untitled"),
  /**
   * Default Track Config
   * TODO config track routing (to default stereo out ATM)
   */
  tracks: [
    // Step Sequencer
    { ...DEFAULT_STEP_SEQUENCER },

    // Time Indicator for tracks below
    { type: ETrackType.Time },

    // Midi tracks
    { ...DEFAULT_MIDI_TRACK },
    { ...DEFAULT_MIDI_TRACK },

    // Audio track
    { ...DEFAULT_AUDIO_TRACK },
  ],
};

export {
  DEFAULT,
  DEFAULT_AUDIO_TRACK,
  DEFAULT_MIDI_TRACK,
  DEFAULT_MIXER,
  DEFAULT_STEP_SEQUENCER,
  TRACK_MAP,
};

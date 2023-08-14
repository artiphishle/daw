import { type PropsWithoutRef } from "react";
import {
  BitCrusher,
  Chorus,
  Compressor,
  Delay,
  EQ3,
  Freeverb,
  Gain,
  Limiter,
  MetalSynth,
  MultibandCompressor,
  NoiseSynth,
  PingPongDelay,
  Reverb,
  Synth,
} from "tone";

type TTrackConfig =
  | IAudioTrackConfig
  | IEffectTrackConfig
  | IMidiTrackConfig
  | IStepSequencerTrackConfig
  | ITimeTrackConfig;

enum ETrackType {
  Audio,
  Effect,
  Midi,
  StepSequencer,
  Time,
}

interface IAudioTrackConfig {
  name: string;
}
interface IEffectTrackConfig {
  effect:
    | BitCrusher
    | Chorus
    | Compressor
    | Delay
    | EQ3
    | Gain
    | Limiter
    | MultibandCompressor
    | PingPongDelay
    | Reverb
    | Freeverb;
  name: string;
}
interface IMidiTrackConfig {}
interface IStepSequencerTrackConfig {
  tracks: {
    instrument: Synth | MetalSynth | NoiseSynth;
    name: string;
    steps: { key?: string; active: boolean }[];
  }[];
}
interface ITimeTrackConfig {}
interface ITrack<T> {
  type: ETrackType;
  config?: PropsWithoutRef<T>;
}

export type { TTrackConfig };
export type {
  IAudioTrackConfig,
  IEffectTrackConfig,
  IMidiTrackConfig,
  IStepSequencerTrackConfig,
  ITimeTrackConfig,
  ITrack,
};

export { ETrackType };

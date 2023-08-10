import { type PropsWithoutRef } from "react";
import {
  BitCrusher,
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
  Midi,
  StepSequencer,
  Time,
}

interface IAudioTrackConfig {}
interface IEffectTrackConfig {
  effect:
    | Compressor
    | EQ3
    | Limiter
    | MultibandCompressor
    | Gain
    | BitCrusher
    | Reverb
    | Freeverb
    | Delay
    | PingPongDelay;
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
  IMidiTrackConfig,
  IStepSequencerTrackConfig,
  ITimeTrackConfig,
  ITrack,
};

export { ETrackType };

import { type PropsWithoutRef } from "react";
import { Synth } from "tone";

type TTrackConfig =
  | IAudioTrackConfig
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
interface IMidiTrackConfig {}
interface IStepSequencerTrackConfig {
  tracks: {
    instrument: Synth;
    name: string;
    steps: { key: string; active: boolean }[];
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

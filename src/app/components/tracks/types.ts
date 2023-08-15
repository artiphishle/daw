type TTrackConfig = IAudioTrackConfig | IMidiTrackConfig | ITimeTrackConfig;

enum ETrackType {
  Audio,
  Midi,
  Time,
}

interface ITrack<T> {
  type: ETrackType;
  config?: T;
}
interface IAudioTrackConfig {}
interface IMidiTrackConfig {}
interface ITimeTrackConfig {}

export type { TTrackConfig };
export type { IAudioTrackConfig, IMidiTrackConfig, ITimeTrackConfig, ITrack };

export { ETrackType };

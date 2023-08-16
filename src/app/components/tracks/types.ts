type TTrackConfig = IAudioTrackConfig | IMidiTrackConfig | ITimeTrackConfig;

enum ETrackType {
  Audio,
  Midi,
  Time,
}

interface ITrack {
  name: string;
  type: ETrackType;
}
interface IAudioTrackConfig extends ITrack {}
interface IMidiTrackConfig extends ITrack {
  plugins?: any[];
}
interface ITimeTrackConfig extends ITrack {}

export type { TTrackConfig };
export type { IAudioTrackConfig, IMidiTrackConfig, ITimeTrackConfig, ITrack };

export { ETrackType };

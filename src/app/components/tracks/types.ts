enum ETrackType {
  Audio,
  Midi,
  Time,
}

interface ITrack {
  name: string;
  type: ETrackType;
}

export { ETrackType };
export type { ITrack };

import { UniqueIdentifier } from "@dnd-kit/core";

enum ETrackType {
  Audio,
  Midi,
  Time,
}

interface ITrack {
  id: UniqueIdentifier;
  name: string;
  type: ETrackType;
}

export { ETrackType };
export type { ITrack };

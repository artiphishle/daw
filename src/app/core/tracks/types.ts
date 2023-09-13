import { UniqueIdentifier } from "@dnd-kit/core";

enum ETrackType {
  Audio = "audio",
  Midi = "midi",
  Time = "time",
}

interface ITrack {
  id: UniqueIdentifier;
  name: string;
  type: ETrackType;
}

export { ETrackType };
export type { ITrack };

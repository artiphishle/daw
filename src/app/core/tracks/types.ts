import { UniqueIdentifier } from "@dnd-kit/core";
import { type MouseEvent } from "react";

enum ETrackType {
  Audio = "audio",
  Group = "group",
  Midi = "midi",
  Time = "time",
}

interface ITrackRouting {
  input: {
    instrument?: any;
    label: string;
    onClick: (event: MouseEvent<HTMLDivElement>) => void;
  };
  output: string | null;
}

// TODO TimeTrack shouldn't have 'routing'
interface ITrack {
  url?: string;
  id: UniqueIdentifier;
  instrument?: any;
  name: string;
  routing: ITrackRouting;
  type: ETrackType;
}

export { ETrackType };
export type { ITrack };

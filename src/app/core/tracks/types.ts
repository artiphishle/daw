import { type MouseEvent } from "react";
import type { TNote } from "../config/types";
import type { UniqueIdentifier } from "@dnd-kit/core";

enum ETrackType {
  Audio = "audio",
  Group = "group",
  Midi = "midi",
  Time = "time",
}

interface IRoutingInput {
  id: UniqueIdentifier;
  instrument: any;
  label: string;
  notes: TNote[];
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}
interface ITrackRouting {
  input: IRoutingInput;
  output: string | null;
}

export { ETrackType };
export type { ITrackRouting };

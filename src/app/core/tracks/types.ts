import type { MouseEvent } from "react";
import type { TNote } from "@/app/core/config/types";

enum ETrackType {
  Audio = "audio",
  Group = "group",
  Midi = "midi",
  Time = "time",
}

interface IRoutingInput {
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

import type { MouseEvent } from "react";
import type {
  Note as TNote,
  Ticks as TTicks,
  Ticks,
} from "tone/build/esm/core/type/Units";

enum ETrackType {
  Audio = "audio",
  Group = "group",
  Midi = "midi",
  Time = "time",
}

interface IMidiEvent {
  duration: string; // in ticks, e.g. "48i"
  note: TNote;
  time: string; // in ticks, e.g. "48i"
}
interface IRoutingInput {
  instrument: any;
  label: string;
  events: IMidiEvent[];
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}
interface ITrackRouting {
  input: IRoutingInput;
  output: string | null;
}

export { ETrackType };
export type { IMidiEvent, ITrackRouting };

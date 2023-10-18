import type { Note as TNote } from "tone/build/esm/core/type/NoteUnits";
import type { Time as TTime } from "tone/build/esm/core/type/Units";

export interface IMidiEventPos {
  readonly n: TNote | null;
  readonly l: number; // left
  readonly t: number; // bottom count (top)
  readonly w: number; // width
  readonly h: number; // height
  readonly v: number; // velocity
}

export interface IMidiEvent {
  readonly n: TNote | null;
  readonly d?: TTime;
  readonly v?: number;
}

export interface IMidiSequence {
  readonly label: string;
  readonly events: Array<IMidiEvent | IMidiEvent[]>;
}

export type TMidiPatternPos = IMidiEventPos[];
export type TMidiPartPos = TMidiPatternPos[];

export type TMidiPart = {
  readonly label: string;
  readonly sequences: IMidiSequence[];
};

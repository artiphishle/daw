import type { Note, Note as TNote } from "tone/build/esm/core/type/NoteUnits";
import type { Time as TTime } from "tone/build/esm/core/type/Units";

export interface IMidiEventPos {
  readonly n: TNote | null;
  readonly l: number; // left
  readonly t: number; // bottom count (top)
  readonly w: number; // width
  readonly h: number; // height
  readonly v: number; // velocity
}

export interface IPlayerEvent {
  readonly note: Note | null;
}

export interface IMidiPart {
  readonly label: string;
  readonly length: string;
  readonly events: IPlayerEvent[];
}

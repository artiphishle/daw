import type { Note, Note as TNote } from 'tone/build/esm/core/type/NoteUnits';

export interface IMidiEventPos {
  readonly n: TNote | null;
  readonly l: number; // left
  readonly t: number; // bottom count (top)
  readonly w: number; // width
  readonly h: number; // height
  readonly v: number; // velocity
}

export interface IPlayerEvent {
  readonly note: Note;
  readonly duration: string;
  readonly x: number;
}

export interface IMidiPart {
  readonly label: string;
  readonly times?: number[];
  readonly notes?: TNote[][];
}

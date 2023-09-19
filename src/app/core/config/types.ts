import type { IMixer } from "@/app/components";
import type { Note } from "tone/build/esm/core/type/NoteUnits";
import type { ITrack } from "@/app/core/tracks/Track";

type TNote = Note | undefined;

interface IProjectSettings {
  bpm: number;
  clef: string;
  measureCount: number;
  mixer: IMixer;
  name: string;
  position: string;
  quantization: number;
  tracks: ITrack[];
}

export type { TNote };
export type { IProjectSettings };

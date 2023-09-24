import type { Note } from "tone/build/esm/core/type/NoteUnits";
import type { Subdivision as TSubdivision } from "tone/build/esm/core/type/Units";
import type { UniqueIdentifier } from "@dnd-kit/core";
import type { ITrack } from "@/app/components/track/Track";

interface IProjectContext {
  activeTrackId: UniqueIdentifier;
  bpm: number;
  clef: string;
  measureCount: number;
  name: string;
  position: string;
  quantization: number;
  swing: number;
  swingSubdivision: TSubdivision;
  tracks: ITrack[];
}

export type { IProjectContext };

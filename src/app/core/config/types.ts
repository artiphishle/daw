import type { Subdivision } from "tone/build/esm/core/type/Units";
import type { UniqueIdentifier } from "@dnd-kit/core";
import type { ITrack } from "@/app/types/daw";

interface IProjectContext {
  activeTrackId: UniqueIdentifier;
  bpm: number;
  clef: string;
  measureCount: number;
  name: string;
  position: string;
  quantization: number;
  swing: number;
  swingSubdivision: Subdivision;
  tracks: ITrack[];
}

export type { IProjectContext };

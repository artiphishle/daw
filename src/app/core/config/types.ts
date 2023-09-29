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
  states: Record<string, number>;
  swing: number;
  swingSubdivision: Subdivision;
  tracks: ITrack<any, any>[];
}

export type { IProjectContext };

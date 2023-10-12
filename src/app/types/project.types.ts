import type { Subdivision } from "tone/build/esm/core/type/Units";
import type { UniqueIdentifier } from "@dnd-kit/core";
import type { ITrack } from "@/types/track";

enum EPortal {
  Instruments = "portal-instruments",
}
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
  tracks: ITrack[];
}

export { EPortal };
export type { IProjectContext };

import type { Subdivision } from "tone/build/esm/core/type/Units";
import type { UniqueIdentifier } from "@dnd-kit/core";
import type { ITrack } from "app/common/types/track.types";
import type { IChannel } from "./channel.types";

export enum ETransportState {
  Paused = "paused",
  Started = "started",
  Stopped = "stopped",
}
export enum EPortal {
  Instruments = "portal-instruments",
}
export interface IProjectContext {
  activeTrackId: UniqueIdentifier;
  bpm: number;
  clef: string;
  //
  channels: IChannel[];
  tracks: ITrack[];
  //
  measureCount: number;
  name: string;
  position: string;
  quantization: number;
  states: Record<string, number>;
  swing: number;
  swingSubdivision: Subdivision;
}

export interface ISignalFlow {
  in: UniqueIdentifier;
  out: UniqueIdentifier;
  inserts?: UniqueIdentifier[];
  sends?: UniqueIdentifier[];
}

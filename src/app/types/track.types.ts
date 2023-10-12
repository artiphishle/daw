import type { UniqueIdentifier } from "@dnd-kit/core";
import type { IInstrument, TInputOptions } from "@/types/instrument";
import type { TMidiPart } from "@/types/midi";

export enum ETrackType {
  Audio = "audio",
  Group = "group",
  Instrument = "instrument",
  Player = "player",
  Players = "players",
  Sampler = "sampler",
}

export interface IRoutingInput {
  id: UniqueIdentifier;
  instrument?: IInstrument;
  label: string;
  options: TInputOptions;
  parts?: TMidiPart[];
}
export interface ITrackRouting {
  input: IRoutingInput;
  output?: string;
}
export interface ITrack {
  id: UniqueIdentifier;
  name: string;
  routing: ITrackRouting;
  type: ETrackType;
  className?: string;
}

import type { UniqueIdentifier } from "@dnd-kit/core";
import type {
  IInstrument,
  TInputOptions,
} from "app/common/types/instrument.types";
import type { TMidiPart } from "app/common/types/midi.types";

export enum ETrackType {
  Audio = "audio",
  Channel = "channel",
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

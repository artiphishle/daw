import type { FC, MouseEvent, ReactNode } from "react";
import type { Note, Subdivision } from "tone/build/esm/core/type/Units";
import type { UniqueIdentifier } from "@dnd-kit/core";
import type { TIcon } from "@/app/core/config/icons";
import type { RecursivePartial } from "tone/build/esm/core/util/Interface";
import type {
  ChannelOptions,
  MembraneSynth,
  MembraneSynthOptions,
  MetalSynth,
  MetalSynthOptions,
  MonoSynth,
  MonoSynthOptions,
  NoiseSynth,
  NoiseSynthOptions,
  Sampler,
  SamplerOptions,
  Synth,
  SynthOptions,
} from "tone";

/**
 * Types
 */
type TInstrumentOptions =
  | MetalSynthOptions
  | MembraneSynthOptions
  | MonoSynthOptions
  | NoiseSynthOptions
  | SynthOptions
  | SamplerOptions;

type TInstrument =
  | MembraneSynth
  | MetalSynth
  | MonoSynth
  | NoiseSynth
  | Sampler
  | Synth;

type TInputOptions =
  | RecursivePartial<TInstrumentOptions>
  | Partial<ChannelOptions>
  | { url?: string };

/**
 * Enums
 */
enum EEndpoint {
  Browser = "/api/browser",
  ProjectSettings = "/api/project/settings",
}
enum EInstrument {
  MembraneSynth = "MembraneSynth",
  MetalSynth = "MetalSynth",
  MonoSynth = "MonoSynth",
  NoiseSynth = "NoiseSynth",
  Synth = "Synth",
  Sampler = "Sampler",
}
enum EPortal {
  Instruments = "portal-instruments",
}
enum ETrackType {
  Audio = "audio",
  Group = "group",
  Instrument = "instrument",
  Sampler = "sampler",
}

/**
 * Interfaces
 */
interface IInstrument {
  Instrument: FC<any>;
  instrument: TInstrument;
  options: TInputOptions;
}
interface IMidiEvent {
  duration: string;
  note: Note;
  time: string;
}
interface IMixer {
  openInstrument: () => void;
}
interface ITrackConfig {
  Icon: TIcon;
  draw: (args: { [k: string]: any }) => ReactNode;
  onToggle?: (event: MouseEvent<HTMLDivElement>) => void;
  play?: ({
    instrument,
    label,
    notes,
  }: {
    instrument: IInstrument;
    label: string;
    notes: Note[];
  }) => void;
}
interface IRoutingInput {
  id: UniqueIdentifier;
  instrument?: IInstrument;
  label: string;
  options: TInputOptions;
  notes?: Note[];
  // events?: IMidiEvent[]
}
interface ITrackRouting {
  input: IRoutingInput;
  output?: string;
}
interface ITrack {
  id: UniqueIdentifier;
  name: string;
  routing: ITrackRouting;
  type: ETrackType;
  className?: string;
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

// Directory content
interface IDirItem {
  name: string;
  dirs?: IDirItem[];
}

export { EEndpoint, EInstrument, EPortal, ETrackType };
export type { TInputOptions, TInstrument };
export type {
  IDirItem,
  IInstrument,
  IMidiEvent,
  IMixer,
  IProjectContext,
  ITrack,
  ITrackConfig,
  ITrackRouting,
};

import type { UniqueIdentifier } from "@dnd-kit/core";
import type { MouseEvent, ReactNode } from "react";
import type { Note } from "tone/build/esm/core/type/Units";
import type { TIcon } from "@/app/core/config/icons";

/**
 * ENUMS
 */

enum ETrackType {
  Audio = "audio",
  Group = "group",
  Instrument = "instrument",
  Sampler = "sampler",
}

enum EPortal {
  Instruments = "portal-instruments",
}

/**
 * MIDI
 */

interface IMidiEvent {
  duration: string;
  note: Note;
  time: string;
}

/**
 * Mixer
 */

interface IMixer {
  openInstrument: () => void;
}

/**
 * Track
 */

interface ITrackConfig {
  Icon: TIcon;
  draw: (args: { [k: string]: any }) => ReactNode;
  onToggle?: (event: MouseEvent<HTMLDivElement>) => void;
  play?: ({
    instrument,
    label,
    notes,
  }: {
    instrument: any;
    label: string;
    notes: Note[];
  }) => void;
}

interface IRoutingInput<O, I> {
  id: UniqueIdentifier;
  instrument?: I;
  label: string;
  options: O;
  events?: IMidiEvent[];
}

interface ITrackRouting<O, I> {
  input: IRoutingInput<O, I>;
  output?: string;
}
interface ITrack<O, I> {
  id: UniqueIdentifier;
  name: string;
  routing: ITrackRouting<O, I>;
  type: ETrackType;
  className?: string;
}

/**
 * API Browser Tree
 */
interface ITree {
  name: string;
  items?: ITree[];
}

export { EPortal, ETrackType };
export type { IMidiEvent, IMixer, ITrack, ITrackConfig, ITrackRouting, ITree };

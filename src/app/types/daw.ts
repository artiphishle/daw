import type { UniqueIdentifier } from "@dnd-kit/core";
import type { MouseEvent, ReactNode } from "react";
import type { Note } from "tone/build/esm/core/type/Units";
import type { TIcon } from "@/app/core/config/icons";

/**
 * Portals
 */

enum EPortal {
  Instruments = "portal-instruments",
}

/**
 * API
 */

enum EEndpoint {
  Browser = "/api/browser",
  ProjectContext = "/api/project/settings",
}

/**
 * Mixer
 */

export interface IMixer {
  settings: {
    [k in ETrackType]: {
      bg: string;
      text: string;
      label: string;
      visible: boolean;
    };
  };
}

/**
 * Track
 */

enum ETrackType {
  Audio = "audio",
  Group = "group",
  Instrument = "instrument",
  Sampler = "sampler",
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
    instrument: any;
    label: string;
    notes: Note[];
  }) => void;
}

interface ITrack<O, I> {
  id: UniqueIdentifier;
  name: string;
  routing: ITrackRouting<O, I>;
  type: ETrackType;
  className?: string;
}
interface ITrackRouting<O, I> {
  input: IRoutingInput<O, I>;
  output?: string;
}
interface IRoutingInput<O, I> {
  id: UniqueIdentifier;
  instrument: I;
  label: string;
  options: O;
  events?: IMidiEvent[];
}

/**
 * MIDI
 */

interface IMidiEvent {
  duration: string;
  note: Note;
  time: string;
}

export { EEndpoint, EPortal, ETrackType };
export type { IMidiEvent, ITrack, ITrackConfig, ITrackRouting };

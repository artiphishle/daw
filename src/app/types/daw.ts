import type { UniqueIdentifier } from "@dnd-kit/core";
import { MouseEvent, ReactNode } from "react";
import type { Note } from "tone/build/esm/core/type/Units";
import type {
  Instrument,
  InstrumentOptions,
} from "tone/build/esm/instrument/Instrument";
import type { TIcon } from "@/app/core/config/icons";

/**
 * API
 */

enum EEndpoint {
  ProjectContext = "/api/project/settings",
}

/**
 * Mixer
 */

export interface IMixer {
  settings: {
    [k in Exclude<ETrackType, ETrackType.Time>]: {
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
  Midi = "midi",
  Time = "time",
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
interface ITrack {
  className?: string;
  id: UniqueIdentifier;
  routing: ITrackRouting;
  name: string;
  type: ETrackType;
  url?: string;
}
interface ITrackRouting {
  input: IRoutingInput;
  output?: string;
}
interface IRoutingInput {
  id: UniqueIdentifier;
  instrument?: Instrument<InstrumentOptions>;
  label: string;
  events?: IMidiEvent[];
  urls?: Record<string, string>;
}

/**
 * MIDI
 */

interface IMidiEvent {
  duration: string;
  note: Note;
  time: string;
}

export { EEndpoint, ETrackType };
export type { IMidiEvent, ITrack, ITrackConfig, ITrackRouting };

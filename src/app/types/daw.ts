import { EInstrument } from "../core/hooks/useProjectContext";
import type { MidiNote as TMidiNote } from "tone/build/esm/core/type/NoteUnits";
import type { TNote } from "../core/config/types";

/**
 * SONG
 */

/**
 * INSTRUMENT
 */
export interface IInstrument {
  type: EInstrument;
  notes?: TNote[];
  /** Should deprecate */
  options?: any;
  polyphony?: number;
  oscillator?: {
    type: "triangle" | "sine" | "square";
  };
  envelope?: {
    attack?: number;
    decay?: number;
    sustain?: number;
    release?: number;
  };
  samples?: {
    [key in TMidiNote]?: string;
  };
  mute?: boolean;
  solo?: boolean;
  /** TODO: Type properly and consider loading status */
  onLoad?: (buffers: any[]) => void;
}

interface InstrumentConsumerProps extends IInstrument {
  volume?: number;
  pan?: number;
  effectsChain?: React.ReactNode[];
  onInstrumentsUpdate?: Function;
}
interface IInstrumentConsumer {
  effectChain?: any;
}

export type { IInstrumentConsumer };

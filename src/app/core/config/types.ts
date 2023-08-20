import type { IMixerConfig } from "@/app/components/Mixer";
import type { IAudioTrackConfig } from "@/app/components/tracks/audio/types";
import type { IMidiTrackConfig } from "@/app/components/tracks/midi/types";
import type { ITimeTrackConfig } from "@/app/components/tracks/time/types";
import { Dispatch, SetStateAction } from "react";

type TTrackConfig = IAudioTrackConfig | IMidiTrackConfig | ITimeTrackConfig;

interface ITransportConfig {
  bpm: number;
  setBpm: Dispatch<SetStateAction<number>>;
  clef: string;
  setClef: Dispatch<SetStateAction<string>>;
  measureCount: number;
  setMeasureCount: Dispatch<SetStateAction<number>>;
  quantization: number;
  setQuantization: Dispatch<SetStateAction<number>>;
}
interface IArrangerConfig {
  tracks: TTrackConfig[];
  setTracks: Dispatch<SetStateAction<TTrackConfig[]>>;
}

interface IConfig {
  arranger: IArrangerConfig;
  mixer: IMixerConfig;
  name: string;
  transport: ITransportConfig;
}

export type { TTrackConfig };
export type { ITransportConfig, IConfig };

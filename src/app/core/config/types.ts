import type { IMixerConfig } from "@/app/components/Mixer";
import type { IAudioTrackConfig } from "@/app/components/tracks/audio/types";
import type { IMidiTrackConfig } from "@/app/components/tracks/midi/types";
import type { ITimeTrackConfig } from "@/app/components/tracks/time/types";

type TTrackConfig = IAudioTrackConfig | IMidiTrackConfig | ITimeTrackConfig;

interface ITransportConfig {
  bpm: number;
  clef: string;
  measureCount: number;
  quantization: number;
}
interface IConfig {
  mixer: IMixerConfig;
  name: string;
  tracks: TTrackConfig[];
  transport: ITransportConfig;
}

export type { TTrackConfig };
export type { ITransportConfig, IConfig };

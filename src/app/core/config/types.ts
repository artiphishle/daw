import type { IMixerConfig } from "@/app/components/Mixer";
import type { ITrack, TTrackConfig } from "@/app/components/tracks/types";

interface IConfig {
  mixer: IMixerConfig;
  name: string;
  tracks: ITrack<TTrackConfig>[];
  transport: {
    bpm: number;
    clef: string;
    measureCount: number;
  };
}

export type { IConfig };

import type { Dispatch, SetStateAction } from "react";
import type { IMixerConfig } from "@/app/components/Mixer";
import type { IAudioTrackConfig } from "@/app/components/tracks/audio/types";
import type { IMidiTrackConfig } from "@/app/components/tracks/midi/types";
import type { ITimeTrackConfig } from "@/app/components/tracks/time/types";

type TTrackConfig = IAudioTrackConfig | IMidiTrackConfig | ITimeTrackConfig;

interface IArrangerConfig {
  tracks: TTrackConfig[];
  setTracks: Dispatch<SetStateAction<TTrackConfig[]>>;
}

interface IConfig {
  arranger: IArrangerConfig;
  mixer: IMixerConfig;
  name: string;
}

export type { TTrackConfig };
export type { IConfig };

import type { IAudioTrackConfig } from "@/app/core/tracks/audio/types";
import type { IMidiTrack } from "@/app/core/tracks/midi/MidiTrack";
import type { ITimeTrackConfig } from "@/app/core/tracks/time/types";
import type { IMixer } from "@/app/components/Mixer";

type TTrackConfig = IAudioTrackConfig | IMidiTrack | ITimeTrackConfig;

interface IProjectSettings {
  bpm: number;
  clef: string;
  measureCount: number;
  mixer: IMixer;
  name: string;
  position: string;
  quantization: number;
  tracks: TTrackConfig[];
}

export type { IProjectSettings };
export type { TTrackConfig };

import type { IMixer } from "@/app/components";
import type { ITrack } from "../tracks/types";

interface IProjectSettings {
  bpm: number;
  clef: string;
  measureCount: number;
  mixer: IMixer;
  name: string;
  position: string;
  quantization: number;
  tracks: ITrack[];
}

export type { IProjectSettings };

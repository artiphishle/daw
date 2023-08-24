import type { IAudioTrackConfig } from "@/app/core/tracks/audio/types";
import type { IMidiTrackConfig } from "@/app/core/tracks/midi/types";
import type { ITimeTrackConfig } from "@/app/core/tracks/time/types";

type TTrackConfig = IAudioTrackConfig | IMidiTrackConfig | ITimeTrackConfig;

export type { TTrackConfig };

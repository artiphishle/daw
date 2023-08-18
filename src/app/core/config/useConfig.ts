import useSWR from "swr";

import t from "@/app/core/i18n";

import {
  DEFAULT_AUDIO_TRACK,
  DEFAULT_BPM,
  DEFAULT_CLEF,
  DEFAULT_MEASURE_COUNT,
  DEFAULT_MIDI_DRUM_TRACK,
  DEFAULT_MIDI_TRACK,
  DEFAULT_MIXER,
} from "@/app/core/config/constants";

import { ETrackType } from "@/app/components/tracks/types";
import type { IConfig } from "@/app/core/config/types";

export default function useConfig(loadProjectOrPreset?: IConfig) {
  return useSWR(
    "Config",
    () =>
      loadProjectOrPreset || {
        mixer: { ...DEFAULT_MIXER },
        name: t("untitled"),
        tracks: [
          { name: "", type: ETrackType.Time },
          { ...DEFAULT_MIDI_TRACK },
          { ...DEFAULT_MIDI_DRUM_TRACK },
          { ...DEFAULT_AUDIO_TRACK },
        ],
        transport: {
          bpm: DEFAULT_BPM,
          clef: DEFAULT_CLEF,
          measureCount: DEFAULT_MEASURE_COUNT,
        },
      }
  );
}

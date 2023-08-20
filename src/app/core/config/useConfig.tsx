import { useState } from "react";

import t from "@/app/core/i18n";

import {
  DEFAULT_BPM,
  DEFAULT_CLEF,
  DEFAULT_MEASURE_COUNT,
  DEFAULT_MIXER,
  DEFAULT_QUANTIZATION,
  DEFAULT_TRACKS,
} from "@/app/core/config/constants";
import { ErrorMessage } from "@/app/components/ui/message/Message";

import { IConfig } from "@/app/core/config/types";

export default function useConfig(loadProjectOrPreset?: IConfig) {
  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [clef, setClef] = useState(DEFAULT_CLEF);
  const [measureCount, setMeasureCount] = useState(DEFAULT_MEASURE_COUNT);
  const [quantization, setQuantization] = useState(DEFAULT_QUANTIZATION);
  const [tracks, setTracks] = useState(DEFAULT_TRACKS);

  const DEFAULT_CONFIG: IConfig = {
    arranger: { tracks, setTracks },
    mixer: { ...DEFAULT_MIXER },
    name: t("untitled"),
    transport: {
      bpm,
      setBpm,
      clef,
      setClef,
      measureCount,
      setMeasureCount,
      quantization,
      setQuantization,
    },
  };

  return loadProjectOrPreset || DEFAULT_CONFIG;
}

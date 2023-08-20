import { useState } from "react";
import useSWR from "swr";
import { LoaderIcon } from "lucide-react";

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

import type { IConfig } from "@/app/core/config/types";

export default function useConfig(loadProjectOrPreset?: IConfig) {
  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [clef, setClef] = useState(DEFAULT_CLEF);
  const [measureCount, setMeasureCount] = useState(DEFAULT_MEASURE_COUNT);
  const [quantization, setQuantization] = useState(DEFAULT_QUANTIZATION);

  const {
    data: config,
    error: configError,
    isLoading: configIsLoading,
  } = useSWR(
    "Config",
    () =>
      loadProjectOrPreset || {
        mixer: { ...DEFAULT_MIXER },
        name: t("untitled"),
        tracks: DEFAULT_TRACKS,
        transport: {
          bpm,
          setBpm,
          clef,
          setClef,
          measureCount,
          quantization,
          setQuantization,
          setMeasureCount,
        },
      }
  );

  const ConfigError = () => (
    <ErrorMessage title={t("errorUseConfig")} message={configError.message} />
  );

  const [error, setError] = useState(configError ? ConfigError : undefined);
  const [isLoading, setIsLoading] = useState(
    configIsLoading ? <LoaderIcon /> : undefined
  );

  return { config, error, isLoading };
}

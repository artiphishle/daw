import useSWR from "swr";

import { DEFAULT } from "./constants";

import type { IConfig } from "./types";

export default function useConfig(config?: IConfig) {
  function getConfig() {
    return config || DEFAULT;
  }
  const { data, error, isLoading } = useSWR("Config", getConfig);

  return { data, error, isLoading };
}

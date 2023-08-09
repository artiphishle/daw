import { useState } from "react";
import useSWR from "swr";

import { DEFAULT } from "./constants";

import type { IMixerConfig } from "@/app/components/Mixer";
import type { ITrack, TTrackConfig } from "@/app/components/tracks/types";
import type { IConfig } from "./types";

export default function useConfig(config?: IConfig) {
  // Whether to load a config or create a new project with default config
  function getConfig() {
    // const { tracks: t, mixer: m, name: n } = config || DEFAULT;
    return config || DEFAULT;
  }
  const { data, error, isLoading } = useSWR("Config", getConfig);
  /*
  const [tracks, setTracks] = useState<ITrack<TTrackConfig>[]>(t);
  const [name, setName] = useState<string>(n);
  const [mixer, setMixer] = useState<IMixerConfig>(m);
  */

  return { data, error, isLoading };
  /*
  return {
    // Mixer
    mixer,
    setMixer,

    // Name
    name,
    setName,

    // Tracks
    tracks,
    setTracks,
  };
  */
}

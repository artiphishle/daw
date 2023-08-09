"use client";

import { createElement, type PropsWithoutRef } from "react";

import useConfig from "./core/config/useConfig";
import { TRACK_MAP } from "./core/config/constants";
import Toolbar from "@/app/components/Toolbar";

import { ETrackType, type TTrackConfig } from "./components/tracks/types";
import Mixer from "./components/Mixer";

export default function Home() {
  const { data, error, isLoading } = useConfig();

  function createTrack(
    type: ETrackType,
    config: PropsWithoutRef<TTrackConfig> = {}
  ) {
    const Track = TRACK_MAP.get(type)!;
    return createElement(Track, { ...(config as any) });
  }

  return (
    <main className="h-full flex flex-1 flex-col justify-between">
      {/* Toolbar */}
      <Toolbar />

      {/* SnareDrum */}
      {/*<SnareDrum />*/}

      {/* Tracks */}
      <div className="flex-1">
        {data?.tracks.map(({ type, config = {} }, trackIndex) => {
          return createTrack(type, { ...config, key: `track-${trackIndex}` });
        })}
      </div>

      {/* Instrument */}
      {/* <PolySynth /> */}

      <Mixer />
    </main>
  );
}

"use client";

import { createElement, type PropsWithoutRef } from "react";
import { BeerIcon, CogIcon, FilesIcon, Lightbulb } from "lucide-react";

import Toolbar from "@/app/components/Toolbar";

import Mixer from "./components/Mixer";
import SnareDrum from "./components/instruments/drums/snareDrum/SnareDrum";
import Tabs from "./components/ui/tabs/Tabs";
import TabMenu from "./components/ui/tabs/TabMenu";
import TabContent from "./components/ui/tabs/TabContent";

import useConfig, { TRACK_MAP } from "./core/config/useConfig";
import { ETrackType, type TTrackConfig } from "./components/tracks/types";
import Piano from "./components/instruments/keys/Piano";
import PolySynth from "./components/instruments/synths/PolySynth";

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
    <main className="relative h-full flex flex-1 flex-col justify-between">
      {/* Toolbar */}
      <Toolbar />

      {/* SnareDrum */}
      {<SnareDrum />}

      {/* Tracks */}
      <div className="flex-1">
        {data?.tracks.map(({ type, config = {} }, trackIndex) => {
          return createTrack(type, { ...config, key: `track-${trackIndex}` });
        })}
      </div>

      <Tabs>
        <TabMenu
          items={[
            { Icon: FilesIcon, text: "Browser" },
            { Icon: BeerIcon, text: "Mixer" },
            { Icon: Lightbulb, text: "Effekte" },
            { Icon: CogIcon, text: "Settings" },
          ]}
        ></TabMenu>
        <TabContent>
          <Mixer />
        </TabContent>
      </Tabs>
      <PolySynth />
      <Piano />
    </main>
  );
}

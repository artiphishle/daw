"use client";

import * as Tone from "tone";
import {
  Attributes,
  createElement,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { BeerIcon, CogIcon, FilesIcon } from "lucide-react";

import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Mixer from "./components/Mixer";
import Toolbar from "@/app/components/Toolbar";

import useConfig, { TRACK_MAP } from "./core/config/useConfig";

import Piano from "./components/instruments/keys/Piano";
import SortableItem from "./components/SortableItem";

import Adsr from "./components/ui/audio/envelope/adsr/Adsr";
import Tabs from "./components/ui/tabs/Tabs";
import TabMenu from "./components/ui/tabs/TabMenu";
import TabContent from "./components/ui/tabs/TabContent";
import Dialog from "./components/ui/dialog/Dialog";
import { ETrackType } from "./components/tracks/types";
import useMusicTheory from "./core/hooks/useMusicTheory";
import PolySynth from "./components/instruments/synths/PolySynth";

export default function Home() {
  const [toneReady, setToneReady] = useState(false);
  const [trackIds, setTrackIds] = useState<string[]>([]);
  const { data = { tracks: [] }, error, isLoading } = useConfig();

  useEffect(() => {
    if (isLoading || error || !toneReady) return;
    setTrackIds(data?.tracks.map((_, trackIndex) => `track-${trackIndex}`));
  }, [data?.tracks, isLoading, error, toneReady]);

  function createTrack(type: ETrackType, config: Attributes) {
    const Track = TRACK_MAP.get(type) as FunctionComponent;
    return createElement(Track, { ...config });
  }

  function Tracks() {
    const tracks = (data?.tracks || []).map(({ type, config }, trackIndex) => {
      const attrs = { ...config } as Attributes;
      const id = `track-${trackIndex}`;

      return (
        <SortableItem id={id} key={id}>
          {createTrack(type, { ...attrs })}
        </SortableItem>
      );
    });
    return tracks;
  }

  const App = () => (
    <DndContext>
      <main className="relative h-full flex flex-1 justify-between">
        <div className="bg-white"></div>
        <div className="flex flex-col flex-1">
          <Toolbar />

          <p className="text-xl p-4">
            <span className="font-black">NEWS:</span>&nbsp; Verdi&apos;s A
            (432Hz), Progressions, Sortable tracks
          </p>
          <SortableContext
            items={trackIds}
            strategy={verticalListSortingStrategy}
          >
            <ol className="flex-1">{<>{Tracks()}</>}</ol>
          </SortableContext>
          {/*<SalamanderGrandPianoV3 />*/}
          <Tabs>
            <TabMenu
              items={[
                { Icon: FilesIcon, text: "Audio Browser F5" },
                { Icon: BeerIcon, text: "Mixer F3" },
                { Icon: CogIcon, text: "Einstellungen " },
              ]}
            ></TabMenu>
            <TabContent>
              <p>{useMusicTheory({ tonic: "C" }).getChords("I V vi IV")}</p>
              <Mixer />
            </TabContent>
          </Tabs>
          <PolySynth />
          <Piano />
        </div>
        <div className="bg-cyan-400 flex flex-col 0"></div>
      </main>
    </DndContext>
  );

  return (
    <>
      {toneReady && !isLoading && !error ? (
        <App />
      ) : (
        <Dialog
          className="flex flex-col shadow-2xl p-4 w-22 absolute top-0 left-0 right-0 bottom-0"
          id="start"
          open
        >
          <p className="p-4">Web Audio API erlauben, Audio abzuspielen?</p>
          <button
            className="flex items-center justify-center p-4 bg-green-600 text-white"
            onClick={async () => {
              await Tone.start();
              setToneReady(true);
            }}
          >
            OK
          </button>
        </Dialog>
      )}
    </>
  );
}

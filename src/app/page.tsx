"use client";

import { useEffect, useState } from "react";
import { BeerIcon, CogIcon, FilesIcon } from "lucide-react";
import * as Tone from "tone";

import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import useConfig from "@/app/core/config/useConfig";
import useMusicTheory from "@/app/core/hooks/useMusicTheory";

import Mixer from "@/app/components/Mixer";
import Piano from "@/app/components/instruments/keys/Piano";
import SortableItem from "@/app/components/SortableItem";
import Toolbar from "@/app/components/Toolbar";

import Tabs from "@/app/components/ui/tabs/Tabs";
import TabMenu from "@/app/components/ui/tabs/TabMenu";
import TabContent from "@/app/components/ui/tabs/TabContent";
import Dialog from "@/app/components/ui/dialog/Dialog";

import AudioTrack from "./components/tracks/audio/AudioTrack";
import MidiTrack from "./components/tracks/midi/MidiTrack";
import TimeTrack from "./components/tracks/time/TimeTrack";
import { ETrackType } from "./components/tracks/types";
import t from "./core/i18n";
import { styles } from "./components/tracks/styles";

export default function Home() {
  // TODO load project or preset
  const config = undefined;

  const [toneReady, setToneReady] = useState(false);
  const [trackIds, setTrackIds] = useState<string[]>([]);
  const { data = { tracks: [] }, error, isLoading } = useConfig(config);

  useEffect(() => {
    if (isLoading || error || !toneReady) return;
    setTrackIds(data?.tracks.map((_, trackIndex) => `track-${trackIndex}`));
  }, [data?.tracks, isLoading, error, toneReady]);

  function Tracks() {
    const tracks = (data?.tracks).map(
      ({ name, type, ...props }, trackIndex) => {
        const id = `track-${trackIndex}`;

        let track;

        switch (type) {
          case ETrackType.Audio:
            track = <AudioTrack type={type} name={name} />;
            break;
          case ETrackType.Midi:
            track = <MidiTrack type={type} name={name} {...props} />;
            break;
          case ETrackType.Time:
            track = <TimeTrack />;
            break;
          default:
            console.warn(`Type: '${type}' doesn't exist in ETrackType`);
        }

        return (
          <SortableItem id={id} key={id}>
            {track}
          </SortableItem>
        );
      }
    );
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
          <p className="bg-white p-4 border border-gray-100 mb-8">
            <h1 className="text-lg font-bold">Chord progression</h1>
            <br />
            Tonic <span className="p-2 bg-gray-200">C</span> Progression:{" "}
            <span className="p-2 bg-gray-200">I V vi IV</span>&nbsp;
            <span>
              = <b>{useMusicTheory({ tonic: "C" }).getChords("I V vi IV")}</b>
            </span>
          </p>
          <Tabs>
            <TabMenu
              items={[
                { Icon: FilesIcon, text: "Audio Browser F5" },
                { Icon: BeerIcon, text: "Mixer F3" },
                { Icon: CogIcon, text: "Einstellungen " },
              ]}
            ></TabMenu>
            <TabContent>
              <Mixer />
            </TabContent>
          </Tabs>
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
        <Dialog className={styles.dialog} id="start" open>
          <p className="p-4">{t("dialog.allowAudio")}</p>
          <button
            className={styles.button.primary}
            onClick={async () => {
              await Tone.start();
              setToneReady(true);
            }}
          >
            {t("ok")}
          </button>
        </Dialog>
      )}
    </>
  );
}

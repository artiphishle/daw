"use client";

import { useState } from "react";
import { BeerIcon, CogIcon, FilesIcon } from "lucide-react";
import { DndContext } from "@dnd-kit/core";
import * as Tone from "tone";

import t from "@/app/core/i18n";

import useConfig from "@/app/core/config/useConfig";
import useMusicTheory from "@/app/core/hooks/useMusicTheory";

import { styles } from "@/app/components/tracks/styles";

import Arranger from "@/app/components/Arranger";
import Mixer from "@/app/components/Mixer";
import Piano from "@/app/components/instruments/keys/Piano";
import Toolbar from "@/app/components/Toolbar";

import Tabs from "@/app/components/ui/tabs/Tabs";
import TabMenu from "@/app/components/ui/tabs/TabMenu";
import TabContent from "@/app/components/ui/tabs/TabContent";
import Dialog from "@/app/components/ui/dialog/Dialog";

export default function Home() {
  // TODO load project or preset
  const config = undefined;
  const [toneReady, setToneReady] = useState(false);
  const { data = { tracks: [] }, error, isLoading } = useConfig(config);

  function ChordProgression() {
    return (
      <section className="bg-white p-4 border border-gray-100 mb-8">
        <h1 className="text-lg font-bold">Chord progression</h1>
        <p>
          Tonic <span className="p-2 bg-gray-200">C</span> Progression:{" "}
          <span className="p-2 bg-gray-200">I V vi IV</span>&nbsp;
          <span>
            = <b>{useMusicTheory({ tonic: "C" }).getChords("I V vi IV")}</b>
          </span>
        </p>
      </section>
    );
  }
  function StartDialog() {
    return (
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
    );
  }
  function News() {
    return (
      <p className="text-xl p-4">
        <span className="font-black">NEWS:</span>&nbsp; Verdi&apos;s A (432Hz),
        Progressions, Sortable tracks
      </p>
    );
  }
  function App() {
    const tabItems = [
      { Icon: FilesIcon, text: "Audio Browser F5" },
      { Icon: BeerIcon, text: "Mixer F3" },
      { Icon: CogIcon, text: "Einstellungen " },
    ];

    const styles = {
      main: "relative h-full flex flex-1 justify-between",
    };

    return (
      <DndContext>
        <main className={styles.main}>
          <div className="flex flex-col flex-1 justify-between">
            <Toolbar />
            <News />
            <Arranger tracks={data?.tracks} />
            <ChordProgression />
            <Tabs>
              <TabMenu items={tabItems} />
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
  }

  return <>{toneReady && !isLoading && !error ? <App /> : <StartDialog />}</>;
}

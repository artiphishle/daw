"use client";
import { useState } from "react";
import { BeerIcon, CogIcon, FilesIcon } from "lucide-react";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { start } from "tone";

import t from "@/app/core/i18n";

import useConfig from "@/app/core/config/useConfig";
import useMusicTheory from "@/app/core/hooks/useMusicTheory";

import { styles } from "@/app/components/tracks/styles";
import generalStyles from "@/app/core/config/styles";

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
  const _config = undefined;
  const [toneReady, setToneReady] = useState(false);

  function ChordProgression() {
    enum EProgression {
      IVviIV = "I V vi IV",
    }

    return (
      <section className="bg-white p-4 border border-gray-100 mb-8">
        <h2 className={generalStyles.headings.h2}>{t("chordProgression")}</h2>
        <p>
          Tonic <span className="p-2 bg-gray-200">C</span> {t("progression")}:{" "}
          <span className="p-2 bg-gray-200">I V vi IV</span>&nbsp;
          <span>
            ={" "}
            <b>
              {useMusicTheory({ tonic: "C" }).getChords(EProgression.IVviIV)}
            </b>
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
            await start();
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
    const { arranger } = useConfig(_config);
    const { tracks, setTracks } = arranger;

    const tabItems = [
      { Icon: FilesIcon, text: "Audio Browser F5" },
      { Icon: BeerIcon, text: "Mixer F3" },
      { Icon: CogIcon, text: "Einstellungen " },
    ];

    const events = {
      on: {
        dragEnd: (event: DragEndEvent) => {
          const { active, over } = event;
          console.log("active/over", active.id, over?.id);
          if (active.id === over?.id) return;

          const oldIndex = tracks.findIndex(({ id }) => id === active.id);
          const newIndex = tracks.findIndex(({ id }) => id === over?.id);
          return setTracks(arrayMove(tracks, oldIndex, newIndex));
        },
      },
    };

    return (
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={events.on.dragEnd}
      >
        <main className={generalStyles.main}>
          <div className="flex flex-col flex-1 justify-between">
            <Toolbar />
            <News />
            <Arranger tracks={tracks} />
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

  return <>{toneReady ? <App /> : <StartDialog />}</>;
}

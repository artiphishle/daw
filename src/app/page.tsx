"use client";
import { useState } from "react";
import { start } from "tone";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import t from "@/app/core/i18n";

import useConfig from "@/app/core/config/useConfig";
import useMusicTheory from "@/app/core/hooks/useMusicTheory";

import { styles } from "@/app/components/tracks/styles";
import generalStyles from "@/app/core/config/styles";

import Arranger from "@/app/components/Arranger";
import Mixer from "@/app/components/Mixer";
import Piano from "@/app/components/instruments/keys/Piano";
import Navbar from "@/app/components/Navbar";
import Tabs, { ITabs } from "@/app/components/ui/tabs/Tabs";

import { DEFAULT_TRACKS } from "./core/config/constants";
import Dialog from "@/app/components/ui/dialog/Dialog";
import useTransporter from "./core/hooks/useTransporter";
import { ITransporterProps } from "./components/Transporter";
import Sheet from "./components/sheets/Sheet";

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
    const transport: ITransporterProps = useTransporter({
      loop: { start: 0, end: "8m" },
    });
    const { arranger } = useConfig(_config);
    const { tracks, setTracks } = arranger;

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

    const tabsProps: ITabs = {
      activeIndex: 0,
      items: [
        {
          children: <span>Arranger</span>,
          id: "tabs-arranger",
          href: "#",
          order: 1,
          panel: (
            <>
              <Arranger tracks={DEFAULT_TRACKS} transport={transport} />
              <ChordProgression />
              <Mixer />
              <Piano />
            </>
          ),
          title: "Arranger",
        },
        {
          children: <span>Sheet</span>,
          id: "tabs-sheet",
          href: "#",
          order: 2,
          panel: <Sheet />,
          title: "Sheet",
        },
      ],
    };

    return (
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={events.on.dragEnd}
      >
        <main className={generalStyles.main}>
          <div className="flex flex-col flex-1">
            <Navbar transport={transport} />
            <News />
            <Tabs {...tabsProps} />
          </div>
        </main>
      </DndContext>
    );
  }

  return <>{toneReady ? <App /> : <StartDialog />}</>;
}

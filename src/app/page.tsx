"use client";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";
import { start } from "tone";

import t from "@/app/core/i18n";
import styles from "@/app/core/config/styles";
import data from "@/app/components/sheet.data";

import useConverter from "@/app/core/hooks/useConverter";

import {
  Arranger,
  Droppable,
  Mixer,
  Navbar,
  Progression,
  Settings,
  Sheet,
} from "@/app/components";

import { Dialog, Tabs, type ITabs } from "@/app/ui";
import SnareDrum from "@/app/core/instruments/drums/snareDrum/SnareDrum";
import { CogIcon, GridIcon, HopIcon, InfinityIcon } from "lucide-react";
import PianoRoll from "./components/PianoRoll";
import Browser from "./components/Browser";
import PollySynth from "./core/instruments/synths/PollySynth";
// import { PanSongParsed } from "./test/unit/PanSong.parsed";

export default function Home() {
  const [toneReady, setToneReady] = useState(false);
  const { audioToAbc, audioToMidi } = useConverter();
  const droppableInstrumentsRef = useRef(null);
  (async function () {
    try {
      // TODO stream it & not run always at start up
      const notes = await audioToMidi({ audio: "/halloween.mp3" });
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (!toneReady) return;
    (async function () {
      try {
        // setAbcParsed(await audioToAbc(PanSongParsed));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [audioToAbc, toneReady]);

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

  function App() {
    const tabs2Props: ITabs = {
      activeIndex: 0,
      className: { main: "justify-end" },
      items: [
        {
          children: <div>Mixer</div>,
          href: "#",
          id: "tabs-mixer",
          order: 1,
          panel: <Mixer droppableInstrumentsRef={droppableInstrumentsRef} />,
          title: "Mixer",
        },
        {
          children: <div>PianoRoll</div>,
          href: "#",
          id: "tabs-pianoRoll",
          order: 2,
          panel: <PianoRoll />,
          title: "PianoRoll",
        },
        {
          children: <div>Browser</div>,
          href: "#",
          id: "tabs-browser",
          order: 3,
          panel: <Browser />,
          title: "Browser",
        },
      ],
    };
    const tabsProps: ITabs = {
      // vertical: true,
      activeIndex: 0,
      className: {
        main: "",
        nav: "",
        panel: "flex-1",
      },
      items: [
        {
          children: (
            <div className="flex">
              <GridIcon className="w-[24px] h-[24px] mr-1" />
              <span>Arranger</span>
            </div>
          ),

          id: "tabs-arranger",
          href: "#",
          order: 1,
          panel: (
            <>
              <Arranger />
              <Tabs {...tabs2Props} />
            </>
          ),
          title: "Arranger",
        },
        {
          children: (
            <div className="flex">
              <HopIcon className="w-[24px] h-[24px]" />
              <span className="hidden">Sheets</span>
            </div>
          ),
          id: "tabs-sheet",
          href: "#",
          order: 2,
          panel: <>{<Sheet markdown={data[2]} />}</>,
          title: "Sheet",
        },
        {
          children: (
            <div className="flex">
              <CogIcon className="w-[24px] h-[24px]" />
              <span className="hidden">Settings</span>
            </div>
          ),
          id: "tabs-settings",
          href: "#",
          order: 3,
          panel: <Settings />,
          title: "Settings",
        },
        {
          children: (
            <div className="flex">
              <InfinityIcon className="w-[24px] h-[24px]" />
              <span className="hidden">Tests</span>
            </div>
          ),
          id: "tabs-test",
          href: "#",
          order: 4,
          panel: (
            <Droppable id="dropzone-1">
              <section className="bg-white">
                <PollySynth />
                <Progression />
                <div className="p-8">
                  <h2 className={styles.headings.h2}>{t("visualization")}</h2>
                  <SnareDrum className="-mt-100" />
                </div>
              </section>
            </Droppable>
          ),
          title: "Testing",
        },
      ],
    };

    function dragEnd({ active, delta }: DragEndEvent) {
      console.log("moved x/y", delta.x, delta.y);
    }

    return (
      <DndContext onDragEnd={dragEnd}>
        <main className={styles.main}>
          <div className="flex flex-col flex-1">
            <Navbar />
            <Tabs {...tabsProps} />
          </div>
        </main>
        <section ref={droppableInstrumentsRef} id="droppable-instruments" />
      </DndContext>
    );
  }
  return toneReady ? <App /> : <StartDialog />;
}

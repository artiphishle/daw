"use client";
import { useEffect, useState } from "react";
import { start } from "tone";

import t from "@/app/core/i18n";
import generalStyles from "@/app/core/config/styles";
import styles from "@/app/core/config/styles";

import useConverter from "./core/hooks/useConverter";

import {
  Arranger,
  Mixer,
  Navbar,
  Progression,
  Settings,
  Sheet,
} from "@/app/components";

import { Dialog, Tabs, type ITabs } from "@/app/ui";
import data from "@/app/components/sheet.data";
import PollySynth from "./core/instruments/synths/PollySynth";
import SnareDrum from "./core/instruments/drums/snareDrum/SnareDrum";
import { CogIcon, GridIcon, HopIcon, InfinityIcon } from "lucide-react";
// import { PanSongParsed } from "./test/unit/PanSong.parsed";

export default function Home() {
  const [toneReady, setToneReady] = useState(false);
  const { audioToAbc, audioToMidi } = useConverter();
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
    const tabsProps: ITabs = {
      // vertical: true,
      activeIndex: 0,
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
              <Mixer />
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
            <section className="bg-white">
              <Progression />
              <PollySynth />
              <div className="p-8">
                <h2 className={generalStyles.headings.h2}>Visualization</h2>
                <SnareDrum className="-mt-100" />
              </div>
            </section>
          ),
          title: "Testing",
        },
      ],
    };

    return (
      <main className={generalStyles.main}>
        <div className="flex flex-col flex-1">
          <Navbar />
          <Tabs {...tabsProps} />
        </div>
      </main>
    );
  }

  return toneReady ? <App /> : <StartDialog />;
}

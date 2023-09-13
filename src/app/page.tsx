"use client";
import { useEffect, useState } from "react";
import { start } from "tone";

import t from "@/app/core/i18n";
import generalStyles from "@/app/core/config/styles";
import { styles } from "@/app/core/tracks/styles";
import useAudioConverter from "@/app/core/tracks/midi/useAudioConverter";
import Piano from "@/app/core/instruments/keys/Piano";
// import AudioToMidi from "@/app/core/tracks/midi/AudioToMidi";

import {
  Arranger,
  Mixer,
  Navbar,
  Progression,
  Settings,
  Sheet,
} from "@/app/components";

import { Dialog, Tabs, type ITabs } from "@/app/ui";
import data from "./components/sheet.data";
// import { PanSongParsed } from "./test/unit/PanSong.parsed";

export default function Home() {
  const [toneReady, setToneReady] = useState(false);
  const { audioToAbc } = useAudioConverter();
  const [abcParsed, setAbcParsed] = useState<string>("");

  useEffect(() => {
    if (!toneReady) return;
    (async function () {
      try {
        // TODO stream it & not run always at start up
        // const notes = await AudioToMidi();
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
      activeIndex: 0,
      items: [
        {
          children: <span>Arranger</span>,
          id: "tabs-arranger",
          href: "#",
          order: 1,
          panel: (
            <>
              <Arranger />
              <Progression />
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
          panel: <>{<Sheet markdown={data[2]} />},</>,
          title: "Sheet",
        },
        {
          children: <span>Settings</span>,
          id: "tabs-settings",
          href: "#",
          order: 3,
          panel: <Settings />,
          title: "Settings",
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

  return <>{toneReady ? <App /> : <StartDialog />}</>;
}

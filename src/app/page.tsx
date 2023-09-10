"use client";
import { useEffect, useState } from "react";
import { start } from "tone";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { DEFAULT_MIXER } from "@/app/core/config/constants";
import t from "@/app/core/i18n";
import useAudioConverter from "@/app/core/tracks/midi/useAudioConverter";
// import AudioToMidi from "./core/tracks/midi/AudioToMidi";

import generalStyles from "@/app/core/config/styles";
import { styles } from "@/app/core/tracks/styles";

import Piano from "@/app/core/instruments/keys/Piano";

import {
  Arranger,
  Locator,
  Mixer,
  Navbar,
  News,
  Progression,
  Sheet,
} from "@/app/components";

import { Dialog, Tabs, type ITabs } from "@/app/ui";
import data from "./components/sheet.data";
import useProjectSettings from "./hooks/useProjectSettings";
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
    const { projectSettings, isLoading, error } = useProjectSettings();

    if (isLoading) return <p>Loading...</p>;
    if (error || !projectSettings) return <p>Error: {error.message}</p>;

    console.info("[page] projectSettings", projectSettings);
    const { tracks } = projectSettings;

    const events = {
      on: {
        dragEnd: (event: DragEndEvent) => {
          const { active, over } = event;
          console.log("active/over", active.id, over?.id);
          if (active.id === over?.id) return;

          const oldIndex = tracks.findIndex(({ id }) => id === active.id);
          const newIndex = tracks.findIndex(({ id }) => id === over?.id);

          return arrayMove(tracks, oldIndex, newIndex);
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
              <Arranger>
                <Locator />
              </Arranger>

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
      ],
    };

    return (
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={events.on.dragEnd}
      >
        <main className={generalStyles.main}>
          <div className="flex flex-col flex-1">
            <Navbar />
            <News />
            <Tabs {...tabsProps} />
          </div>
        </main>
      </DndContext>
    );
  }

  return <>{toneReady ? <App /> : <StartDialog />}</>;
}

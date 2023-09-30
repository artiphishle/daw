import { useEffect, useState } from "react";
import { CogIcon, GridIcon, HopIcon, InfinityIcon } from "lucide-react";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { Sampler as ToneSampler } from "tone";

import t from "@/app/core/i18n";
import styles from "@/app/core/config/styles";
import { DEFAULT_OFFSET_LEFT } from "@/app/core/config/constants";

import { useActiveState } from "@/ui/hooks/useActiveState";
import useConverter from "@/app/core/hooks/useConverter";
import useInstrument from "@/app/core/hooks/useInstrument";
import useProjectContext from "@/app/core/hooks/useProjectContext";

import data from "@/app/components/sheet.data";
import {
  Arranger,
  Browser,
  Droppable,
  Mixer,
  Navbar,
  PianoRoll,
  Progression,
  Settings,
  Sheet,
} from "@/app/components";
import { PollySynth } from "@/app/core/instruments";
import Sampler from "@/app/core/instruments/sampler/Sampler";
import SnareDrum from "@/app/core/instruments/drums/snareDrum/SnareDrum";
import { A, Nav, Tabs, TabsPanel } from "@/ui";
import { ITrack } from "../types/daw";
// Import { PanSongParsed } from "./test/unit/PanSong.parsed";

function App() {
  const { isOpen, Instrument, openInstrument, closeInstrument } =
    useInstrument();
  const { audioToAbc, audioToMidi } = useConverter();
  const { active: tabTopActive, setActive: setTabTopActive } =
    useActiveState<number>(-1);
  const { active: tabBtmActive, setActive: setTabBtmActive } =
    useActiveState<number>(-1);
  const [tracks, setTracks] = useState<ITrack<any, any>[]>([]);
  const [activeTrackId, setActiveTrackId] = useState<UniqueIdentifier>();

  const convertAudioToMidi = async () => {
    try {
      // TODO stream it & not run always at start up
      const notes = await audioToMidi({ audio: "/halloween.mp3" });
    } catch (error) {
      console.error(error);
    }
  };

  /* TODO
  useEffect(() => {
    (async () => {
      try {
        setAbcParsed(await audioToAbc(PanSongParsed));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [audioToAbc]);
  */

  const { projectContext, updateProjectContext } = useProjectContext();

  useEffect(() => {
    if (!projectContext) return;
    setTabTopActive(projectContext.states.tabTopActive);
    setTabBtmActive(projectContext.states.tabBtmActive);
    setTracks(projectContext.tracks);
    setActiveTrackId(projectContext.activeTrackId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectContext]);

  const tabsBottomItems = [
    {
      children: <div>Mixer</div>,
      href: "#",
      id: "tabs-mixer",
      order: 1,
      panel: <Mixer openInstrument={openInstrument} />,
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
  ];
  const tabsTopItems = [
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
          <Tabs className="justify-end">
            <Nav className={`ml-[${DEFAULT_OFFSET_LEFT}px]`}>
              {tabsBottomItems.map(({ id, children }: any, aIndex) => (
                <A
                  classNameActive="bg-white font-bold"
                  id={`tabs-btm-nav-${id}-${aIndex}`}
                  order={aIndex + 1}
                  key={`tabs-btm-nav-${id}-${aIndex}`}
                  isActive={tabBtmActive === aIndex}
                  onClick={() => {
                    setTabBtmActive(aIndex);
                    updateProjectContext({
                      states: { tabTopActive, tabBtmActive: aIndex },
                    });
                  }}
                >
                  {children}
                </A>
              ))}
            </Nav>
            {tabsBottomItems.map(({ id, panel }, panelIndex) => (
              <TabsPanel
                id={`tabs-btm-${id}-${panelIndex}`}
                isActive={panelIndex === tabBtmActive}
                key={`tabs-btm-panel-${id}-${panelIndex}`}
                Content={panel}
              />
            ))}
          </Tabs>
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
  ];

  function dragEnd({ active, delta }: DragEndEvent) {
    console.log("active/moved x/y", active, delta.x, "/", delta.y);
  }

  return (
    <DndContext onDragEnd={dragEnd}>
      <main className={styles.main}>
        <div className="flex flex-col flex-1">
          <Navbar />
          <Tabs>
            <Nav className={`ml-[${DEFAULT_OFFSET_LEFT}px]`}>
              {tabsTopItems.map(({ id, children }, aIndex) => (
                <A
                  classNameActive="bg-white font-bold"
                  id={`tabs-top-nav-${id}-${aIndex}`}
                  order={aIndex + 1}
                  key={`tabs-top-nav-${id}-${aIndex}`}
                  onClick={() => {
                    setTabTopActive(aIndex);
                    updateProjectContext({
                      states: { tabBtmActive, tabTopActive: aIndex },
                    });
                  }}
                >
                  {children}
                </A>
              ))}
            </Nav>
            {tabsTopItems.map(({ id, panel }, panelIndex) => (
              <TabsPanel
                id={`tabs-top-panel-${id}-${panelIndex}`}
                isActive={panelIndex === tabTopActive}
                key={`tabs-top-panel-${id}-${panelIndex}`}
                className="flex-1"
                Content={panel}
              />
            ))}
          </Tabs>
        </div>
      </main>

      {isOpen && (
        <Instrument>
          <Sampler
            instrument={
              tracks.find((track) => track.id === activeTrackId)!.routing.input
                .instrument! as ToneSampler
            }
            onClose={closeInstrument}
          />
        </Instrument>
      )}
    </DndContext>
  );
}

export { App };

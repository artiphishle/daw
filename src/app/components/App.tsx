"use client";
import { MouseEvent, useEffect, useState } from "react";
import { CogIcon, GridIcon, HopIcon, InfinityIcon } from "lucide-react";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";

import styles from "@/app/core/config/styles";
import { DEFAULT_OFFSET_LEFT } from "@/app/core/config/constants";

// import useConverter from "@/app/core/hooks/useConverter";
import useInstrument from "@/app/core/hooks/useInstrument";

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
import { A, Nav, Tabs, TabsPanel } from "@/ui";
import { ITrack } from "@/app/types/daw";
import useProjectContext from "@/app/core/hooks/api/useProjectContext";
// Import { PanSongParsed } from "./test/unit/PanSong.parsed";

function App() {
  /* const { isOpen, InstrumentPortal, openInstrument, closeInstrument } =
    useInstrument(); */
  // const { audioToAbc, audioToMidi } = useConverter();
  const [tabTopActive, setTabTopActive] = useState<number>();
  const [tabBtmActive, setTabBtmActive] = useState<number>();
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [activeTrackId, setActiveTrackId] = useState<UniqueIdentifier>();

  /*
  const convertAudioToMidi = async () => {
    try {
      // TODO stream it & not run always at start up
      const notes = await audioToMidi({ audio: "/halloween.mp3" });
    } catch (error) {
      console.error(error);
    }
  };
  */

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

  const { projectContext, patchProjectContext } = useProjectContext();

  useEffect(() => {
    if (!projectContext) return;
    setTabTopActive(projectContext.states.tabTopActive);
    setTabBtmActive(projectContext.states.tabBtmActive);
    setTracks(projectContext.tracks);
    setActiveTrackId(projectContext.activeTrackId);
  }, [projectContext]);

  const tabsBottomItems = [
    {
      children: <div>Mixer</div>,
      href: "#",
      id: "tabs-mixer",
      order: 1,
      // panel: <Mixer openInstrument={openInstrument} />,
      panel: (
        <Mixer
          openInstrument={() => {
            console.log("TODO");
          }}
        />
      ),
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
                  onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                    event.preventDefault();

                    setTabBtmActive(aIndex);
                    patchProjectContext({
                      states: {
                        tabTopActive: tabTopActive as number,
                        tabBtmActive: aIndex,
                      },
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
            <Progression />
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
                    patchProjectContext({
                      states: {
                        tabBtmActive: tabBtmActive as number,
                        tabTopActive: aIndex,
                      },
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

      {/* <InstrumentPortal>
        {isOpen &&
          tracks.map((track) => {
            if (activeTrackId !== track.id) return null;
            const I = track.routing.input.instrument?.Instrument;
            if (!I) return null;
            return (
              <I key={`instrument-${track.id}`} onClose={closeInstrument} />
            );
          })}
        </InstrumentPortal> */}
    </DndContext>
  );
}

export { App };

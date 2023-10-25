'use client';
import { type MouseEvent, useEffect } from 'react';
import { CogIcon, GridIcon, HopIcon, InfinityIcon } from 'lucide-react';
import * as Tone from 'tone';
import {
  DndContext,
  useSensor,
  type DragEndEvent,
  MouseSensor,
  useSensors,
} from '@dnd-kit/core';

import styles from '@/common/styles';
import {
  DEFAULT_MEASURE_COUNT,
  DEFAULT_OFFSET_LEFT,
  DEFAULT_QUANTIZATION,
} from '@/constants';
// Import { PanSongParsed } from "./test/unit/PanSong.parsed";
// import useConverter from "@/core/hooks/useConverter";
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
} from '@/components';
import { A, Adsr, GoldKnob, Grid, Menu, Nav, Tabs, TabsPanel } from '@/pfui';
import useProjectContext from '@/core/hooks/api/useProjectContext';
import useAudioInstrument from '@/core/hooks/audio/useAudioInstrument';

import type { Note as TNote } from 'tone/build/esm/core/type/NoteUnits';
import t from '../core/i18n';
import _ from 'lodash/fp';
import data from '../../../cypress/fixtures/sheet';

export function App() {
  const { isOpen, InstrumentPortal, openInstrument, closeInstrument } =
    useAudioInstrument();

  useEffect(() => {
    const audioContext = new Tone.Context();
    audioContext.resume();
    // Your audio processing code goes here
  }, []);

  // const { audioToAbc, audioToMidi } = useConverter();
  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(mouseSensor);

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
  const gridCols =
    (projectContext?.quantization || DEFAULT_QUANTIZATION) *
    (projectContext?.measureCount || DEFAULT_MEASURE_COUNT);
  const activeTrackId = projectContext?.activeTrackId;
  const clef = projectContext?.clef;
  const tabBtmActive = projectContext?.states.tabBtmActive;
  const tabTopActive = projectContext?.states.tabTopActive;
  const tracks = projectContext?.tracks || [];

  const tabsBottomItems = [
    {
      children: <div>Mixer</div>,
      href: '#',
      id: 'tabs-mixer',
      order: 1,
      panel: <Mixer openInstrument={openInstrument} />,
      title: 'Mixer',
    },
    {
      children: <div>PianoRoll</div>,
      href: '#',
      id: 'tabs-pianoRoll',
      order: 2,
      panel: <PianoRoll />,
      title: 'PianoRoll',
    },
    {
      children: <div>Browser</div>,
      href: '#',
      id: 'tabs-browser',
      order: 3,
      panel: <Browser />,
      title: 'Browser',
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
      id: 'tabs-arranger',
      href: '#',
      order: 1,
      panel: (
        <>
          {/* TODO Extract as 'Backdrop' component */}
          <section className="relative">
            <Grid
              className={
                'grid absolute top-[32px] left-[184px] right-0 bottom-0'
              }
              cols={gridCols}
              rows={tracks.length}
              classNameItem="h-[40px] border border-[#fff] mb-[1px]"
            />
            <Arranger className="absolute top-0 left-0 right-0 bottom-0" />
          </section>
          <Tabs className="justify-end">
            <Nav className={`ml-[184px]`}>
              {tabsBottomItems.map(({ id, children }: any, aIndex) => (
                <A
                  classNameActive="bg-white font-bold"
                  id={`tabs-btm-nav-${id}-${aIndex}`}
                  order={aIndex + 1}
                  key={`tabs-btm-nav-${id}-${aIndex}`}
                  isActive={tabBtmActive === aIndex}
                  onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                    event.preventDefault();
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
      title: 'Arranger',
    },
    {
      children: (
        <div className="flex">
          <HopIcon className="w-[24px] h-[24px]" />
          <span className="hidden">Sheets</span>
        </div>
      ),
      id: 'tabs-sheet',
      href: '#',
      order: 2,
      panel: <>{<Sheet markdown={data[2]} />}</>,
      title: 'Sheet',
    },
    {
      children: (
        <div className="flex">
          <CogIcon className="w-[24px] h-[24px]" />
          <span className="hidden">Settings</span>
        </div>
      ),
      id: 'tabs-settings',
      href: '#',
      order: 3,
      panel: <Settings />,
      title: 'Settings',
    },
    {
      children: (
        <div className="flex">
          <InfinityIcon className="w-[24px] h-[24px]" />
          <span className="hidden">Tests</span>
        </div>
      ),
      id: 'tabs-test',
      href: '#',
      order: 4,
      panel: (
        <Droppable id="dropzone-1">
          <section className="bg-white p-8">
            <h1 className={styles.headings.h1}>News & Showroom</h1>
            <hr className="my-8" />
            <section>
              <h2 className={styles.headings.h2}>Knobs</h2>
              <GoldKnob initialValue={80} size={120} />
            </section>
            <section className="flex flex-col lg:flex-row gap-8">
              <section>
                <h2 className={styles.headings.h2}>
                  {_.upperFirst(t('progression'))}
                </h2>
                <Progression tonic={clef as TNote} />
              </section>
              <section>
                <h2 className={styles.headings.h2}>ADSR Shaper</h2>
                <br />
                <Adsr />
              </section>
              <hr className="my-8" />
            </section>
          </section>
        </Droppable>
      ),
      title: 'Testing',
    },
  ];

  function dragEnd({ active, delta }: DragEndEvent) {
    console.log('active/moved x/y', active, delta.x, '/', delta.y);
  }

  return (
    <DndContext onDragEnd={dragEnd} sensors={sensors}>
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
        <Menu isContextMenu={true} />
      </main>

      <InstrumentPortal>
        {isOpen &&
          tracks.map((track) => {
            if (activeTrackId !== track.id) return null;
            const I = track.routing.input.instrument?.Instrument;
            if (!I) return null;
            return (
              <I key={`instrument-${track.id}`} onClose={closeInstrument} />
            );
          })}
      </InstrumentPortal>
    </DndContext>
  );
}

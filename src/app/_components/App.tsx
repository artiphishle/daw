'use client';
import _ from 'lodash/fp';
import usePortal from 'react-useportal';

import t from '@/core/i18n';
import { patchProject } from '@/api/project/_presets/DefaultPreset';
import {
  Arranger,
  Footer,
  Header,
  Instrument,
  Mixer,
  Song,
} from '@/components';
import { Button, ButtonGroup, Dialog, Flex, Menu } from '@/pfui';
import { useSelector } from '@/core/hooks/useSelector';
import { useToneJs } from '@/core/hooks/useToneJs';

import { EButtonType, ESize, EVariant } from '@/pfui/constants';
import type { IData, IProject } from '@/common/types/project.types';
import $ from '@/common/styles';
import { useEffect, useState } from 'react';
import { ITrack } from '@/common/types/track.types';

export function App({
  channels: _channels,
  project,
  tracks: initialTracks,
}: IData) {
  const [tracks, setTracks] = useState<ITrack[] | null>(null);
  const { Portal, openPortal, closePortal, isOpen } = usePortal();
  const { init, toneReady } = useToneJs();
  const { deselectChannels, selectChannels, deselectTracks, selectTracks } =
    useSelector();
  const _patchProject = (patch: Partial<IProject>) => {
    patchProject(patch);
  };

  // Following comments will be reused in the future
  // const { audioToAbc, audioToMidi } = useConverter();
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
  /*
  const tabsBottomItems = [
    {
      children: <div>Mixer</div>,
      href: '#',
      id: 'tabs-mixer',
      order: 1,
      panel: <div>Mixer</div>, // <Mixer openInstrument={openInstrument} />,
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
  */
  /*
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
          <section className="relative">
            <Grid
              className={'grid absolute top-[32px] right-0 bottom-0'}
              cols={gridCols}
              rows={tracks.length}
              style={{ left: DEFAULT_OFFSET_LEFT }}
              classNameItem="h-[40px] border border-[#fff] mb-[1px]"
            />
            <Arranger className={$.main}>
              {tracks.map((track, trackIndex) => {
                const trk = {
                  className:
                    activeTrackId === track.id ? styles.track.active : '',
                  measureCount,
                  quantization,
                  ...track,
                };
                return <Track key={`arranger-track-${track.id}`} {...trk} />;
              })}
            </Arranger>
          </section>
          <Tabs className="justify-end">
            <Nav className={`ml-[179px]`}>
              {tabsBottomItems.map(({ id, children }: any, aIndex) => (
                <A
                  classNameActive="bg-white font-bold"
                  id={`tabs-btm-nav-${id}-${aIndex}`}
                  order={aIndex + 1}
                  key={`tabs-btm-nav-${id}-${aIndex}`}
                  isActive={tabBtmActive === aIndex}
                  onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                    event.preventDefault();
                    /* patch({
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
          <CogIcon className={styles.icon.md} />
          <span className="hidden">{$('settings')}</span>
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
          <InfinityIcon className={styles.icon.md} />
          <span className="hidden">{t('tests')}</span>
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
      title: t('testing'),
    },
  ];
  */

  useEffect(() => {
    setTracks(selectTracks(initialTracks));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (toneReady) {
    const channels = selectChannels(_channels);
    const activeTrack = tracks?.find(({ id }) => id === project.activeTrackId);
    /***
     * New way of structuring
     * It's not perfect yet but it's a start
     * @todo Create a layout repository introducing portals and flattened structure
     */
    return (
      <>
        <Header project={project} />
        <main className={$.main}>
          <Song grow={true}>
            <Flex grow={true} vertical={true}>
              <Arranger
                project={project}
                setTracks={setTracks}
                tracks={tracks || []}
              />
              <Mixer
                activeTrackId={project.activeTrackId}
                channels={channels}
                tracks={tracks || []}
                openInstrument={open}
              />
            </Flex>
          </Song>
          <Menu isContextMenu={true} />
        </main>
        <Footer />
        <Portal>
          {isOpen && (
            <section className={$.portal.main}>
              {activeTrack && (
                <Instrument onClose={closePortal} activeTrack={activeTrack} />
              )}
            </section>
          )}
        </Portal>
      </>
    );
  }

  return (
    <>
      <Dialog open className="absolute top-[20%] max-w-[80%] p-8">
        <h3 className={$.headings.h3}>{t('allowSound')}</h3>
        <ButtonGroup className="text-center mt-10">
          <Button
            onClick={init}
            variant={EVariant.Primary}
            size={ESize.Xl}
            type={EButtonType.Button}
            value={t('ok')}
          />
        </ButtonGroup>
      </Dialog>
    </>
  );
}

/*
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
*/

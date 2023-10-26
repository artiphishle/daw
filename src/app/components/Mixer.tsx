'use client';
import { useCallback, useMemo, type ReactNode } from 'react';
import { Loader, LucideIcon } from 'lucide-react';
import { useWindowWidth } from '@react-hook/window-size';
import classNames from 'classnames';
import * as Tone from 'tone';

import t from '@/core/i18n';
import { getIconByType } from 'config/icons';
import useProjectContext from '@/core/hooks/api/useProjectContext';
import { Meter } from '@/components';
import { ButtonGroup, Knob, MuteButton, SoloButton } from 'packages/pfui';

import { ESize } from 'packages/pfui/constants';
import { ETrackType } from 'app/common/types/track.types';
import type { UniqueIdentifier } from '@/types/utility.types';
import type { IMixer } from 'app/common/types/mixer.types';

import styles from 'app/common/styles';
import { DEFAULT_OFFSET_LEFT } from '@/common/constants';
const $ = styles.mixer;

/*** @templates */
const Inner = ({ children }: { children: ReactNode }) => (
  <div className={$.track.inner}>{children}</div>
);
const TplFX = () => (
  <div>
    <ol>
      <li>{t('empty')}</li>
    </ol>
  </div>
);

/***
 * @Mixer
 * @description renders channels/tracks
 * @todo extract routing
 */
export default function Mixer({ openInstrument }: IMixer) {
  /*** @master */
  const masterMeter = new Tone.Meter();
  masterMeter.normalRange = true;
  const masterGain = new Tone.Gain(0.5).toDestination().chain(masterMeter);

  const windowWidth = useWindowWidth();
  const FxChannel = useMemo(
    () => ({
      Inserts: () => <TplFX />,
      Sends: () => <TplFX />,
    }),
    []
  );
  const getRouting = useCallback(
    ({ label, output }: { label: string; output?: string }) => {
      const a = { href: '#', onClick: openInstrument };
      return (
        <ol>
          <li>
            <a {...a}>{label}</a>
          </li>
          <li>{output}</li>
        </ol>
      );
    },
    [openInstrument]
  );
  const { projectContext: $d } = useProjectContext();
  const tracks = $d?.tracks || [];
  const channels = $d?.channels || [];
  if (!$d || !tracks.length) return <Loader />;

  const w = `calc(${windowWidth / tracks.length}px)`;
  const width = `${parseInt(w, 10) - DEFAULT_OFFSET_LEFT}px`;

  const getChannelById = (id: string) => {
    if (id === 'master') return masterGain;
    return channels.find((channel) => channel.id === id)?.channel || masterGain;
  };

  interface IMixerRender {
    Icon: LucideIcon;
    id: UniqueIdentifier;
    index: number;
    inputLabel: string;
    outputLabel: string;
    label: string;
    meter: Tone.Meter;
  }
  /*** @shared render function for channels & tracks  */
  function render({
    Icon,
    id,
    index,
    inputLabel,
    outputLabel,
    label,
    meter,
  }: IMixerRender) {
    return (
      <section
        key={`${id}-${index}`}
        className={classNames($.track.main, {
          [$.track.channel]:
            (id as string).split('-')[0] === 'ch' ||
            (id as string) === 'master',
        })}
        style={{ width, minWidth: '65px' }}
      >
        <Inner>
          <Knob size={ESize.Sm} max={1} min={0} value={0.8} />
        </Inner>
        <ButtonGroup className="absolute top-0 right-0">
          <SoloButton />
          <MuteButton />
        </ButtonGroup>
        <Inner>
          {getRouting({
            label: inputLabel,
            output: outputLabel,
          })}
        </Inner>
        <Inner>
          <FxChannel.Inserts />
        </Inner>
        <Inner>
          <FxChannel.Sends />
        </Inner>
        <Inner>
          <h2>{label}</h2>
        </Inner>
        <Meter meter={id === 'master' ? masterMeter : meter} />
        <Inner>
          <Icon width="16px" height="16px" /> {label}
        </Inner>
      </section>
    );
  }
  /*** @channels */
  const channelTracks = channels.map((channel, index) => {
    const meter = new Tone.Meter();
    meter.normalRange = true;
    const out = getChannelById(channel.routing.output);
    channel.channel!.fan(meter, out);
    const Icon = getIconByType(ETrackType.Channel);
    return render({
      Icon,
      index,
      meter,
      id: channel.id,
      inputLabel: channel.routing.input,
      outputLabel: channel.routing.output,
      label: channel.label,
    });
  });
  /*** @tracks */
  const mixerTracks = tracks.map((track, trackIndex) => {
    const meter = new Tone.Meter();
    meter.normalRange = true;
    const {
      id,
      name,
      routing: { input, output },
      type,
    } = track;
    const Icon = getIconByType(type);
    const isActive = $d!.activeTrackId === id ? 'active' : 'inactive';
    const cn = classNames($.track.main, $.track[isActive]);
    const out = getChannelById(track.routing.output);
    const i = input.instrument!.instrument.fan(meter, out);
    // .load((instrument!.options as Tone.PlayerOptions).url as string
    return render({
      Icon,
      index: trackIndex,
      meter,
      id,
      inputLabel: input.label,
      outputLabel: output,
      label: name,
    });
  });

  return (
    <section id="DAW_MXR" className={$.main}>
      {[...mixerTracks, ...channelTracks]}
    </section>
  );
}

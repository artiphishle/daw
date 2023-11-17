'use client';
import { useCallback, useMemo, type ReactNode, MouseEvent } from 'react';
import { LucideIcon } from 'lucide-react';
import { useWindowWidth } from '@react-hook/window-size';
import classNames from 'classnames';
import * as Tone from 'tone';

import { getIconByType } from 'config/icons';
import { DEFAULT_OFFSET_LEFT } from '@/common/constants';
import t from '@/core/i18n';
import { Meter } from '@/components';
import { ButtonGroup, Knob, MuteButton, SoloButton } from '@/pfui';

import { ESize } from '@/pfui/constants';
import { ETrackType } from 'app/_common/types/track.types';
import type { UniqueIdentifier } from 'app/_common/types/utility.types';
import type { IMixer } from 'app/_common/types/mixer.types';

import styles from 'app/_common/styles';
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
export function Mixer({
  activeTrackId,
  channels,
  className = '',
  tracks,
  openInstrument,
}: IMixer) {
  /*** @master */
  const masterMeter = new Tone.Meter();
  masterMeter.normalRange = true;
  const masterGain = new Tone.Gain(0).toDestination().chain(masterMeter);

  const windowWidth = useWindowWidth();
  const FxChannel = useMemo(
    () => ({
      Inserts: () => <TplFX />,
      Sends: () => <TplFX />,
    }),
    [],
  );
  const getRouting = useCallback(
    ({ label, output }: { label: string; output?: string }) => {
      const a = {
        href: '#',
        onClick: (event: MouseEvent) => {
          event.preventDefault();
          openInstrument();
        },
      };
      return (
        <ol>
          <li>
            <a {...a}>{label}</a>
          </li>
          <li>{output}</li>
        </ol>
      );
    },
    [openInstrument],
  );
  const width =
    (windowWidth - DEFAULT_OFFSET_LEFT) / (tracks.length + channels.length);
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
    const isActive = id === activeTrackId;

    return (
      <section
        key={`${id}-${index}`}
        className={classNames($.track.main, { [$.track.active]: isActive })}
        style={{ width }}
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
        <Meter
          className={classNames(
            $.meter,
            isActive ? $.meterActive : $.meterInactive,
          )}
          meter={id === 'master' ? masterMeter : meter}
        />
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
    const out = getChannelById(track.routing.output);
    const i = input.instrument!.instrument.fan(meter, out);
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
    <section id="DAW_MXR" className={classNames($.main, className)}>
      {[...mixerTracks, ...channelTracks]}
    </section>
  );
}

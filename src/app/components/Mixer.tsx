"use client";
import { useCallback, useMemo, type ReactNode } from "react";
import { Loader } from "lucide-react";
import { useWindowWidth } from "@react-hook/window-size";
import classNames from "classnames";
import * as Tone from "tone";

import { NUM_BANDS } from "./Analyzer";
import t from "@/core/i18n";
import { getIconByType } from "config/icons";
import useProjectContext from "@/core/hooks/api/useProjectContext";
import { Analyzer } from "@/components";
import { ButtonGroup, Knob, MuteButton, SoloButton } from "packages/ui";

import { ESize, EVariant } from "packages/ui/constants";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { ETrackType, type ITrack } from "app/common/types/track.types";
import type { IMixer } from "app/common/types/mixer.types";

import styles from "app/common/styles";
import { DEFAULT_OFFSET_LEFT } from "@/common/constants";
const $ = styles.mixer;
// ("w-[calc(100%-4px)] ml-[2px] mb-2 text-center lg:w-[80%] lg:ml-[10%] lg:p-1");

const Inner = ({ children }: { children: ReactNode }) => (
  <div className={$.track.inner}>{children}</div>
);
const TplFX = () => (
  <div>
    <ol>
      <li>{t("empty")}</li>
    </ol>
  </div>
);
const getTrackData = (track: ITrack, activeTrackId: UniqueIdentifier) => {
  const { id, routing, type, name } = track;
  const { input, output } = routing;
  const { instrument, label } = input;
  const active = activeTrackId === id ? "active" : "inactive";
  const cn = classNames($.track.main, $.track[active]);
  const Icon = getIconByType(type);
  return { cn, Icon, id, instrument, label, name, output };
};

export default function Mixer({ openInstrument }: IMixer) {
  const windowWidth = useWindowWidth();

  /* 1. Master Settings */
  const masterFft = new Tone.FFT(NUM_BANDS);
  const masterGain = new Tone.Gain(0.8).toDestination().chain(masterFft);

  const FxChannel = useMemo(
    () => ({
      Inserts: () => <TplFX />,
      Sends: () => <TplFX />,
    }),
    []
  );
  const getRouting = useCallback(
    ({ label, output }: { label: string; output?: string }) => {
      const a = { href: "#", onClick: openInstrument };
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

  const mixerTracks = tracks.map((track, trackIndex) => {
    const fft = new Tone.FFT(NUM_BANDS);
    const trackData = getTrackData(track, $d!.activeTrackId);
    const { cn, Icon, instrument, label, name, output } = trackData;
    const player = instrument!.instrument as Tone.Player;
    player
      .chain(fft, masterGain)
      .load((instrument!.options as Tone.PlayerOptions).url as string);

    return (
      <section
        key={`${track.id}-${trackIndex}`}
        className={classNames(cn, "relative")}
        style={{ width, minWidth: "65px" }}
      >
        <Inner>
          <Knob size={ESize.Sm} max={1} min={0} value={0.8} />
          <Knob
            size={ESize.Sm}
            color={EVariant.Primary}
            max={50}
            min={-50}
            value={0}
          />
        </Inner>
        <ButtonGroup className="absolute top-0 right-0">
          <SoloButton />
          <MuteButton />
        </ButtonGroup>
        <Inner>{getRouting({ label, output })}</Inner>
        <Inner>
          <FxChannel.Inserts />
        </Inner>
        <Inner>
          <FxChannel.Sends />
        </Inner>
        <Inner>
          <h2>{label}</h2>
        </Inner>
        <Analyzer className={$.meter} color="white" fft={fft} />
        <Inner>
          <Icon /> {name}
        </Inner>
      </section>
    );
  });
  const channelTracks = channels.map((channel, channelIndex) => {
    const fft = new Tone.FFT(NUM_BANDS);
    channel.channel!.chain(fft, masterGain);
    const Icon = getIconByType(ETrackType.Channel);

    return (
      <section
        key={`${channel.id}-${channelIndex}`}
        className={classNames(
          $.track.main,
          "justify-end relative bg-green-700"
        )}
        style={{ width, minWidth: "65px" }}
      >
        <Inner>
          <Knob size={ESize.Sm} max={1} min={0} value={0.8} />
          <Knob
            size={ESize.Sm}
            color={EVariant.Primary}
            max={50}
            min={-50}
            value={0}
          />
        </Inner>
        <ButtonGroup className="absolute top-0 right-0">
          <SoloButton />
          <MuteButton />
        </ButtonGroup>
        <Inner>
          {getRouting({
            label: channel.routing.input,
            output: channel.routing.output,
          })}
        </Inner>
        <Inner>
          <FxChannel.Inserts />
        </Inner>
        <Inner>
          <FxChannel.Sends />
        </Inner>
        <Inner>
          <h2>{channel.label}</h2>
        </Inner>
        <Analyzer
          className={classNames($.meter, "bg-green-900")}
          color="white"
          fft={channel.id === "master" ? masterFft : fft}
        />
        <Inner>
          <Icon /> {channel.label}
        </Inner>
      </section>
    );
  });

  return (
    <section id="DAW_MXR" className={$.main}>
      {[...mixerTracks, ...channelTracks]}
    </section>
  );
}

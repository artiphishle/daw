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
import type { ITrack } from "app/common/types/track.types";
import type { IMixer } from "app/common/types/mixer.types";

import styles from "config/styles";
const $ = styles.mixer;
("w-[calc(100%-4px)] ml-[2px] mb-2 text-center lg:w-[80%] lg:ml-[10%] lg:p-1");

const props = { className: styles.icon };
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
const getChannelData = (track: ITrack, activeTrackId: UniqueIdentifier) => {
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

  /*# 1. Master Settings */
  const masterGain = new Tone.Gain(-6);

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
  if (!$d || !tracks.length) return <Loader />;

  const masterTrack = tracks[tracks.length - 1];
  const w = `calc(${windowWidth / tracks.length}px)`;
  const width = `${parseInt(w, 10) - 168}px`;
  const fft = new Tone.FFT(NUM_BANDS);
  const mixerTracks = tracks.map((track, trackIndex) => {
    const channelData = getChannelData(track, $d.activeTrackId);
    const { cn, Icon, label, name, output } = channelData;
    return (
      <section
        key={`${track.id}-${trackIndex}`}
        className={classNames(cn, "relative")}
        style={{ width, minWidth: "65px" }}
      >
        <section className={$.main}>
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
          <Analyzer className={$.meter} color="#fff" fft={fft} />
          <Inner>
            <span>
              <Icon /> {name}
            </span>
          </Inner>
        </section>
      </section>
    );
  });
}

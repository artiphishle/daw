"use client";
import { useWindowWidth } from "@react-hook/window-size";
import { Destination, Meter as ToneMeter, Volume } from "tone";
import classNames from "classnames";

import t from "@/core/i18n";
import { AudioIcon, GroupIcon, MidiIcon } from "@/core/config/icons";
import useProjectContext from "@/core/hooks/api/useProjectContext";
import { Meter } from "@/components";

import { useCallback, useMemo, type ReactNode } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";

import styles from "@/core/config/styles";
import { Button, ButtonGroup, Knob } from "@/ui";

import { ETrackType, type ITrack } from "@/types/track.types";
import type { IMixer } from "@/types/mixer.types";
import { IProjectContext } from "@/types/project.types";
import { ESize, EVariant } from "app/ui/constants";
import { EButtonType } from "app/ui/button/Button";

const $ = styles.mixer;
const btn =
  "w-[calc(100%-4px)] ml-[2px] mb-2 text-center lg:w-[80%] lg:ml-[10%] lg:p-1";

const getTrackTypeIcon = (type: ETrackType) => {
  const props = { className: styles.icon };
  switch (type) {
    case ETrackType.Audio:
      return <AudioIcon {...props} />;
    case ETrackType.Group:
      return <GroupIcon {...props} />;
    case ETrackType.Instrument:
      return <MidiIcon {...props} />;
    case ETrackType.Players:
      return <MidiIcon {...props} />;
    case ETrackType.Sampler:
      return <MidiIcon {...props} />;
    default:
      console.error("[Mixer] Unknown trackType:", type);
      return <></>;
  }
};
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

export default function Mixer({ openInstrument }: IMixer) {
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
  const getChannelData = (track: ITrack, activeTrackId: UniqueIdentifier) => {
    const { id, routing, type, name } = track;
    const { input, output } = routing;
    const { instrument, label } = input;
    const active = activeTrackId === id ? "active" : "inactive";
    const Icon = getTrackTypeIcon(type);
    const cn = classNames($.track.main, $.track[active]);
    return { cn, Icon, id, instrument, label, name, output };
  };
  const { projectContext } = useProjectContext();
  if (!projectContext) return null;
  const { tracks, activeTrackId } = projectContext;
  const w = `calc(${windowWidth / tracks.length}px)`;
  const width = `${parseInt(w, 10) - 168}px`;

  return (
    <section className={$.main}>
      <div className={$.inner}>
        {tracks.map((track) => {
          const { cn, Icon, id, instrument, label, name, output } =
            getChannelData(track, activeTrackId);

          const meter = new ToneMeter();
          const volume = new Volume();

          if (instrument?.instrument) {
            instrument?.instrument?.chain(volume, meter, Destination);
          }

          return (
            <div
              key={id}
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
                <Button
                  size={ESize.Sm}
                  title="Solo"
                  type={EButtonType.Button}
                  variant={EVariant.Primary}
                  value="S"
                />
                <Button
                  size={ESize.Sm}
                  title="Mute"
                  type={EButtonType.Button}
                  value="M"
                  variant={EVariant.Error}
                />
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
              <Meter className={$.meter} meter={meter} />
              <Inner>
                {Icon} <span>{name}</span>
              </Inner>
            </div>
          );
        })}
      </div>
    </section>
  );
}

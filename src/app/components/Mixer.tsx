import { useWindowWidth } from "@react-hook/window-size";
import { Destination, Meter as ToneMeter } from "tone";
import classNames from "classnames";

import t from "@/app/core/i18n";
import { AudioIcon, GroupIcon, MidiIcon } from "@/app/core/config/icons";
import useProjectContext from "@/app/core/hooks/useProjectContext";
import { Meter } from "@/app/components";

import { ETrackType, type IMixer, type ITrack } from "@/app/types/daw";
import { useCallback, useMemo, type ReactNode } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";

import styles from "@/app/core/config/styles";
import { ButtonGroup } from "../ui";
import { Button } from "../ui/element/button/Button";
const css = styles.mixer;
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
    default:
      console.error("[Mixer] Unknown trackType:", type);
      return <></>;
  }
};
const Inner = ({ children }: { children: ReactNode }) => (
  <div className={css.track.inner}>{children}</div>
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
  const getChannelData = (
    track: ITrack<any, any>,
    activeTrackId: UniqueIdentifier
  ) => {
    const { id, routing, type, name } = track;
    const { input, output } = routing;
    const { instrument, label } = input;
    const active = activeTrackId === id ? "active" : "inactive";
    const Icon = getTrackTypeIcon(type);
    const cn = classNames(css.track.main, css.track[active]);
    return { cn, Icon, id, instrument, label, name, output };
  };
  const { projectContext } = useProjectContext();
  if (!projectContext) return null;
  const { tracks, activeTrackId } = projectContext;
  const w = `calc(${windowWidth / tracks.length}px)`;
  const width = `${parseInt(w, 10) - 168}px`;

  return (
    <section className={css.main}>
      <div className={css.inner}>
        {tracks.map((track) => {
          const { cn, Icon, id, instrument, label, name, output } =
            getChannelData(track, activeTrackId);
          const meter = new ToneMeter();
          instrument && instrument.chain(meter, Destination);

          return (
            <div key={id} className={cn} style={{ width, minWidth: "65px" }}>
              <ButtonGroup>
                <Button value="S" className={classNames(btn, "bg-blue-800")} />
                <Button value="M" className={classNames(btn, "bg-red-800")} />
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
              <Meter className="w-full bg-[#333]" meter={meter} />
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

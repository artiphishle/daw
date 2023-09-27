import { RefObject, useState } from "react";
import usePortal from "react-useportal";
import { useWindowWidth } from "@react-hook/window-size";
import { Destination, Meter as ToneMeter } from "tone";
import classNames from "classnames";

import t from "@/app/core/i18n";
import styles, { TrackColor } from "@/app/core/config/styles";
import { AudioIcon, GroupIcon, MidiIcon } from "@/app/core/config/icons";
import SamPlay from "@/app/core/instruments/samPlay/SamPlay";
import useProjectContext from "@/app/core/hooks/useProjectContext";
import { Meter } from "@/app/components";
import { Accordion } from "@/app/ui";

import { ETrackType } from "@/app/types/daw";

export default function Mixer({
  droppableInstrumentsRef,
}: {
  droppableInstrumentsRef: RefObject<HTMLElement>;
}) {
  const css = styles.mixer;
  const [absolute, _] = useState({ left: 0, top: 0 });
  const windowWidth = useWindowWidth();
  const { openPortal, isOpen, Portal } = usePortal({
    bindTo: droppableInstrumentsRef.current!,
  });

  const { projectContext } = useProjectContext();
  if (!projectContext) return null;
  const { tracks, activeTrackId } = projectContext;

  const masterMeter = new ToneMeter();
  Destination.connect(masterMeter);

  return (
    <section className={classNames(css.main)}>
      <div className={css.inner}>
        {tracks
          // TODO remove this filter after Time track is a normal component
          .filter(({ type }) => type !== ETrackType.Time)
          .map((track) => {
            const { id, routing, type, name } = track;
            const { input, output } = routing;
            const { instrument, label } = input;
            const { bg, text } = TrackColor[type as ETrackType];
            const meter = new ToneMeter();

            if (instrument) {
              instrument.chain(meter, Destination);
              console.log("[Mixer] instrument/type:", instrument, type);
            }

            const RoutingDetails = () => (
              <ol>
                <li className="text-center p-1">
                  <a href="#" onClick={() => openPortal()}>
                    {label}
                  </a>
                </li>
                <li className="text-center p-1">{output}</li>
              </ol>
            );
            const InsertDetails = () => (
              <ol>
                <li className="text-center bg-white p-1">{t("empty")}</li>
              </ol>
            );
            const SendDetails = () => (
              <ol>
                <li className="text-center bg-white p-1">empty</li>
              </ol>
            );
            const details = [
              { Details: RoutingDetails, label: "Routing", type },
              { Details: InsertDetails, label: "Inserts", type },
              { Details: SendDetails, label: "Sends", type },
            ];
            function getTrackTypeIcon(type: ETrackType) {
              const className = "w-[16px] h-[16px] mr-1";
              switch (type) {
                case ETrackType.Audio:
                  return <AudioIcon className={className} />;
                case ETrackType.Group:
                  return <GroupIcon className={className} />;
                case ETrackType.Midi:
                  return <MidiIcon className={className} />;
                default:
                  return <></>;
              }
            }

            return (
              <div
                key={`mixer-track-${id}`}
                className={classNames(
                  `${css.track.main} ${text}`,
                  css.track[activeTrackId === id ? "active" : "inactive"],
                  bg,
                  { "ml-auto": name === "Mixbus" }
                )}
                style={{
                  width: `calc(${
                    windowWidth / (tracks.length + 1)
                  }px - 0.5rem)`,
                }}
              >
                {details.map(({ Details, label }, detailsIndex) => (
                  <Accordion
                    key={`mixer-trk-${id}-det-${detailsIndex}`}
                    summary={<h2 className={css.track.inner}>{label}</h2>}
                    details={<Details />}
                  />
                ))}
                <Meter meter={meter} />
                <div className={css.track.inner}>
                  {getTrackTypeIcon(type)}
                  <span>{name}</span>
                </div>
              </div>
            );
          })}

        <div className={`${css.track} bg-[cornflowerblue] content-end text-xs`}>
          <div className={`${css.track.master}`}>
            <Meter meter={masterMeter} />
            <div className={css.track.inner}>
              <MidiIcon className="w-[16px] h-[16px] mr-1" />
              <span>{t("master")}</span>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Portal>
          <SamPlay style={{ left: absolute.left, top: absolute.top }} />
        </Portal>
      )}
    </section>
  );
}

import { Destination, Meter as ToneMeter } from "tone";
import { GroupIcon, Loader } from "lucide-react";
import classNames from "classnames";

import t from "@/app/core/i18n";
import useProjectContext from "@/app/core/hooks/useProjectContext";
import { Meter } from "@/app/components";
import { Accordion } from "@/app/ui";

import { ETrackType } from "@/app/components/track/types";
import styles, { TrackColor } from "@/app/core/config/styles";
import { AudioIcon, MidiIcon } from "../core/config/icons";

export interface IMixer {
  settings: {
    [k in Exclude<ETrackType, ETrackType.Time>]: {
      bg: string;
      text: string;
      label: string;
      visible: boolean;
    };
  };
}

const css = styles.mixer;

export default function Mixer() {
  const { projectContext, isLoading, error } = useProjectContext();
  if (isLoading) return <Loader />;
  if (!projectContext) throw error;

  const { tracks, activeTrackId } = projectContext;

  const masterMeter = new ToneMeter();
  Destination.connect(masterMeter);

  return (
    <section className={classNames(css.main)}>
      <div className={css.inner}>
        {tracks.map(({ id, routing: { input, output }, type, name }) => {
          if (type === ETrackType.Time) return;
          const meter = new ToneMeter();

          if (input.instrument) {
            input.instrument.chain(meter, Destination);
          }
          const { bg, text } = TrackColor[type];

          const RoutingDetails = () => (
            <ol>
              <li className="text-center p-1">
                <a href="#" onClick={input.onClick}>
                  {input.label}
                </a>
              </li>
              <li className="text-center p-1">{output}</li>
            </ol>
          );
          const InsertDetails = () => (
            <ol>
              <li className="text-center bg-white p-1">empty</li>
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
            <section
              key={`mixer-track-${id}`}
              className={classNames(
                `${css.track.main} ${text}`,
                css.track[activeTrackId === id ? "active" : "inactive"],
                bg,
                { "ml-auto": name === "Mixbus" }
              )}
            >
              {details.map(({ Details, label, type }, detailsIndex) => (
                <Accordion
                  key={`mixer-track-${id}-accordion-${detailsIndex}`}
                  summary={
                    <h2 className={classNames(css.track.inner)}>{label}</h2>
                  }
                  details={<Details />}
                />
              ))}
              <Meter meter={meter} />
              <div className={css.track.inner}>
                {getTrackTypeIcon(type)}
                <span>{name}</span>
              </div>
            </section>
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
    </section>
  );
}

import { Destination, Meter as ToneMeter } from "tone";
import { Loader } from "lucide-react";
import classNames from "classnames";

import t from "@/app/core/i18n";
import useProjectSettings from "@/app/core/hooks/useProjectSettings";
import { Meter } from "@/app/components";
import { Accordion } from "@/app/ui";

import { ETrackType } from "@/app/core/tracks/types";
import { TrackColor } from "@/app/core/config/styles";

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

export default function Mixer() {
  const { projectSettings, isLoading, error } = useProjectSettings();
  if (isLoading) return <Loader />;
  if (!projectSettings) throw error;

  const { tracks, activeTrackId } = projectSettings;

  const styles = {
    mixer: "p-1 flex justify-between w-full",
    mixerInner: "flex w-full",
    track: "bg-white border py-8 mr-2 justify-center text-xs items-center",
    trackInner: "px-4 py-1",
    master: "h-full flex flex-col justify-end bg-cyan-100",
    mixbus: "h-full flex flex-col justify-end bg-cyan-200",
    active: "text-black border-2 border-orange-800 font-bold",
    inactive: "border-2 border-gray-200",
  };

  const masterMeter = new ToneMeter();
  Destination.connect(masterMeter);

  return (
    <section className={styles.mixer}>
      <div className={styles.mixerInner}>
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
                <div onClick={input.onClick}>{input.label}</div>
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
            { Details: RoutingDetails, label: "Routing" },
            { Details: InsertDetails, label: "Inserts" },
            { Details: SendDetails, label: "Sends" },
          ];

          return (
            <section
              key={`mixer-track-${id}`}
              className={classNames(
                `${styles.track} ${text}
                ${styles[activeTrackId === id ? "active" : "inactive"]}
                `,
                {
                  "ml-auto": name === "Mixbus",
                }
              )}
            >
              {details.map(({ Details, label }, detailsIndex) => (
                <Accordion
                  key={`mixer-track-${id}-accordion-${detailsIndex}`}
                  open={true}
                  summary={
                    <h2 className={classNames(styles.trackInner, bg)}>
                      {label}
                    </h2>
                  }
                  details={<Details />}
                />
              ))}
              <div className={`${styles.trackInner} ${bg}`}>
                <Meter meter={meter} />
                <div>{type}</div>
                <div>{name}</div>
              </div>
            </section>
          );
        })}

        <div
          className={`${styles.track} bg-[cornflowerblue] content-end text-xs`}
        >
          <div className={`${styles.trackInner} ${styles.master}`}>
            <Meter meter={masterMeter} />
            <div>&nbsp;</div>
            <div>{t("master")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

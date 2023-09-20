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

  const { tracks } = projectSettings;

  const styles = {
    mixer: "p-1 bg-[#333] flex justify-between w-full",
    mixerInner: "flex w-full",
    track: "p-4 mr-2 justify-center text-xs items-center",
    trackInner: "px-4 py-1 mt-1",
    master: "h-full flex flex-col justify-end bg-cyan-100",
    mixbus: "h-full flex flex-col justify-end bg-cyan-200",
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

          const trackColor = TrackColor[type];
          const bgColor =
            type === ETrackType.Group ? "bg-white" : trackColor.bg;
          const textColor = trackColor.text;

          const RoutingDetails = () => (
            <ol>
              <li className="text-center bg-white p-1">
                <div onClick={input.onClick}>{input.label}</div>
              </li>
              <li className="text-center bg-white p-1">{output}</li>
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
              className={classNames(`${styles.track} ${textColor}`, {
                "ml-auto": name === "Mixbus",
              })}
            >
              {details.map(({ Details, label }, detailsIndex) => (
                <Accordion
                  key={`mixer-track-${id}-accordion-${detailsIndex}`}
                  open={true}
                  summary={
                    <h2 className={classNames(styles.trackInner, bgColor)}>
                      {label}
                    </h2>
                  }
                  details={<Details />}
                />
              ))}
              <div className={`${styles.trackInner} ${bgColor}`}>
                <Meter meter={meter} />
                <div>{type}</div>
                <div>{name}</div>
              </div>
            </section>
          );
        })}

        <div className={`${styles.track} content-end text-xs`}>
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

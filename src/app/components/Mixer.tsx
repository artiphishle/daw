import { Loader } from "lucide-react";

import t from "@/app/core/i18n";
import useProjectSettings from "@/app/hooks/useProjectSettings";
import { Meter } from "@/app/components";
import { Accordion } from "@/app/ui";

import { ETrackType } from "@/app/core/tracks/types";
import { Destination, Meter as ToneMeter } from "tone";
import classNames from "classnames";
import { useState } from "react";

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
  const [meters, setMeters] = useState<{ [id: string]: ToneMeter }>({});
  if (isLoading) return <Loader />;
  if (!projectSettings) throw error;

  const {
    tracks,
    mixer: { settings },
  } = projectSettings;

  const styles = {
    mixer: "p-1 bg-[#333] flex justify-between w-full",
    mixerInner: "flex w-full",
    track: "p-4 mr-2 justify-center text-xs items-center",
    trackInner: "px-4 py-1 mt-1",
    master: "h-full flex flex-col justify-end bg-cyan-100",
    mixbus: "h-full flex flex-col justify-end bg-cyan-200",
  };

  return (
    <section className={styles.mixer}>
      <div className={styles.mixerInner}>
        {tracks.map(({ id, routing: { input, output }, type, name }) => {
          if (type === ETrackType.Time) return;
          const meter = new ToneMeter();

          if (input.instrument) {
            input.instrument.chain(meter, Destination);
          }

          const { bg, label, text } = settings[type];
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

          return (
            <section
              key={`mixer-track-${id}`}
              className={classNames(`${styles.track} ${text}`, {
                "ml-auto": name === "Mixbus",
              })}
            >
              <Accordion
                open={true}
                summary={
                  <h2 className={`${styles.trackInner} ${bg}`}>Routing</h2>
                }
                details={<RoutingDetails />}
              ></Accordion>
              <Accordion
                open={true}
                summary={
                  <h2 className={`${styles.trackInner} ${bg}`}>Inserts</h2>
                }
                details={<InsertDetails />}
              />
              <Accordion
                open={true}
                summary={
                  <h2 className={`${styles.trackInner} ${bg}`}>Sends</h2>
                }
                details={<SendDetails />}
              />
              <div className={`${styles.trackInner} ${bg}`}>
                <Meter meter={meter} />
                <div>{label}</div>
                <div>{name}</div>
              </div>
            </section>
          );
        })}

        <div className={`${styles.track} content-end text-xs`}>
          <div className={`${styles.trackInner} ${styles.master}`}>
            <div>{-Infinity}</div>
            <div>Meter</div>
            <div>&nbsp;</div>
            <div>{t("master")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

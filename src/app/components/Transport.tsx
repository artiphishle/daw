import { type ChangeEvent, type MouseEvent } from "react";
import { PauseIcon, PlayIcon } from "lucide-react";

import { Loop, Time, Transport as ToneTransport } from "tone";
import type { Time as TTime } from "tone/build/esm/core/type/Units";

import t from "@/app/core/i18n";
import useProjectSettings from "@/app/hooks/useProjectSettings";

export enum ETransportState {
  Paused = "paused",
  Started = "started",
  Stopped = "stopped",
}

function loopItTodo(measureCount: number) {
  const getPosition = (time: TTime = ToneTransport.position) =>
    Time(time).toBarsBeatsSixteenths();
  const updatePosition = () =>
    // mutate({ position: getPosition(Transport.position) }),
    console.log("todo update position");

  ToneTransport.loop = true;
  ToneTransport.loopStart = getPosition();
  ToneTransport.loopEnd = `${measureCount}m`;
  new Loop(updatePosition, "16n").start(0).stop(`${measureCount}m`);
}

function formatPosition(position: string) {
  const splitPosition = position.split(":");
  return `${splitPosition[0]}:${splitPosition[1]}:${parseFloat(
    splitPosition[2]
  ).toFixed(3)}`;
}

export default function Transport() {
  const { projectSettings, updateProjectSettings, isLoading, error } =
    useProjectSettings();
  if (isLoading) return <div>Loading...</div>;
  if (error || !projectSettings) return <div>Error: {error}</div>;
  const { bpm, position } = projectSettings;

  const events = {
    onBpmChange: (event: ChangeEvent<HTMLInputElement>) =>
      // TODO Partial<IConfig> instead of any
      updateProjectSettings({ bpm: parseInt(event.target.value) } as any),

    onToggle: (_: MouseEvent<SVGSVGElement>) => {
      ToneTransport.toggle();
    },
  };

  const PlayOrPauseIcon = () =>
    ToneTransport.state === ETransportState.Started ? (
      <PauseIcon onClick={events.onToggle} />
    ) : (
      <PlayIcon onClick={events.onToggle} />
    );

  return (
    <div className="flex py-1 px-4">
      <div className="flex gap-2">
        <div>{formatPosition(position)}</div>
        <div className="flex items-center text-white px-4 mx-2 border-r border-r-[#555]">
          <PlayOrPauseIcon />
        </div>
        <div>
          <label className="text-xs" htmlFor="bpm">
            {t("bpm")}:
          </label>
          <input
            className="w-8 ml-2 bg-transparent"
            id="bpm"
            onChange={events.onBpmChange}
            value={bpm}
          />
        </div>
        <div className="flex items-center">
          <div className="text-xs mr-2">{t("beat")}:</div>
          <div>4/4</div>
        </div>
      </div>
    </div>
  );
}

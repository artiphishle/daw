import { PauseIcon, PlayIcon } from "lucide-react";
import { Transport as ToneTransport } from "tone";

import t from "@/app/core/i18n";
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react";

export enum ETransportState {
  Paused = "paused",
  Started = "started",
  Stopped = "stopped",
}
export interface ITransport {
  bpm: number;
  setBpm: Dispatch<SetStateAction<number>>;

  clef: string;
  setClef: Dispatch<SetStateAction<string>>;

  measureCount: number;
  setMeasureCount: Dispatch<SetStateAction<number>>;

  position: string;
  setPosition: Dispatch<SetStateAction<string>>;

  quantization: number;
  setQuantization: Dispatch<SetStateAction<number>>;

  events: {
    onBpmChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onToggle: (event: MouseEvent<SVGSVGElement>) => void;
  };
}

function formatPosition(position: string) {
  const splitPosition = position.split(":");
  return `${splitPosition[0]}:${splitPosition[1]}:${parseFloat(
    splitPosition[2]
  ).toFixed(3)}`;
}
export default function Transport({ bpm, position, events }: ITransport) {
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

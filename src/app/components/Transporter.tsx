import { Dispatch, SetStateAction, MouseEvent, ChangeEvent } from "react";
import { PauseIcon, PlayIcon } from "lucide-react";
import { Transport } from "tone";

import t from "@/app/core/i18n";

export interface ITransporterProps {
  bpm: number;
  setBpm: Dispatch<SetStateAction<number>>;
  clef: string;
  setClef: Dispatch<SetStateAction<string>>;
  events: {
    on: {
      bpmChange: (event: ChangeEvent<HTMLInputElement>) => void;
      toggle: (event: MouseEvent<SVGSVGElement>) => void;
    };
  };
  measureCount: number;
  setMeasureCount: Dispatch<SetStateAction<number>>;
  position: string;
  quantization: number;
  setQuantization: Dispatch<SetStateAction<number>>;
}

export default function Transporter({
  bpm,
  events,
  position,
}: ITransporterProps) {
  const { bpmChange, toggle } = events.on;

  const PlayOrPauseIcon = () =>
    Transport.state === "started" ? (
      <PauseIcon onClick={toggle} />
    ) : (
      <PlayIcon onClick={toggle} />
    );

  return (
    <div className="flex py-1 px-4">
      <div className="flex gap-2">
        <div>{position}</div>
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
            onChange={bpmChange}
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

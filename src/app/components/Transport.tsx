import { type ChangeEvent, type MouseEvent, useState } from "react";
import { PauseIcon, PlayIcon } from "lucide-react";

import { Transport as ToneTransport } from "tone";

import t from "@/app/core/i18n";
import useProjectSettings from "@/app/hooks/useProjectSettings";
import useTransport from "../hooks/useTransport";

export enum ETransportState {
  Paused = "paused",
  Started = "started",
  Stopped = "stopped",
}

export default function Transport() {
  const { projectSettings, updateProjectSettings } = useProjectSettings();
  const bpm = projectSettings?.bpm;
  const pos = projectSettings?.position;
  const [position, setPosition] = useState(pos);

  const events = {
    onBpmChange: (event: ChangeEvent<HTMLInputElement>) =>
      // TODO Partial<IConfig> instead of any
      updateProjectSettings({ bpm: parseInt(event.target.value) } as any),

    onToggle: (_: MouseEvent<SVGSVGElement>) => {
      console.log("toggeling");
      ToneTransport.toggle();
    },
  };

  const PlayOrPauseIcon = () =>
    ToneTransport.state === ETransportState.Started ? (
      <PauseIcon onClick={events.onToggle} />
    ) : (
      <PlayIcon onClick={events.onToggle} />
    );

  const loopFn = (position: string) => {
    setPosition(position);
  };

  useTransport({ loopFn });

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
            onChange={events.onBpmChange}
            value={bpm || 0}
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

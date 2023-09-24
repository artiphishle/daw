import { type ChangeEvent, type MouseEvent, useState } from "react";
import { PauseIcon, PlayIcon } from "lucide-react";

import { Transport as ToneTransport } from "tone";

import t from "@/app/core/i18n";
import useProjectContext from "@/app/core/hooks/useProjectContext";
import useTransport from "@/app/core/hooks/useTransport";

export enum ETransportState {
  Paused = "paused",
  Started = "started",
  Stopped = "stopped",
}

export default function Transport() {
  const [position, setPosition] = useState<string>();

  const loopFn = (position: string) => setPosition(position);
  useTransport({ loopFn });

  const { projectContext, updateProjectContext } = useProjectContext();
  if (!projectContext) return null;

  const { bpm, measureCount, position: _position } = projectContext;
  ToneTransport.bpm.value = bpm;
  ToneTransport.loop = true;
  ToneTransport.loopStart = 0;
  ToneTransport.loopEnd = `${measureCount}m`;

  const events = {
    onBpmChange: (event: ChangeEvent<HTMLInputElement>) =>
      // TODO Partial<IConfig> instead of any
      updateProjectContext({ bpm: parseInt(event.target.value) } as any),

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

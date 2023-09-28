import { type ChangeEvent, type MouseEvent, useState } from "react";
import {
  CircleIcon,
  FastForwardIcon,
  KeySquareIcon,
  Music2Icon,
  PlayIcon,
  RepeatIcon,
  RewindIcon,
  SquareIcon,
  TimerIcon,
} from "lucide-react";

import { Transport as ToneTransport } from "tone";

import t from "@/app/core/i18n";
import useProjectContext from "@/app/core/hooks/useProjectContext";
import useTransport from "@/app/core/hooks/useTransport";
import styles from "@/app/core/config/styles";

export enum ETransportState {
  Paused = "paused",
  Started = "started",
  Stopped = "stopped",
}

export default function Transport() {
  const [position, setPosition] = useState<string>("0:0:0.000");

  const loopFn = (position: string) => setPosition(position);
  useTransport({ loopFn });

  const { projectContext, updateProjectContext } = useProjectContext();
  if (!projectContext) return null;

  const {
    bpm,
    clef,
    measureCount,
    position: _position,
    quantization,
  } = projectContext;
  ToneTransport.bpm.value = bpm;
  ToneTransport.loop = true;
  ToneTransport.loopStart = 0;
  ToneTransport.loopEnd = `${measureCount}m`;

  const events = {
    // TransportSettings
    onBpmChange: (event: ChangeEvent<HTMLInputElement>) =>
      updateProjectContext({ bpm: parseInt(event.target.value) }),
    onClefChange: (event: ChangeEvent<HTMLInputElement>) =>
      updateProjectContext({ clef: event.target.value }),
    onMeasureCountChange: (event: ChangeEvent<HTMLInputElement>) =>
      updateProjectContext({ measureCount: parseInt(event.target.value) }),
    onQuantizationChange: (event: ChangeEvent<HTMLInputElement>) =>
      updateProjectContext({ quantization: parseInt(event.target.value) }),
    // TransportControl
    onPause: (_: MouseEvent<SVGSVGElement>) => ToneTransport.pause(),
    onRecord: (_: MouseEvent<SVGSVGElement>) =>
      console.log("🎙️ Recording soon available"),
    onStart: (_: MouseEvent<SVGSVGElement>) => ToneTransport.start(),
    onStop: (_: MouseEvent<SVGSVGElement>) => {
      ToneTransport.stop(0.5);
    },
  };

  function TransportControl() {
    return (
      <div className="flex items-center text-white px-4 mx-2 border-r border-r-[#555]">
        <RepeatIcon
          className={styles.button.navbar}
          fill="#fff"
          onClick={events.onStop}
        />
        <RewindIcon
          className={styles.button.navbar}
          fill="#fff"
          onClick={events.onStop}
        />
        <FastForwardIcon
          className={styles.button.navbar}
          fill="#fff"
          onClick={events.onStop}
        />
        <SquareIcon
          className={styles.button.navbar}
          fill="#fff"
          onClick={events.onStop}
        />
        <PlayIcon
          className={styles.button.navbar}
          fill="#0f0"
          onClick={events.onStart}
        />
        <CircleIcon
          className={styles.button.navbar}
          fill="#f00"
          onClick={events.onRecord}
        />
      </div>
    );
  }
  function TransportSettings() {
    return (
      <section className="text-xs flex flex-col justify-between">
        <div className="flex">
          <div className="flex items-center">
            <label
              className="text-cyan-300"
              htmlFor="clef"
              title="clef"
            ></label>
            <KeySquareIcon color="rgb(103, 232, 249)" className="w-4 h-4" />
            <input
              className="w-4 ml-1 bg-transparent"
              id="clef"
              onChange={events.onClefChange}
              value={clef}
            />
          </div>
          <div className="flex items-center">
            <label className="text-cyan-300" htmlFor="measureCount">
              M
            </label>
            <input
              className="w-4 ml-1 bg-transparent"
              id="measureCount"
              onChange={events.onMeasureCountChange}
              value={measureCount}
            />
          </div>
          <div className="flex items-center">
            <label className="text-cyan-300" htmlFor="quantization">
              Q
            </label>
            <input
              className="w-8 ml-1 bg-transparent"
              id="quantization"
              onChange={events.onQuantizationChange}
              value={quantization}
            />
          </div>
          <div className="flex items-center">
            <label className="text-cyan-300" htmlFor="bpm" title="bpm"></label>
            <TimerIcon color="rgb(103, 232, 249)" className="w-4 h-4" />
            <input
              className="w-8 ml-1 bg-transparent"
              id="bpm"
              onChange={events.onBpmChange}
              value={bpm}
            />
            <div className="flex items-center">
              <span>
                <Music2Icon color="rgb(103, 232, 249)" className="w-4 h-4" />
              </span>
              &nbsp;<span>4/4</span>
            </div>
          </div>
        </div>
        <span className="text-[#fff] text-lg">{position}</span>
      </section>
    );
  }
  return (
    <section className="flex px-4">
      <div className="flex gap-2">
        <TransportControl />
        <TransportSettings />
      </div>
    </section>
  );
}

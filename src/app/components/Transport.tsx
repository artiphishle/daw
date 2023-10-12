"use client";
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

import { Transport as ToneTransport, start } from "tone";

import useProjectContext from "@/app/core/hooks/api/useProjectContext";
import useTransport from "@/app/core/hooks/useTransport";
import styles from "@/app/core/config/styles";
import {
  DEFAULT_MEASURE_COUNT,
  DEFAULT_QUANTIZATION,
} from "../core/config/constants";

export enum ETransportState {
  Paused = "paused",
  Started = "started",
  Stopped = "stopped",
}

export default function Transport() {
  const css = styles.transport;
  const [position, setPosition] = useState<string>("0:0:0.000");

  const loopFn = (position: string) => setPosition(position);
  const { loop } = useTransport({ loopFn });

  const { projectContext, patchProjectContext } = useProjectContext();

  if (projectContext) {
    ToneTransport.bpm.value = projectContext.bpm;
    ToneTransport.loop = true;
    ToneTransport.loopStart = 0;
    ToneTransport.loopEnd = `${projectContext.measureCount}m`;
  }

  const events = {
    // TransportSettings
    onBpmChange: (event: ChangeEvent<HTMLInputElement>) =>
      patchProjectContext({ bpm: parseInt(event.target.value, 10) }),
    onClefChange: (event: ChangeEvent<HTMLSelectElement>) =>
      patchProjectContext({ clef: event.target.value }),
    onMeasureCountChange: (event: ChangeEvent<HTMLSelectElement>) =>
      patchProjectContext({ measureCount: parseInt(event.target.value, 10) }),
    onQuantizationChange: (event: ChangeEvent<HTMLSelectElement>) =>
      patchProjectContext({ quantization: parseInt(event.target.value, 10) }),
    // TransportControl
    onPause: (_: MouseEvent<SVGSVGElement>) => ToneTransport.pause(),
    onRecord: (_: MouseEvent<SVGSVGElement>) =>
      console.log("🎙️ Recording soon available"),
    onStart: async (_: MouseEvent<SVGSVGElement>) => {
      ToneTransport.start();
      await start();
    },
    onStop: (_: MouseEvent<SVGSVGElement>) => {
      console.log("stop");
      ToneTransport.stop();
      loop.stop();
    },
  };

  function TransportControl() {
    return (
      <div className={css.control}>
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
      <section className={css.settings.main}>
        <div className={css.settings.inner}>
          <div className={css.settings.item}>
            <label
              className={styles.transport.settings.label}
              htmlFor="clef"
              title="clef"
            ></label>
            <KeySquareIcon color="rgb(103, 232, 249)" className="w-4 h-4" />
            <select
              className="w-8 ml-1 bg-transparent"
              defaultValue={projectContext?.clef || "C"}
              id="clef"
              onChange={events.onClefChange}
              value={projectContext?.clef}
            >
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
          <div className={css.settings.item}>
            <label className={css.settings.label} htmlFor="measureCount">
              M
            </label>
            <select
              className={css.settings.input}
              defaultValue={
                projectContext?.measureCount || DEFAULT_MEASURE_COUNT
              }
              id="measureCount"
              onChange={events.onMeasureCountChange}
              value={projectContext?.measureCount || DEFAULT_MEASURE_COUNT}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div className={css.settings.item}>
            <label className={css.settings.label} htmlFor="quantization">
              Q
            </label>
            <select
              className={css.settings.input}
              defaultValue={
                projectContext?.quantization || DEFAULT_QUANTIZATION
              }
              id="quantization"
              onChange={events.onQuantizationChange}
              value={projectContext?.quantization || DEFAULT_QUANTIZATION}
            >
              <option>2</option>
              <option>4</option>
              <option>8</option>
              <option>16</option>
              <option>32</option>
              <option>64</option>
            </select>
          </div>
          <div className={css.settings.item}>
            <label
              className={css.settings.label}
              htmlFor="bpm"
              title="bpm"
            ></label>
            <TimerIcon color="rgb(103, 232, 249)" className="w-4 h-4" />
            <input
              className={css.settings.input}
              id="bpm"
              onChange={events.onBpmChange}
              value={projectContext?.bpm}
            />
            <div className={css.settings.item}>
              <span>
                <Music2Icon color="rgb(103, 232, 249)" className="w-4 h-4" />
              </span>
              &nbsp;
              <select className="bg-transparent" defaultValue="4" value="4">
                <option value="4">4/{ToneTransport.timeSignature}</option>
              </select>
            </div>
          </div>
        </div>
        <span className={css.settings.position}>{position}</span>
      </section>
    );
  }
  return (
    <section className={css.main}>
      <div className={css.inner}>
        <TransportControl />
        <TransportSettings />
      </div>
    </section>
  );
}

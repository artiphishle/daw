"use client";
import { type ChangeEvent, type MouseEvent, useState, useEffect } from "react";
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

import { Ticks, Time, Transport as ToneTransport } from "tone";

import useProjectContext from "@/app/core/hooks/api/useProjectContext";
import useTransport from "@/app/core/hooks/useTransport";
import styles from "@/app/core/config/styles";

export enum ETransportState {
  Paused = "paused",
  Started = "started",
  Stopped = "stopped",
}

export default function Transport() {
  const css = styles.transport;
  const [position, setPosition] = useState<string>("0:0:0.000");

  const loopFn = (position: string) => setPosition(position);
  useTransport({ loopFn });

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
    onClefChange: (event: ChangeEvent<HTMLInputElement>) =>
      patchProjectContext({ clef: event.target.value }),
    onMeasureCountChange: (event: ChangeEvent<HTMLInputElement>) =>
      patchProjectContext({ measureCount: parseInt(event.target.value, 10) }),
    onQuantizationChange: (event: ChangeEvent<HTMLInputElement>) =>
      patchProjectContext({ quantization: parseInt(event.target.value, 10) }),
    // TransportControl
    onPause: (_: MouseEvent<SVGSVGElement>) => ToneTransport.pause(),
    onRecord: (_: MouseEvent<SVGSVGElement>) =>
      console.log("🎙️ Recording soon available"),
    onStart: (_: MouseEvent<SVGSVGElement>) => ToneTransport.start(),
    onStop: (_: MouseEvent<SVGSVGElement>) => {
      ToneTransport.stop();
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
            <input
              className="w-4 ml-1 bg-transparent"
              id="clef"
              onChange={events.onClefChange}
              value={projectContext?.clef}
            />
          </div>
          <div className={css.settings.item}>
            <label className={css.settings.label} htmlFor="measureCount">
              M
            </label>
            <input
              className={css.settings.input}
              id="measureCount"
              onChange={events.onMeasureCountChange}
              value={projectContext?.measureCount}
            />
          </div>
          <div className={css.settings.item}>
            <label className={css.settings.label} htmlFor="quantization">
              Q
            </label>
            <input
              className={css.settings.input}
              id="quantization"
              onChange={events.onQuantizationChange}
              value={projectContext?.quantization}
            />
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
              &nbsp;<span>4/4</span>
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

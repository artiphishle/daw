"use client";
import { type ChangeEvent, type MouseEvent, useState, useEffect } from "react";
import { Transport as ToneTransport, start } from "tone";
import {
  CircleIcon,
  FastForwardIcon,
  KeySquareIcon,
  Loader,
  Music2Icon,
  PlayIcon,
  RepeatIcon,
  RewindIcon,
  SquareIcon,
  TimerIcon,
} from "lucide-react";

import useProjectContext from "@/core/hooks/api/useProjectContext";
import useTransport from "@/core/hooks/useTransport";
import styles from "config/styles";

import { EEndpoint } from "app/common/types/api.types";

export default function Transport() {
  const $ = styles.transport;
  const [position, setPosition] = useState<string>("0:0:0.000");
  const loopFn = (position: string) => setPosition(position);
  const { loop } = useTransport({ loopFn });
  const {
    projectContext: $d,
    patchProjectContext,
    mutate,
  } = useProjectContext();

  useEffect(() => {
    if (!$d) return;
    ToneTransport.bpm.value = $d.bpm;
    ToneTransport.loop = true;
    ToneTransport.loopStart = 0;
    ToneTransport.loopEnd = `${$d.measureCount}m`;
  }, [$d]);

  const events = {
    // TransportSettings
    onBpmChange: (event: ChangeEvent<HTMLSelectElement>) => {
      const bpm = parseInt(event.target.value, 10);
      patchProjectContext({ bpm });
    },
    onClefChange: (event: ChangeEvent<HTMLSelectElement>) => {
      const clef = event.target.value;
      patchProjectContext({ clef });
    },
    onMeasureCountChange: (event: ChangeEvent<HTMLSelectElement>) => {
      const measureCount = parseInt(event.target.value, 10);
      patchProjectContext({ measureCount });
    },
    onQuantizationChange: (event: ChangeEvent<HTMLSelectElement>) => {
      const quantization = parseInt(event.target.value, 10);
      patchProjectContext({ quantization });
    },
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
      <div className={$.control}>
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
      <section className={$.settings.main}>
        {$d ? (
          <div className={$.settings.inner}>
            <div className={$.settings.item}>
              <label
                className={styles.transport.settings.label}
                htmlFor="clef"
                title="clef"
              ></label>
              <KeySquareIcon color="rgb(103, 232, 249)" className="w-4 h-4" />
              <select
                className="w-8 ml-1 bg-transparent"
                defaultValue={$d.clef}
                id="clef"
                onChange={events.onClefChange}
                title="Clef"
              >
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </div>
            <div className={$.settings.item}>
              <label className={$.settings.label} htmlFor="measureCount">
                M
              </label>
              <select
                className={$.settings.input}
                defaultValue={$d.measureCount}
                id="measureCount"
                onChange={events.onMeasureCountChange}
                title="Measure Count"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <div className={$.settings.item}>
              <label className={$.settings.label} htmlFor="quantization">
                Q
              </label>
              <select
                className={$.settings.input}
                defaultValue={$d.quantization}
                id="quantization"
                onChange={events.onQuantizationChange}
                title="Quantization"
              >
                <option>2</option>
                <option>4</option>
                <option>8</option>
                <option>16</option>
                <option>32</option>
                <option>64</option>
              </select>
            </div>
            <div className={$.settings.item}>
              <label
                className={$.settings.label}
                htmlFor="bpm"
                title="bpm"
              ></label>
              <TimerIcon color="rgb(103, 232, 249)" className="w-4 h-4" />
              <select
                className={$.settings.input}
                defaultValue={$d.bpm}
                id="bpm"
                onChange={events.onBpmChange}
              >
                {new Array(50).fill("").map((x, i) => (
                  <option key={i} value={i + 79}>
                    {i + 79}
                  </option>
                ))}
                <option value={120}>108</option>
                <option value={120}>109</option>
                <option value={120}>110</option>
                <option value={120}>115</option>
                <option value={120}>120</option>
              </select>
              <div className={$.settings.item}>
                <span>
                  <Music2Icon color="rgb(103, 232, 249)" className="w-4 h-4" />
                </span>
                &nbsp;
                <select
                  className="bg-transparent"
                  defaultValue={4}
                  title="Time Signature"
                >
                  <option value="4">4/4</option>
                </select>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
        <span className={$.settings.position}>{position}</span>
      </section>
    );
  }
  return (
    <section className={$.main}>
      <div className={$.inner}>
        <TransportControl />
        <TransportSettings />
      </div>
    </section>
  );
}

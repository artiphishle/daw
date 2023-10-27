'use client';
import { type ChangeEvent, type MouseEvent, useState, useEffect } from 'react';
import * as Tone from 'tone';

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
} from 'lucide-react';

import useProjectContext from 'app/_core/hooks/api/useProjectContext';

import styles from 'app/_common/styles';
import { EEndpoint } from 'app/_common/types/api.types';
const $ = styles.transport;

export default function Transport() {
  const [position, setPosition] = useState<string>('0:0:0.000');
  const loopFn = (position: string) => setPosition(position);
  const {
    projectContext: $d,
    patchProjectContext,
    mutate,
  } = useProjectContext();

  function TransportControl() {
    const events = {
      // TransportControl
      onPause: (_: MouseEvent<SVGSVGElement>) => Tone.Transport.pause(),
      onRecord: (_: MouseEvent<SVGSVGElement>) =>
        console.log('🎙️ Recording soon available'),
      onStart: (_: MouseEvent<SVGSVGElement>) => {
        Tone.Transport.bpm.value = $d?.bpm || 120;
        Tone.Transport.loop = true;
        Tone.Transport.loopStart = 0;
        Tone.Transport.loopEnd = `${$d!.measureCount}m`;
        Tone.Transport.start();
      },
      onStop: (_: MouseEvent<SVGSVGElement>) => {
        Tone.Transport.stop();
      },
    };
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
    const events = {
      onClefChange: (event: ChangeEvent<HTMLSelectElement>) => {
        const clef = event.target.value;
        patchProjectContext({ clef });
        mutate(EEndpoint.ProjectSettings);
      },
      onMeasureCountChange: (event: ChangeEvent<HTMLSelectElement>) => {
        const measureCount = parseInt(event.target.value, 10);
        patchProjectContext({ measureCount });
        mutate(EEndpoint.ProjectSettings);
      },
      onQuantizationChange: (event: ChangeEvent<HTMLSelectElement>) => {
        const quantization = parseInt(event.target.value, 10);
        patchProjectContext({ quantization });
        mutate(EEndpoint.ProjectSettings);
      },
      // TransportSettings
      onBpmChange: (event: ChangeEvent<HTMLSelectElement>) => {
        const bpm = parseInt(event.target.value, 10);
        patchProjectContext({ bpm });
        mutate(EEndpoint.ProjectSettings);
      },
    };

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
                {new Array(50).fill('').map((x, i) => (
                  <option key={i} value={i + 79}>
                    {i + 79}
                  </option>
                ))}
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

'use client';
import * as Tone from 'tone';
import { type ChangeEvent, useState } from 'react';

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
} from 'lucide-react';

import styles from '@/common/styles';
import type { IProject } from '@/common/types/project.types';
import { patchProject } from '@/api/project/_presets/DefaultPreset';
import useTransport from '@/core/hooks/useTransport';
const $ = styles.transport;

interface ITransport {
  project: IProject;
}
export default function Transport({ project }: ITransport) {
  const { bpm, clef, measureCount, quantization } = project;
  const [position, setPosition] = useState<string>('0:0:0.000');
  const loopFn = (position: string) => {
    setPosition(position);
  };
  const { loop } = useTransport({ loopFn });

  function TransportControl() {
    const events = {
      onPause: () => Tone.Transport.pause(),
      onRecord: () => console.info('🎙️ Recording soon available'),
      onStart: () => Tone.Transport.start(),
      onStop: () => Tone.Transport.stop(),
    };
    const commonIconStyles = { fill: '#fff', className: styles.button.navbar };
    return (
      <div id="DAW_TRANSPORT_CONTROL" className={$.control}>
        <RepeatIcon {...commonIconStyles} onClick={events.onStop} />
        <RewindIcon {...commonIconStyles} onClick={events.onStop} />
        <FastForwardIcon {...commonIconStyles} onClick={events.onStop} />
        <SquareIcon {...commonIconStyles} fill="#00f" onClick={events.onStop} />
        <PlayIcon {...commonIconStyles} fill="#0f0" onClick={events.onStart} />
        <CircleIcon
          {...commonIconStyles}
          fill="#f00"
          onClick={events.onRecord}
        />
      </div>
    );
  }

  function TransportSettings() {
    const patch = (patch: Partial<IProject>) => {
      const patched = patchProject(patch);
      console.log('patched', patched);
      // mutate(EEndpoint.ProjectSettings);
    };
    const events = {
      onClefChange: (event: ChangeEvent<HTMLSelectElement>) => {
        patch({ clef: event.target.value });
      },
      onMeasureCountChange: (event: ChangeEvent<HTMLSelectElement>) => {
        patch({ measureCount: parseInt(event.target.value, 10) });
      },
      onQuantizationChange: (event: ChangeEvent<HTMLSelectElement>) => {
        patch({ quantization: parseInt(event.target.value, 10) });
      },
      onBpmChange: (event: ChangeEvent<HTMLSelectElement>) => {
        patch({ bpm: parseInt(event.target.value, 10) });
      },
    };

    return (
      <section id="DAW_TRANSPORT_SETTINGS" className={$.settings.main}>
        <div className={$.settings.inner}>
          <div className={$.settings.item}>
            <label
              className={styles.transport.settings.label}
              htmlFor="clef"
              title="clef"
            ></label>
            <KeySquareIcon
              color="rgb(103, 232, 249)"
              className={styles.icon.sm}
            />
            <select
              className="w-8 ml-1 bg-transparent"
              defaultValue={clef}
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
              defaultValue={measureCount}
              id="measureCount"
              onChange={events.onMeasureCountChange}
              title="Measure Count"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
            </select>
          </div>
          <div className={$.settings.item}>
            <label className={$.settings.label} htmlFor="quantization">
              Q
            </label>
            <select
              className={$.settings.input}
              defaultValue={quantization}
              id="quantization"
              onChange={events.onQuantizationChange}
              title="Quantization"
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
              <option value="64">64</option>
              <option value="128">128</option>
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
              defaultValue={bpm}
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

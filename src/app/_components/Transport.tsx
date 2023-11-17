'use client';
import { type ChangeEvent, useState } from 'react';
import * as Tone from 'tone';
import { Note } from 'tonal';

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

import { patchProject } from '@/api/project/_presets/DefaultPreset';
import { useTransport } from '@/core/hooks';

import type { IProject, ITransport } from '@/common/types/project.types';

import styles from '@/common/styles';
const $ = styles.transport;

export function Transport({ project, setProject }: ITransport) {
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
      onStart: () => {
        loop.start();
        Tone.Transport.start();
      },
      onStop: () => {
        loop.stop();
        Tone.Transport.stop();
      },
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
    const patch = async (patch: Partial<IProject>) => {
      await patchProject(patch);
    };
    const events = {
      onClefChange: (event: ChangeEvent<HTMLSelectElement>) => {
        const clef = event.target.value;
        console.log({ clef });
        setProject({ ...project, clef });
        patch({ clef });
      },
      onMeasureCountChange: (event: ChangeEvent<HTMLSelectElement>) => {
        const measureCount = parseInt(event.target.value, 10);
        setProject({ ...project, measureCount });
        console.log({ measureCount });
        patch({ measureCount });
      },
      onQuantizationChange: (event: ChangeEvent<HTMLSelectElement>) => {
        const quantization = parseInt(event.target.value, 10);
        setProject({ ...project, quantization });
        patch({ quantization });
      },
      onBpmChange: (event: ChangeEvent<HTMLSelectElement>) => {
        const bpm = parseInt(event.target.value, 10);
        setProject({ ...project, bpm });
        patch({ bpm });
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
              {Note.names().map((note: string) => (
                <option key={note} value={note}>
                  {note}
                </option>
              ))}
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
              {['1', '2', '4', '8'].map((num) => (
                <option key={`measure-count-${num}`} value={num}>
                  {num}
                </option>
              ))}
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
              {['2', '4', '8', '16', '32'].map((num) => (
                <option key={`measure-count-${num}`} value={num}>
                  {num}
                </option>
              ))}
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

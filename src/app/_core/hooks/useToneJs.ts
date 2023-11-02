'use client';
import * as Tone from 'tone';
import { fetchProject } from '@/api/project/_presets/DefaultPreset';
import { useState } from 'react';
import { IProject } from '@/common/types/project.types';

export function useToneJs() {
  const [toneReady, setToneReady] = useState(false);

  function initTransport(project: IProject) {
    console.info('[useToneJs] initTransport');
    Tone.Transport.bpm.value = project.bpm;
    Tone.Transport.swing = project.swing;
    Tone.Transport.swingSubdivision = project.swingSubdivision;
    Tone.Transport.loop = true;
    Tone.Transport.loopStart = 0;
    Tone.Transport.loopEnd = `${project.measureCount}m`;
  }

  /*** @issue replace with efficient preloader */
  const init = async () => {
    console.info('[useToneJs] init');

    await Tone.start();
    console.info('[useToneJs] init done');

    initTransport(await fetchProject());
    console.info('[useToneJs] initTransport done');

    setToneReady(true);
  };

  return {
    toneReady,
    init,
  };
}

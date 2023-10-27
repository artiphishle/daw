import _ from 'lodash/fp';
import * as Tone from 'tone';

import type { IMidiPart } from 'app/_common/types/midi.types';
import type { UniqueIdentifier } from 'app/_common/types/utility.types';

import { getMeasureSeconds, getNotationSeconds } from 'app/_common/constants';
import { useState } from 'react';
import { Note } from 'tone/build/esm/core/type/NoteUnits';
import { noteFramesToTime } from '@spotify/basic-pitch';
const one16 = getNotationSeconds(16);
const oneM = getMeasureSeconds(1);

interface IUseScheduler {
  id: UniqueIdentifier;
  instrument: any;
  parts: IMidiPart[];
}

export default function useAudioScheduler() {
  // @issue https://github.com/artiphishle/daw/issues/87
  const setupPlayer = ({ instrument, parts = [] }: IUseScheduler) => {
    parts.forEach((part, pIndex) =>
      part.times!.forEach((time) => {
        const t = time * getNotationSeconds(16) + pIndex * getMeasureSeconds(1);
        instrument.sync().start(t);
      }),
    );
  };
  function setupSampler({ id, instrument, parts = [] }: IUseScheduler) {
    if (id === 'track-instrument-bass') {
      return parts.forEach(({ notes }) => {
        notes?.forEach((note, noteIndex) => {
          (instrument as Tone.MonoSynth)
            .triggerAttackRelease(note[0], one16, one16 * noteIndex, 80)
            .sync();
        });
      });
    }
    const interval = setInterval(() => {
      if (!(instrument as Tone.Sampler).loaded) return;
      clearInterval(interval);

      parts.forEach(({ notes }, partIndex) => {
        notes?.forEach((note, noteIndex) => {
          (instrument as Tone.Sampler)
            .triggerAttackRelease(
              note,
              one16,
              partIndex * oneM + noteIndex * one16,
              noteIndex % 2 ? 100 : 94, // velocity one/three pronounced
            )
            .sync();
        });
      });
    }, 50);
  }
  const setupSynth = setupSampler;

  const setupInstrument = (options: IUseScheduler) => {
    // @issue don't force id to start with something specific
    switch ((options.id as string).split('-')[0]) {
      case 'track':
        setupSynth(options);
        break;
      case 'sampler':
        setupSampler(options);
        break;
      case 'Player':
        setupPlayer(options);
        break;
      default:
        console.warn(
          '[useAudioScheduler>setupInstrument]: Not supported yet:',
          options.id,
        );
        break;
    }
  };
  return { setupInstrument };
}

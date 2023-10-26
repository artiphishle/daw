import _ from 'lodash/fp';
import * as Tone from 'tone';

import type { IMidiPart } from 'app/common/types/midi.types';
import type { UniqueIdentifier } from '@dnd-kit/core';

import { getMeasureSeconds, getNotationSeconds } from '@/common/constants';
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
      })
    );
  };
  function setupSampler({ id, instrument, parts = [] }: IUseScheduler) {
    if (id === 'track-instrument-bass') {
      return parts.forEach(({ notes }) => {
        new Tone.Sequence((time, note) => {
          (instrument as Tone.MonoSynth).triggerAttackRelease(
            note,
            '4n',
            time,
            80
          );
        }, notes).start(0);
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
              noteIndex % 2 ? 100 : 94 // velocity one/three pronounced
            )
            .sync();
        });
      });
    }, 50);
  }
  const setupSynth = setupSampler;

  const setupInstrument = (options: IUseScheduler) => {
    console.info('[useAudioScheduler] id:', options.id);
    // @issue don't force id to start with something specific
    switch ((options.id as string).split('-')[0]) {
      case 'track':
        setupSynth(options);
        break;
      case 'sampler':
        setupSampler(options);
        break;
      case 'player':
        setupPlayer(options);
        break;
      default:
        console.warn(
          '[useAudioScheduler>setupInstrument]: Not supported yet:',
          options.id
        );
        break;
    }
  };
  return { setupInstrument };
}

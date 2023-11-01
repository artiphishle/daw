'use client';
import _ from 'lodash/fp';
import * as Tone from 'tone';

import type { IMidiPart } from '@/common/types/midi.types';
import type { UniqueIdentifier } from '@/common/types/utility.types';

// import { noteFramesToTime } from '@spotify/basic-pitch';

interface IUseScheduler {
  id: UniqueIdentifier;
  instrument: any;
  parts: IMidiPart[];
}

export default function useAudioScheduler() {
  const ROMAN_NUMS = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];
  const getMeasureTime = (n: number) => Tone.Time(`${n}m`);
  const getMeasureSeconds = (n: number) => getMeasureTime(n).toSeconds();
  const getNotationTime = (n: number) => Tone.Time(`${n}n`);
  const getNotationSeconds = (n: number) => getNotationTime(n).toSeconds();
  const isRomanNum = (s: string) => ROMAN_NUMS.includes(_.toLower(s));

  const one16 = getNotationSeconds(16);
  const oneM = getMeasureSeconds(1);
  // @issue https://github.com/artiphishle/daw/issues/87
  const setupInstrument = (options: IUseScheduler) => {
    const { id, instrument, parts } = options;

    // @issue don't force id to start with something specific
    switch ((options.id as string).split('-')[0]) {
      case 'sampler':
      case 'track':
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
        break;
      case 'Player':
        parts.forEach((part, pIndex) =>
          part.times!.forEach((time) => {
            const t =
              time * getNotationSeconds(16) + pIndex * getMeasureSeconds(1);
            instrument.sync().start(t);
          }),
        );
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

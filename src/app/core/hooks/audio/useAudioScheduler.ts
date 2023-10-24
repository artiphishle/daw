import _ from 'lodash/fp';
import * as Tone from 'tone';

import type { IMidiPart, IPlayerEvent } from 'app/common/types/midi.types';
import type { UniqueIdentifier } from '@dnd-kit/core';

interface IUseScheduler {
  id: UniqueIdentifier;
  player: Tone.Player;
  measureCount: number;
  windowWidth: number;
  parts: IMidiPart[];
}

export default function useAudioScheduler() {
  function setupPlayer({
    windowWidth,
    measureCount,
    player,
    parts = [],
  }: IUseScheduler) {
    const measureWidth = windowWidth / measureCount;
    parts.forEach((part, partIndex) => {
      Tone.Transport.scheduleRepeat((time) => {
        part.events.forEach(({ duration, x }) => {
          const t =
            x * Tone.Time('16n').toSeconds() +
            time +
            partIndex * Tone.Time('1m').toSeconds();
          player.start(t, 0, duration);
        });
      }, `${measureCount}m`);
    });
  }
  return { setupPlayer };
}

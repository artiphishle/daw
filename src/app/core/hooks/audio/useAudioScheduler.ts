import _ from "lodash/fp";
import * as Tone from "tone";

import type { IMidiPart, IPlayerEvent } from "app/common/types/midi.types";
import type { UniqueIdentifier } from "@dnd-kit/core";

interface IUseScheduler {
  id: UniqueIdentifier;
  player: Tone.Player;
  measureCount: number;
  parts: IMidiPart[];
}

export default function useAudioScheduler() {
  function setupPlayer({ player, parts = [] }: IUseScheduler) {
    parts.forEach((part, partIndex) => {
      const cb = (t: number, { note }: IPlayerEvent) => {
        note &&
          player.start(t + partIndex * Tone.Time("1m").toSeconds(), 0, "+8n");
      };
      new Tone.Sequence(cb, part.events).start(0);
    });
  }
  return { setupPlayer };
}

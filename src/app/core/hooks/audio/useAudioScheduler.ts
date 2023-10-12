import _ from "lodash/fp";
import { Player, Players, Sequence } from "tone";
import { useWindowWidth } from "@react-hook/window-size";

import { DEFAULT_OFFSET_LEFT } from "@/constants";

import type { TInstrument } from "@/types/instrument";
import type { IMidiEvent, IMidiEventPos, TMidiPart } from "@/types/midi";
import type { UniqueIdentifier } from "@dnd-kit/core";

interface IUseScheduler {
  id: UniqueIdentifier;
  instrument: TInstrument;
  measureCount?: number;
  parts: TMidiPart[];
}

export default function useAudioScheduler() {
  const windowWidth = useWindowWidth() - DEFAULT_OFFSET_LEFT;

  function setup({ instrument, parts = [] }: IUseScheduler) {
    return parts.map((part) => {
      const h = 100 / part.sequences.length;
      let notes: IMidiEventPos[];
      return part.sequences.map((sequence) => {
        if ((instrument as Players).player) {
          const players = instrument as Players;
          if (_.isArray(sequence.events)) {
            notes = (sequence.events as IMidiEventPos[]).map(({ n, v }) => {
              return { n, v } as IMidiEventPos;
            });
          }
        }
        return new Sequence((t, { n, v }) => {
          console.log(n, t);
          if (!n) return;

          if ((instrument as Players).player) {
            return (instrument as Players).player(n).start(t);
          }
          return (instrument as any).triggerAttackRelease(n, "16n", t, v);
        }, notes || sequence.events).start(0);
      });
    });
  }
  return { setup };
}

import _ from "lodash/fp";
import { Player, Players, Sequence, Time } from "tone";

import type { TInstrument } from "app/common/types/instrument.types";
import type { IMidiEventPos, TMidiPart } from "app/common/types/midi.types";
import type { UniqueIdentifier } from "@dnd-kit/core";
import {
  Instrument,
  InstrumentOptions,
} from "tone/build/esm/instrument/Instrument";

interface IUseScheduler {
  id: UniqueIdentifier;
  instrument: TInstrument;
  measureCount?: number;
  parts: TMidiPart[];
}

export default function useAudioScheduler() {
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
          if (!n) return;
          if ((instrument as Players).player)
            return (instrument as Players)
              .player(n)
              .start(t + Time("16n").toSeconds());
          return (
            instrument as Instrument<InstrumentOptions>
          )?.triggerAttackRelease(n, "16n", t + Time("16n").toSeconds(), v);
        }, notes || sequence.events).start(0);
      });
    });
  }
  return { setup };
}

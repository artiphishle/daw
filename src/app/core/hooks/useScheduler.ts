import { Sequence, Transport } from "tone";

import { EInstrument, type TInstrument } from "@/app/types/daw";
import { useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Note } from "tone/build/esm/core/type/NoteUnits";

export default function useScheduler() {
  const [sequence, setSequence] = useState<Sequence | null>(null);

  function setup(
    instrument: TInstrument,
    id: UniqueIdentifier,
    measureCount: number,
    notes: Note[]
  ) {
    const isSampler = EInstrument.Sampler === (id as EInstrument);
    const isNoise = [EInstrument.NoiseSynth, EInstrument.MetalSynth].includes(
      id as EInstrument
    );

    const seq = new Sequence(
      (time, note) => {
        const n = note as unknown as Note;
        if (isSampler) {
          instrument.triggerAttackRelease(n, "16n", time, 0.8);
        } else if (isNoise) {
          instrument.triggerAttackRelease("8n", time);
        } else {
          instrument.triggerAttackRelease(n, "8n", time, 0.8);
        }
      },
      notes,
      "4n"
    ).start(0);

    return setSequence(seq);
  }

  function dispose() {
    sequence?.dispose();
    setSequence(null);
  }

  Transport.on("stop", () => {
    console.log("stop");
    dispose();
  });

  return { setup, dispose };
}

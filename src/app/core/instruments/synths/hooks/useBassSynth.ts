import { MonoSynth, type MonoSynthOptions } from "tone";
import type { RecursivePartial } from "tone/build/esm/core/util/Interface";

export default function useBassSynth({
  volume = -24,
  oscillator = { type: "sawtooth" },
  envelope = { attack: 0.1, decay: 0.3, sustain: 0.7, release: 2 },
  filterEnvelope = {
    attack: 0.001,
    decay: 0.01,
    sustain: 0.5,
    release: 0.1,
    baseFrequency: 200,
    octaves: 2.6,
  },
  ...rest
}: RecursivePartial<MonoSynthOptions>) {
  const bassSynth = new MonoSynth({
    oscillator,
    envelope,
    filterEnvelope,
    ...rest,
  });

  return bassSynth;
}

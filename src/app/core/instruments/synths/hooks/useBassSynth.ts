import { MonoSynth, type MonoSynthOptions } from "tone";
import type { RecursivePartial } from "tone/build/esm/core/util/Interface";

export default function useBassSynth({
  oscillator = { type: "sawtooth" },
  envelope = { attack: 0.1, decay: 0.3, release: 2, sustain: 0.7 },
  filterEnvelope = {
    attack: 0.001,
    baseFrequency: 200,
    decay: 0.01,
    octaves: 2.6,
    release: 0.1,
    sustain: 0.5,
  },
  volume = -24,
  ...rest
}: RecursivePartial<MonoSynthOptions>) {
  const bassSynth = new MonoSynth({
    envelope,
    filterEnvelope,
    oscillator,
    volume,
    ...rest,
  });

  return bassSynth;
}

import { Synth, type SynthOptions } from "tone";
import type { RecursivePartial } from "tone/build/esm/core/util/Interface";

export default function useBassSynth() {
  const osc: RecursivePartial<SynthOptions> = {
    oscillator: { type: "amsawtooth" },
  };
  const bassSynth = new Synth(osc).toDestination();

  return bassSynth;
}

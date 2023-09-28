import { Synth, SynthOptions } from "tone";

export default function useSynth({ volume = -24, ...rest }: SynthOptions) {
  return new Synth({ volume, ...rest });
}

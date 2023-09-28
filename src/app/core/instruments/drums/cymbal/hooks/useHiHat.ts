import { NoiseSynth, NoiseSynthOptions } from "tone";
import { RecursivePartial } from "tone/build/esm/core/util/Interface";

export default function useHiHat({
  noise = { type: "white", fadeIn: 0.1 },
  volume = -20,
  ...rest
}: RecursivePartial<NoiseSynthOptions>) {
  return new NoiseSynth({ noise, volume, ...rest });
}

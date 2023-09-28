import { NoiseSynth, type NoiseSynthOptions } from "tone";
import { RecursivePartial } from "tone/build/esm/core/util/Interface";

export default function useSnareDrum({
  noise = { type: "white" },
  volume = -24,
  envelope = { attack: 0.001, decay: 0.2, sustain: 0.2, release: 0.2 },
  ...rest
}: RecursivePartial<NoiseSynthOptions>) {
  return new NoiseSynth({ noise, volume, envelope, ...rest });
}

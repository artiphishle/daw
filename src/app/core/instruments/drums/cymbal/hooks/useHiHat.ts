import { NoiseSynth } from "tone";

interface IUseHiHat {
  open?: boolean;
}

export default function useHiHat({ open = false }: IUseHiHat) {
  return open
    ? new NoiseSynth({
        noise: { type: "white", fadeIn: 0.1 },
        volume: -24,
      })
    : new NoiseSynth({
        noise: { type: "white", fadeIn: 0.1 },
        volume: -24,
      });
}

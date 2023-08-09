import { NoiseSynth } from "tone";

interface IUseHiHatProps {
  open?: boolean;
}

export default function useHiHat({ open = false }: IUseHiHatProps) {
  const openHiHat = new NoiseSynth({
    noise: { type: "white", fadeIn: 0.1 },
  }).toDestination();

  return openHiHat;
}

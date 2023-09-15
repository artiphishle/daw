import { MonoSynth } from "tone";

export default function useBassSynth() {
  const bassSynth = new MonoSynth({
    volume: -24,
  });

  return bassSynth;
}

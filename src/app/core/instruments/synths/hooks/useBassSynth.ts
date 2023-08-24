import { Synth } from "tone";

import useOscillator from "@/app/core/instruments/synths/hooks/useOscillator";

export default function useBassSynth() {
  const oscillator = useOscillator({ type: "triangle" });
  const bassSynth = new Synth().toDestination();

  return bassSynth;
}

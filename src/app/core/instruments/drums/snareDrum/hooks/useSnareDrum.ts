import { NoiseSynth } from "tone";

export default function useSnareDrum() {
  const snareDrum = new NoiseSynth({
    noise: { type: "white" },
    envelope: { attack: 0, decay: 0.2, sustain: 0.1, release: 0.2 },
  }).toDestination();

  return snareDrum;
}

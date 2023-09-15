import { NoiseSynth } from "tone";

export default function useSnareDrum() {
  const options = {
    type: "white",
    volume: -24,
    envelope: {
      attack: 0,
      decay: 0.2,
      sustain: 0.2,
      release: 0.2,
    },
  };

  return new NoiseSynth(options);
}

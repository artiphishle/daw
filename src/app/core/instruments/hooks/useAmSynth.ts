import { AMSynth } from "tone";

export default function useAmSynth() {
  const amSynth = new AMSynth({
    detune: 0,
    envelope: {
      attack: 0.0001,
      decay: 0.01,
      release: 0.5,
      sustain: 1,
    },
    harmonicity: 5 / 1,
    modulation: { type: "square" },
    modulationEnvelope: {
      attack: 0.005,
      decay: 0,
      release: 0.5,
      sustain: 1,
    },
    oscillator: { type: "sine" },
  });

  return amSynth;
}

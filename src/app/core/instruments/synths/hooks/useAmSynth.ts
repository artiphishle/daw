import { AMSynth } from "tone";

export default function useAmSynth() {
  // const amSynth = new AMSynth(props);
  const amSynth = new AMSynth({
    detune: 0,
    harmonicity: 5 / 1,
    oscillator: { type: "sine" }, // carrier
    envelope: {
      attack: 0.0001,
      decay: 0.01,
      sustain: 1,
      release: 0.5,
    },
    modulation: { type: "square" },
    modulationEnvelope: {
      attack: 0.005,
      decay: 0,
      sustain: 1,
      release: 0.5,
    },
  });

  return amSynth;
}

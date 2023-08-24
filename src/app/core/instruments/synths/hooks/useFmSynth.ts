import { FMSynth, type FMSynthOptions } from "tone";

export default function useFmSynth(props: FMSynthOptions) {
  // const amSynth = new FMSynth(props);
  const fmSynth = new FMSynth({
    detune: 0,
    harmonicity: 5 / 1,
    oscillator: { type: "sine" }, // carrier
    envelope: {
      attack: 0.01,
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
  }).toDestination();

  return fmSynth;
}

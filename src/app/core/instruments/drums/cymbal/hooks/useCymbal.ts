import { Filter, MetalSynth } from "tone";

export default function useCymbal() {
  const lpFilter = new Filter({ frequency: 2000 }).toDestination();
  const envelope = { attack: 0.2, decay: 0.01, sustain: 0.01, release: 0.8 };
  const cymbal = new MetalSynth({ envelope, detune: 0.1, volume: -24 }).connect(
    lpFilter
  );

  return cymbal;
}

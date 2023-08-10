import { Filter, MetalSynth, Synth, type SynthOptions } from "tone";
import { RecursivePartial } from "tone/build/esm/core/util/Interface";

const lpFilter = new Filter({ frequency: 2000 }).toDestination();
const cymbalEnv = { attack: 0.2, decay: 0.01, sustain: 0.01, release: 0.8 };
const cymbal = new MetalSynth({ envelope: cymbalEnv, detune: 0.1 }).connect(
  lpFilter
);

const osc: RecursivePartial<SynthOptions> = {
  oscillator: { type: "amsawtooth" },
};
const bassSynth = new Synth(osc).toDestination();

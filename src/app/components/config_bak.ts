import {
  Filter,
  MembraneSynth,
  MetalSynth,
  NoiseSynth,
  Synth,
  type SynthOptions,
} from "tone";
import { RecursivePartial } from "tone/build/esm/core/util/Interface";

// Instruments
const baseDrum = new MembraneSynth().toDestination();
const snareDrum = new NoiseSynth({
  noise: { type: "white" },
  envelope: { attack: 0, decay: 0.2, sustain: 0.1, release: 0.2 },
}).toDestination();

const openHiHat = new NoiseSynth({
  noise: { type: "white", fadeIn: 0.1 },
}).toDestination();

const lpFilter = new Filter({ frequency: 2000 }).toDestination();
const cymbalEnv = { attack: 0.2, decay: 0.01, sustain: 0.01, release: 0.8 };
const cymbal = new MetalSynth({ envelope: cymbalEnv, detune: 0.1 }).connect(
  lpFilter
);

const osc: RecursivePartial<SynthOptions> = {
  oscillator: { type: "amsawtooth" },
};
const bassSynth = new Synth(osc).toDestination();

/*
const instruments = [
  { name: "BD", instrument: baseDrum, notes: [] },
  { name: "SD", instrument: snareDrum, notes: snareDrumNotes },
  { name: "OH", instrument: openHiHat, notes: openHiHatNotes },
  { name: "CY", instrument: cymbal, notes: cymbalNotes },
  { name: "BA", instrument: bassSynth, notes: bassSynthNotes },
];
*/

// instruments.map(({ instrument, name: label, notes }) => {});

// const stepSequencerConfig = { tracks: [...instruments] };

const config = {
  // TODO load dynamically when used in project
  tracks: [{ type: "sequencer", tracks: [] }],
};

export default config;

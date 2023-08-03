import { PolySynth as PSynth, Synth } from "tone";
import useMidiKeys from "../hooks/useMidiKeys";

export default function PolySynth() {
  const polySynth = new PSynth(Synth, { detune: -1.4 }).toDestination();
  const MidiKeys = () => useMidiKeys({ octaves: 4, synth: polySynth });

  return (
    <div className="flex-col bg-blue-300 p-2">
      <h3 className="mb-2 font-black">polySynth</h3>
      <MidiKeys />
    </div>
  );
}

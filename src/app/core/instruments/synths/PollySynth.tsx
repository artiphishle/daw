import { PolySynth, Synth } from "tone";

import useMidiKeys from "@/app/hooks/useMidiKeys";

export default function PollySynth() {
  const polySynth = new PolySynth(Synth, {
    detune: -1.4,
  }).toDestination();

  const MidiKeys = () => useMidiKeys({ octaves: 7, instrument: polySynth });

  // TODO should be 'absolute' if DnD
  return (
    <div className="handle flex-col bg-blue-300 p-2">
      <h3 className="mb-2 font-black">Verdis ASynth</h3>
      <MidiKeys />
    </div>
  );
}

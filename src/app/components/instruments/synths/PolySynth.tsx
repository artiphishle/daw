import * as Tone from "tone";
import useMidiKeys from "@/app/hooks/useMidiKeys";

export default function PolySynth() {
  const polySynth = new Tone.PolySynth(Tone.Synth, {
    detune: -1.4,
  }).toDestination();

  const MidiKeys = () => useMidiKeys({ octaves: 7, instrument: polySynth });

  return (
    <div className="handle absolute flex-col top-[450px] left-[50px] bg-blue-300 p-2">
      <h3 className="mb-2 font-black">Verdis ASynth</h3>
      <MidiKeys />
    </div>
  );
}

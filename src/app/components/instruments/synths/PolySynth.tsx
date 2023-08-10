import { PolySynth as PSynth, Synth } from "tone";
import useReactDraggable from "../../ui/useReactDraggable";

import useMidiKeys from "@/app/hooks/useMidiKeys";

export default function PolySynth() {
  const { Draggable, props } = useReactDraggable();

  const polySynth = new PSynth(Synth, { detune: -1.4 }).toDestination();
  const MidiKeys = () => useMidiKeys({ octaves: 4, synth: polySynth });

  return (
    <Draggable {...props} axis="both">
      <div className="handle absolute flex-col bg-blue-300 p-2">
        <h3 className="mb-2 font-black">polySynth</h3>
        <MidiKeys />
      </div>
    </Draggable>
  );
}

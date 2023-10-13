import { PolySynth, Synth } from "tone";

import useMidiKeys from "@/core/hooks/useMidiKeys";
import { Draggable } from "@/components";
import { GripIcon } from "lucide-react";

export default function PollySynth() {
  const polySynth = new PolySynth(Synth, { detune: -1.4 }).toDestination();
  const MidiKeys = () => useMidiKeys({ instrument: polySynth, octaves: 7 });

  return (
    <Draggable id="pollysynth">
      <section className="absolute top-[30%] right-2 z-50">
        <div className="handle flex-col bg-blue-300 p-2">
          <GripIcon className="absolute top-1 right-1 w-6 h-6" />
          <h3 className="mb-2 font-black">Verdis ASynth</h3>
          <MidiKeys />
        </div>
      </section>
    </Draggable>
  );
}

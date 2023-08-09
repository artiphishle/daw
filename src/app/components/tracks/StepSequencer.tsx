import { type ChangeEvent, useState } from "react";
import { Time, Transport } from "tone";

import useReactDraggable from "../ui/useReactDraggable";

import type { IStepSequencerTrackConfig } from "./types";

export default function StepSequencerTrack({
  tracks: trcks,
}: IStepSequencerTrackConfig) {
  const [tracks, setTracks] = useState(trcks);
  const [stepCount] = useState(trcks[0].steps.length);
  const { Draggable, props } = useReactDraggable();

  function repeat(time: number) {
    new Array(stepCount).fill("").map((_, stepIndex) => {
      tracks.forEach(({ instrument, steps }) => {
        const { active, key } = steps[stepIndex];
        const stepTime = stepIndex * Time("8n").toSeconds() + time;

        if (active) instrument.triggerAttackRelease(key, "8n", stepTime);
      });
    });
  }
  Transport.scheduleRepeat(repeat, "1n");

  function onToggleStep(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const trackIndex = parseInt(target.getAttribute("data-track-index")!);
    const stepIndex = parseInt(target.getAttribute("data-step-index")!);

    let newTracks = [...tracks];
    const step = newTracks[trackIndex].steps[stepIndex];
    step.active = step.active ? false : true;

    setTracks(newTracks);
  }

  return (
    <Draggable {...props}>
      <div className="handle bg-amber-100 p-4">
        <ol>
          {tracks.map(({ steps }, trackIndex) => (
            <li key={`track-${trackIndex}`} className="block">
              {steps.map((step, stepIndex) => (
                <div className="inline mr-1" key={stepIndex}>
                  <label title="pad" htmlFor={`input-${stepIndex}`} />
                  <input
                    id={`input-${stepIndex}`}
                    type="checkbox"
                    data-track-index={trackIndex}
                    data-step-index={stepIndex}
                    onChange={onToggleStep}
                    checked={step.active}
                  />
                </div>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </Draggable>
  );
}

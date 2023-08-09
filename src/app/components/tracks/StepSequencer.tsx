import { type ChangeEvent, useState } from "react";
// import ReactDraggable from "react-draggable";
import { Time, Transport } from "tone";

import type { IStepSequencerTrackConfig } from "./types";

export default function StepSequencerTrack({
  tracks: trcks,
}: IStepSequencerTrackConfig) {
  const [tracks, setTracks] = useState(trcks);
  const [stepCount, setStepCount] = useState(trcks[0].steps.length);

  function repeat(time: number) {
    [0, 1, 2, 3, 4, 5, 6, 7].map((_, stepIndex) => {
      tracks.forEach(({ instrument, steps }) => {
        const { active, key } = steps[stepIndex];
        const stepTime = stepIndex * Time("8n").toSeconds() + time;

        if (active) instrument.triggerAttackRelease(key, "8n", stepTime);
      });
    });

    /*
    trcks.map(({ instrument, steps }) => {
      steps.forEach(({ active, key }) => {
        if (active) instrument.triggerAttackRelease(key, "8n", time);
      });
    });
    */
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
    <div>
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
  );
}

/*
function Draggable() {
  function handleStart() {}
  function handleDrag() {}
  function handleStop() {}

  return (
    <ReactDraggable
      axis="x"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={undefined}
      grid={[25, 25]}
      scale={1}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <div></div>
    </ReactDraggable>
  );
}
*/

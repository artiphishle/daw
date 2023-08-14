import { type ChangeEvent, useState } from "react";
import { Time, Transport } from "tone";
import SnareDrum from "../instruments/drums/snareDrum/SnareDrum";

import type { IStepSequencerTrackConfig } from "./types";

export default function StepSequencerTrack({
  tracks: trcks,
}: IStepSequencerTrackConfig) {
  const [tracks, setTracks] = useState(trcks);
  const [stepCount] = useState(trcks[0].steps.length);

  function repeat(time: number) {
    new Array(stepCount).fill("").map((_, stepIndex) => {
      tracks.forEach(({ instrument, steps }) => {
        const { active, key } = steps[stepIndex];
        const stepTime = stepIndex * Time("8n").toSeconds() + time;

        if (!active) return;
        key
          ? instrument.triggerAttackRelease(key, "8n", stepTime)
          : instrument.triggerAttackRelease("8n", stepTime);
      });
    });
  }
  Transport.scheduleRepeat(repeat, Time("1n").toSeconds() * 2);

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
    <div className="bg-gray-900 text-white p-4 flex flex-1 w-full justify-between">
      <ol>
        {tracks.map(({ name, steps }, trackIndex) => (
          <li key={`track-${trackIndex}`} className="block">
            <div className=" text-sm inline-block w-20">{name}</div>
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

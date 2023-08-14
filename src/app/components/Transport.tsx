"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { PauseIcon, PlayIcon } from "lucide-react";
import * as Tone from "tone";

const DEFAULT_BPM = 120;

export default function Transport() {
  const [bpm, setBpm] = useState(DEFAULT_BPM);

  // BPM change
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
    console.info("Change", "bpm:", Tone.Transport.bpm.value);
  }, [bpm]);

  function onClickPlay() {
    Tone.Transport.start();
    return console.info("Transport 'start'", Tone.Transport.now());
  }

  function onClickStop() {
    Tone.Transport.stop();
    return console.info("Transport 'stop'", Tone.Transport.now());
  }

  function onChangeBpm(event: ChangeEvent<HTMLInputElement>) {
    setBpm(parseInt(event.target.value));
  }

  return (
    <div className="flex py-1 px-4">
      <div className="flex gap-2">
        <div className="flex items-center text-white px-4 mx-2 border-r border-r-[#555]">
          {Tone.Transport.state === "stopped" ? (
            <PlayIcon onClick={onClickPlay} />
          ) : (
            <PauseIcon onClick={onClickStop} />
          )}
        </div>
        <div>
          <label className="text-xs" htmlFor="bpm">
            BPM:
          </label>
          <input
            className="w-8 ml-2 bg-transparent"
            id="bpm"
            onChange={onChangeBpm}
            value={bpm}
          />
        </div>
        <div className="flex items-center">
          <div className="text-xs mr-2">Beat:</div>
          <div>4/4</div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { PlayIcon, SkipBackIcon, SkipForwardIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { start, Transport as Transp } from "tone";

const DEFAULT_BPM = 94;

export default function Transport() {
  const [bpm, setBpm] = useState(DEFAULT_BPM);

  useEffect(() => {
    Transp.bpm.value = bpm;
    console.info("Change", "bpm:", Transp.bpm.value);
  }, [bpm]);

  async function onClickPlay() {
    await start();

    if (Transp.state === "started") return Transp.stop();

    Transp.start();

    console.log("now:", Transp.now(), Transp.state);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setBpm(parseInt(event.target.value));
  }

  return (
    <div className="flex py-1 px-4">
      <div className="flex gap-2">
        <div className="flex items-center text-white">
          <PlayIcon onClick={onClickPlay} className="bg-black mr-1" />
          <SkipBackIcon className="bg-black mr-1" />
          <SkipForwardIcon className="bg-black mr-1" />
        </div>
        <div>
          <label className="text-xs" htmlFor="bpm">
            BPM:
          </label>
          <input
            className="w-8 ml-2 bg-transparent"
            id="bpm"
            onChange={onChange}
            value={bpm}
          />
        </div>
        <div className="flex items-center">
          <div className="text-xs">Beat:</div>
          <div>4/4</div>
        </div>
      </div>
    </div>
  );
}

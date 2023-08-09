"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { PlayIcon, SkipBackIcon, SkipForwardIcon } from "lucide-react";
import { start, Transport } from "tone";

const DEFAULT_BPM = 94;

export default function Transporter() {
  const [bpm, setBpm] = useState(DEFAULT_BPM);

  // BPM change
  useEffect(() => {
    Transport.bpm.value = bpm;
    console.info("Change", "bpm:", Transport.bpm.value);
  }, [bpm]);

  async function onClickPlay() {
    await start();

    if (Transport.state === "started") {
      Transport.stop();
      return console.info("Transport 'stop'", Transport.now());
    }
    Transport.start();
    return console.info("Transport 'start'", Transport.now());
  }

  function onChangeBpm(event: ChangeEvent<HTMLInputElement>) {
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
            onChange={onChangeBpm}
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

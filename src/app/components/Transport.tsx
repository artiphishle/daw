"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { PauseIcon, PlayIcon } from "lucide-react";
import * as Tone from "tone";
import useTransport from "../hooks/useTransport";

const DEFAULT_BPM = 120;
const MEASURE_COUNT = 8;

export default function Transport() {
  Tone.Transport.loop = true;
  Tone.Transport.loopStart = "0";
  Tone.Transport.loopEnd = Tone.Time("1m").toSeconds() * MEASURE_COUNT;

  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [timeSignature, setTimeSignature] = useState(
    Tone.Transport.timeSignature
  );
  const { position, progress } = useTransport();

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
        <div>{position.toString()}</div>
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
          <div>{timeSignature}/4</div>
        </div>
      </div>
    </div>
  );
}

/**
 * TODO split into multiple hooks:
 * - useBpm
 * - usePosition
 * - useLoop
 * - usePlayback
 * - ...
 */
import { ChangeEvent, useEffect, useState } from "react";
import { Time, Transport } from "tone";
import type { Time as TTime } from "tone/build/esm/core/type/Units";
import {
  DEFAULT_CLEF,
  DEFAULT_BPM,
  DEFAULT_MEASURE_COUNT,
  DEFAULT_QUANTIZATION,
} from "../config/constants";

interface ITransportLoop {
  start: TTime;
  end: TTime;
}
interface IUseTransporterProps {
  loop?: ITransportLoop;
}

function getPosition(time: TTime = Transport.position) {
  return Time(time).toBarsBeatsSixteenths();
}

function enableLoop(loop: ITransportLoop) {
  Transport.loop = true;
  Transport.loopStart = loop.start;
  Transport.loopEnd = loop.end;
}

export default function useTransporter({ loop }: IUseTransporterProps) {
  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [clef, setClef] = useState(DEFAULT_CLEF);
  const [measureCount, setMeasureCount] = useState(DEFAULT_MEASURE_COUNT);
  const [quantization, setQuantization] = useState(DEFAULT_QUANTIZATION);
  const [position, setPosition] = useState(getPosition());
  const [isPlaying, setIsPlaying] = useState(false);

  // BPM change
  useEffect(() => {
    if (!bpm) return;
    Transport.bpm.value = bpm;
    console.info("Change", "bpm:", Transport.bpm.value);
  }, [bpm]);

  // Position change
  useEffect(() => {
    setPosition(getPosition());
  }, [isPlaying]);

  // Loop
  loop && enableLoop(loop);

  const events = {
    on: {
      bpmChange: (event: ChangeEvent<HTMLInputElement>) =>
        setBpm(parseInt(event.target.value)),

      toggle: () => {
        Transport.toggle();
        setIsPlaying((isPlaying) => !isPlaying);
      },
    },
  };

  return {
    bpm,
    setBpm,
    clef,
    setClef,
    events,
    isPlaying,
    measureCount,
    setMeasureCount,
    setIsPlaying,
    quantization,
    setQuantization,
    position,
    setPosition,
  };
}

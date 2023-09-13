import { Loop, Time, Transport } from "tone";
import type { Time as TTime } from "tone/build/esm/core/type/Units";

import { DEFAULT_MEASURE_COUNT } from "@/app/core/config/constants";

const pos = {
  format: (position: string) => {
    const [m, q, x] = position.split(":");
    return `${m}:${q}:${parseFloat(x).toFixed(3)}`;
  },
  get: (time: TTime = Transport.position) => Time(time).toBarsBeatsSixteenths(),
};

interface IUseTransportProps {
  loopFn?: (position: string) => void;
}

export default function useTransport({ loopFn }: IUseTransportProps) {
  const measureCount = DEFAULT_MEASURE_COUNT; // TODO don't hardcode this
  const repeat = () => loopFn && loopFn(pos.format(pos.get()));

  const loop = new Loop(repeat, "16n").start();

  return { loop };
}

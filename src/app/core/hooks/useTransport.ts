import { Loop, Time, Transport } from "tone";
import type { Time as TTime } from "tone/build/esm/core/type/Units";

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
  const repeat = () => loopFn && loopFn(pos.format(pos.get()));
  const loop = new Loop(repeat, "16n").start();

  return { loop };
}

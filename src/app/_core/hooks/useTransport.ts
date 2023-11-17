import * as Tone from 'tone';

const pos = {
  format: (position: string) => {
    const [m, q, x] = position.split(':');
    return `${m}:${q}:${parseFloat(x).toFixed(3)}`;
  },
  get: (time = Tone.Transport.position) =>
    Tone.Time(time).toBarsBeatsSixteenths(),
};

interface IUseTransportProps {
  loopFn?: (position: string) => void;
}

export function useTransport({ loopFn }: IUseTransportProps) {
  const repeat = () => loopFn && loopFn(pos.format(pos.get()));
  const loop = new Tone.Loop(repeat, '16n');
  return { loop };
}

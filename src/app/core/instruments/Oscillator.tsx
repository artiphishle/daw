import useOscillator, {
  Options,
} from "@/core/instruments/hooks/_useOscillator";

interface IOscillatorProps {
  options: Options;
}

export default function Oscillator({ options }: IOscillatorProps) {
  const oscillator = useOscillator(options);

  return <div>{oscillator.baseType}</div>;
}

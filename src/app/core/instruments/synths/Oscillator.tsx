import useOscillator, {
  Options,
} from "@/app/core/instruments/synths/hooks/useOscillator";

interface IOscillatorProps {
  options: Options;
}

export default function Oscillator({ options }: IOscillatorProps) {
  const oscillator = useOscillator(options);

  return <div>{oscillator.baseType}</div>;
}

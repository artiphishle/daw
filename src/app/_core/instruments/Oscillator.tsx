import useOscillator, {
  Options,
} from 'app/_core/instruments/hooks/_useOscillator';

interface IOscillatorProps {
  options: Options;
}

export default function Oscillator({ options }: IOscillatorProps) {
  const oscillator = useOscillator(options);

  return <div>{oscillator.baseType}</div>;
}

import useOscillator, {
  Options,
} from "@/app/core/instruments/synths/hooks/useOscillator";

interface IOscillatorProps {
  options: Options;
}

export default function Oscillator({ options, ...props }: IOscillatorProps) {
  console.log("other props:", props);
  const oscillator = useOscillator(options);

  return <div>{oscillator.baseType}</div>;
}

import useOscillator, { Options } from "@/app/hooks/useOscillator";

interface IOscillatorProps {
  options: Options;
}

export default function Oscillator({ options, ...props }: IOscillatorProps) {
  console.log("other props:", props);
  const oscillator = useOscillator(options);

  return <div>{oscillator.baseType}</div>;
}

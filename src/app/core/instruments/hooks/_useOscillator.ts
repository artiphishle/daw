import { Oscillator } from "tone";
import { useRef } from "react";

export type Options = ConstructorParameters<typeof Oscillator>[0];

export default function useOscillator(options: Options) {
  const oscillator = useRef<Oscillator>(new Oscillator(options as Options));

  return oscillator.current as Oscillator;
}

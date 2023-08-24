import { useRef } from "react";
import { Oscillator } from "tone";

export type Options = ConstructorParameters<typeof Oscillator>[0];

export default function useOscillator(options: Options): Oscillator {
  const oscillator = useRef<Oscillator>(
    new Oscillator(options as Options).toDestination()
  );

  return oscillator.current;
}

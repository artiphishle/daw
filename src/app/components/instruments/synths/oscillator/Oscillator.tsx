"use client";

import useOscillator, { Options } from "@/app/hooks/useOscillator";

type Props = { options: Options };

export default function Oscillator({ options, ...props }: Props) {
  const oscillator = useOscillator(options);

  return <div></div>;
}

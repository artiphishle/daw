import { useState } from "react";
import * as Tone from "tone";

export default function useTransport() {
  const [position, setPosition] = useState(Tone.Transport.position);
  const [progress, setProgress] = useState(Tone.Transport.progress);

  setInterval(() => {
    setPosition(Tone.Transport.position);
    setProgress(Tone.Transport.progress);
  }, 100);

  return { position, progress };
}

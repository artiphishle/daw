import { type ReactNode, useEffect, useState, createContext } from "react";
import { Transport } from "tone";

import useProjectContext from "@/app/core/hooks/useProjectContext";

interface ISongContext {
  isPlaying?: boolean;
}
const SongContext = createContext<ISongContext>({ isPlaying: false });

interface ISong {
  children: ReactNode;
}
export default function Song({ children }: ISong) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { projectContext } = useProjectContext();

  useEffect(() => {
    if (!projectContext) return;
    const { bpm, swing, swingSubdivision } = projectContext;

    Transport.bpm.value = bpm;
    Transport.swing = swing;
    Transport.swingSubdivision = swingSubdivision;
  }, [projectContext]);

  useEffect(() => {
    Transport[isPlaying
? "stop"
: "start"]();
  }, [isPlaying]);

  useEffect(() => {
    setIsPlaying(Transport.state === "started");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Transport.state]);
}

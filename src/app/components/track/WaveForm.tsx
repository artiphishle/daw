import { useEffect, useMemo } from "react";
import WaveSurfer from "wavesurfer.js";

interface IWaveForm {
  url: string;
}

export default function WaveForm({ url }: IWaveForm) {
  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      url,
      container: "#wave",
      waveColor: "#9333EA", // purple-600
      progressColor: "#6B21A8", // purple-800
      height: 24,
    });

    waveSurfer.once("interaction", () => {
      waveSurfer.play();
    });

    return () => waveSurfer.destroy();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(() => {
    return <div className="w-full" id="wave" />;
  }, []);
}

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
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
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

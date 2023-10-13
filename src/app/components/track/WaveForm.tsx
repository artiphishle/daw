"use client";
import styles from "@/core/config/styles";
import { useEffect, useMemo } from "react";
import WaveSurfer from "wavesurfer.js";

export interface IWaveForm {
  url: string;
}

export default function WaveForm({ url }: IWaveForm) {
  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      url,
      container: "#wave",
      waveColor: "rgb(30, 58, 138)", // Purple-600
      progressColor: "#6B21A8", // Purple-800
      height: 24,
    });

    waveSurfer.once("interaction", () => {
      waveSurfer.play();
    });

    return () => waveSurfer.destroy();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => <div className={styles.track.audio.main} id="wave" />,
    []
  );
}

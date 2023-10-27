"use client";
import { useCallback, useEffect, useMemo, useRef } from "react";
import type { FFT } from "tone";

interface IAnalyzer {
  fft: FFT;
  className?: string;
  color?: string;
}

// TODO dynamic bands
export const NUM_BANDS = 16;

export function Analyzer({ fft, className, color = "white" }: IAnalyzer) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawAnalyzer = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    fft.getValue().forEach((value, bandIndex) => {
      const x = bandIndex * (canvas.width / NUM_BANDS);
      const y = canvas.height;
      const barHeight = -value - 50;

      canvasContext.fillStyle = color;
      canvasContext.fillRect(x, y, canvas.width / NUM_BANDS, barHeight);
    });
    requestAnimationFrame(drawAnalyzer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef.current]);

  useEffect(() => {
    if (!canvasRef.current) return;
    requestAnimationFrame(drawAnalyzer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef.current, drawAnalyzer]);

  return (
    <canvas ref={canvasRef} className={className} width="100%" height="50px" />
  );
}

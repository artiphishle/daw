'use client';
import { useCallback, useEffect, useRef } from 'react';
import * as Tone from 'tone';

interface IMeter {
  className?: string;
  meter: Tone.Meter;
}

export default function Meter({ className, meter }: IMeter) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawMeter = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) return;

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    const level = -(meter.getValue() as number) * canvas.height;
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, canvas.height, canvas.width, level);

    requestAnimationFrame(drawMeter);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef.current]);

  useEffect(() => {
    if (!canvasRef.current) return;
    requestAnimationFrame(drawMeter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef.current, drawMeter]);

  return (
    <canvas className={className} width="100%" height="50px" ref={canvasRef} />
  );
}

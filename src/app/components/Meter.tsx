"use client";
import { useEffect, useRef } from "react";
import { Draw, type Meter as TMeter, Transport } from "tone";

interface IMeter {
  className?: string;
  meter?: TMeter;
}

export default function Meter({ className, meter }: IMeter) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current! as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    const render = () => {
      if (!context || !meter) return;
      const { width, height } = canvas;
      const level = meter.getValue() as number;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "transparent";
      context.fillRect(0, 0, 100, 50);
      context.fillStyle = "#FDBA74"; // Orange-300
      context.fillRect(0, 50, 100, level);
      if (level !== -Infinity) {
        context.font = "12px Arial";
        context.fillStyle = "#fff"; // Orange-500
        context.fillText(`${level.toFixed(2)}db`, 0, 20);
      }
    };
    Transport.scheduleRepeat(
      (time: number) => Draw.schedule(render, time),
      "+0.1"
    );
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas className={className} width="100%" height="50px" ref={canvasRef} />
  );
}

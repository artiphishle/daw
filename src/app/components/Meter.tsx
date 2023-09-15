import { useEffect, useRef } from "react";
import { Draw, type Meter as TMeter, Transport } from "tone";

interface IMeter {
  meter?: TMeter;
}

export default function Meter({ meter }: IMeter) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const DEFAULT_METER_WIDTH = 15;
  const DEFAULT_METER_HEIGHT = 100;

  useEffect(() => {
    const canvas = canvasRef.current! as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    const render = () => {
      if (!context || !meter) return;
      const { width, height } = canvas;
      const level = meter.getValue() as number;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#fff";
      context.fillRect(0, 0, DEFAULT_METER_WIDTH, DEFAULT_METER_HEIGHT);
      context.fillStyle = "#0f0";
      context.fillRect(0, DEFAULT_METER_HEIGHT, DEFAULT_METER_WIDTH, level);
      if (level !== -Infinity) {
        context.font = "12px Arial";
        context.fillStyle = "#000";
        context.fillText(level.toFixed(2) + "db", 0, 20);
      }
    };
    Transport.scheduleRepeat(
      (time: number) => Draw.schedule(render, time),
      "+0.1"
    );
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas width="50px" height="100px" ref={canvasRef} />;
}

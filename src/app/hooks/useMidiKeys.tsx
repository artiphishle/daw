import { MouseEvent } from "react";
import useVerdisA from "../components/instruments/synths/hooks/useVerdisA";

export default function useMidiKeys({ instrument, octaves = 1 }: any) {
  const keys = ["C", "D", "E", "F", "G", "A", "B"];
  const { getFrequency } = useVerdisA();

  function onClick(event: MouseEvent<HTMLDivElement>) {
    const key = (event.target as HTMLDivElement).getAttribute("data-key")!;

    instrument.triggerAttackRelease(getFrequency(key), "5n");
  }

  return (
    <div className="flex">
      {new Array(octaves).fill("").map((_, octave) =>
        keys.map((key) => (
          <div
            data-key={`${key}${octave}`}
            className="relative cursor-pointer pl-2 h-10 text-xs bg-slate-50 border-r border-r-slate-200 text-slate-500"
            onClick={onClick}
            key={`key-${key}`}
          >
            {key === "E" || key === "B" ? null : (
              <div
                data-key={`${key}#${octave}`}
                className="bg-black w-2 h-6 text-white top-0 bottom-0 left-auto right-0 p-1"
              ></div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

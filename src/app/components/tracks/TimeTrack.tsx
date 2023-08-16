import { TimerIcon } from "lucide-react";
import { useState } from "react";

// TODO from config
const MEASURE_COUNT = 8;

export default function TimeTrack() {
  const [measureCount, setMeasureCount] = useState(MEASURE_COUNT);
  return (
    <div className="flex flex-1 bg-white items-center">
      <div className="w-40 py-1 px-4 border-r border-r-gray-200">
        <TimerIcon />
      </div>
      <div className="w-full flex flex-1">
        {new Array(measureCount).fill("").map((_, i) => (
          <div className="flex flex-1 items-center" key={i}>
            <div className="text-gray-500 text-xs border-r border-r-gray-200 flex-1 p-1">
              {i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

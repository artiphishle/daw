import { useState } from "react";
import { TimerIcon } from "lucide-react";
import { styles } from "../styles";
import { ETrackType } from "../types";

// TODO from config
const MEASURE_COUNT = 8;

export default function TimeTrack() {
  const [measureCount] = useState(MEASURE_COUNT);
  return (
    <div className="flex flex-1 bg-white items-center">
      <div className={styles.track.column1(ETrackType.Time)}>
        <TimerIcon className="w-10" />
        <div className="whitespace-nowrap w-28 overflow-x-hidden text-ellipsis">
          &nbsp;
        </div>
      </div>
      <div className="flex w-full">
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

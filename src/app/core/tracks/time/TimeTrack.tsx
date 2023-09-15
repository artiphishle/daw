import { useState } from "react";
import { TimerIcon } from "lucide-react";

import { styles } from "../styles";
import { ETrackType, type ITrack } from "../types";
import useProjectSettings from "@/app/hooks/useProjectSettings";

export interface ITimeTrack extends ITrack {}

export default function TimeTrack({}: ITimeTrack) {
  const { projectSettings } = useProjectSettings();

  if (!projectSettings) return null;
  const { measureCount } = projectSettings;

  return (
    <div className="flex flex-1 bg-white items-center">
      <div className={styles.track.column1(ETrackType.Time)}>
        <TimerIcon className="w-10" />
        <div className="whitespace-nowrap w-28 overflow-x-hidden text-ellipsis">
          &nbsp;
        </div>
      </div>
      <div className="flex w-full">
        {new Array(measureCount).fill("").map((_, measureIndex) => (
          <div
            className="flex flex-1 items-center"
            key={`time-track-measure-${measureIndex}`}
          >
            <div className="text-gray-500 text-xs border-r border-r-gray-200 flex-1 p-1">
              {measureIndex + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

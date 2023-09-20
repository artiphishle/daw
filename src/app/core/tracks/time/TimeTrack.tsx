import styles from "@/app/core/config/styles";
import useProjectSettings from "@/app/core/hooks/useProjectSettings";

import { ETrackType } from "@/app/core/tracks/types";
import type { ITrack } from "@/app/core/tracks/Track";
import { TimeIcon } from "@/app/core/config/icons";

export interface ITimeTrack extends ITrack {}

export default function TimeTrack({}: ITimeTrack) {
  const { projectSettings } = useProjectSettings();

  if (!projectSettings) return null;
  const { measureCount } = projectSettings;

  return (
    <div className="flex flex-1 bg-white items-center">
      <div className={styles.track.col1.main(ETrackType.Time)}>
        <TimeIcon className="w-10" />
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

import { GroupIcon } from "lucide-react";
import cn from "classnames";

import styles from "@/app/core/config/styles";
import useProjectSettings from "@/app/core/hooks/useProjectSettings";

import { ETrackType } from "@/app/core/tracks/types";
import type { ITrack } from "@/app/core/tracks/Track";

export default function GroupTrack({ name }: ITrack) {
  const { projectSettings } = useProjectSettings();
  if (!projectSettings) return null;
  const { tracks } = projectSettings;

  return (
    <div className={cn(styles.track.row(ETrackType.Group), "bg-white")}>
      <div className={styles.track.col1.main(ETrackType.Group)}>
        <GroupIcon className={styles.track.icon(ETrackType.Audio)} />
        <div className="whitespace-nowrap w-28 overflow-x-hidden text-ellipsis">
          {name}
        </div>
      </div>
      <div className="p-1 flex w-full">&nbsp;</div>
    </div>
  );
}

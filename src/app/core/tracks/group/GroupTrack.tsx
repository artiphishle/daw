import { GripVerticalIcon, GroupIcon } from "lucide-react";
import cn from "classnames";

import { styles } from "@/app/core/tracks/styles";

import { ETrackType, type ITrack } from "../types";
import useProjectSettings from "@/app/hooks/useProjectSettings";

export interface IGroupTrack extends ITrack {}

export default function GroupTrack({ name }: IGroupTrack) {
  const { projectSettings } = useProjectSettings();
  if (!projectSettings) return null;
  const { tracks } = projectSettings;

  return (
    <div className={cn(styles.track.row(ETrackType.Group), "bg-white")}>
      <div className={styles.track.column1(ETrackType.Group)}>
        <GroupIcon className={styles.track.icon(ETrackType.Audio)} />
        <div className="whitespace-nowrap w-28 overflow-x-hidden text-ellipsis">
          {name}
        </div>
      </div>
      <div className="p-1 flex w-full">&nbsp;</div>
    </div>
  );
}

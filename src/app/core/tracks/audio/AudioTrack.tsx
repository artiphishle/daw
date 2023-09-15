import { ActivityIcon, GripVerticalIcon } from "lucide-react";
import cn from "classnames";

import { styles } from "@/app/core/tracks/styles";
import { Accordion } from "@/app/ui";

import { ETrackType, type ITrack } from "@/app/core/tracks/types";

export interface IAudioTrack extends ITrack {}

export default function AudioTrack({ name }: IAudioTrack) {
  const Template = () => (
    <div className={cn(styles.track.row(ETrackType.Audio), "bg-purple-300")}>
      <div className={styles.track.column1(ETrackType.Audio)}>
        <ActivityIcon className={styles.track.icon(ETrackType.Audio)} />
        <div className="whitespace-nowrap w-28 overflow-x-hidden text-ellipsis">
          {name}
        </div>
      </div>
      <div className="p-1 flex w-full">&nbsp;</div>
    </div>
  );

  return <Accordion summary={<Template />} open></Accordion>;
}

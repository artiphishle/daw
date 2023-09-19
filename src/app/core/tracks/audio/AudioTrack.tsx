import { ActivityIcon } from "lucide-react";
import cn from "classnames";

import styles from "@/app/core/config/styles";
import WaveForm from "@/app/core/tracks/audio/WaveForm";

import { ETrackType } from "@/app/core/tracks/types";
import type { ITrack } from "../Track";

export interface IAudioTrack extends ITrack {
  url: string;
}
export default function AudioTrack({ name, url }: IAudioTrack) {
  interface ITemplate {
    name: string;
  }
  return (
    <div className={cn(styles.track.row(ETrackType.Audio), "bg-purple-300")}>
      <div className={styles.track.col1.main(ETrackType.Audio)}>
        <ActivityIcon className={styles.track.icon(ETrackType.Audio)} />
        <div className="whitespace-nowrap w-28 overflow-x-hidden text-ellipsis">
          {name}
        </div>
      </div>
      <div className="p-1 flex w-full">
        <WaveForm url={url} />
      </div>
    </div>
  );
}

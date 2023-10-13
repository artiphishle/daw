import { ETrackType } from "@/types/track.types";
import {
  ActivityIcon as AudioIcon,
  GroupIcon,
  ListMusicIcon as MidiIcon,
  TimerIcon as TimeIcon,
  type LucideIcon as TIcon,
} from "lucide-react";

const getIconByType = (type: ETrackType) => {
  switch (type) {
    case ETrackType.Instrument:
      return MidiIcon;
    case ETrackType.Audio:
      return AudioIcon;
    case ETrackType.Group:
      return GroupIcon;
    default:
      return MidiIcon;
  }
};
export { getIconByType, AudioIcon, GroupIcon, MidiIcon, TimeIcon };
export type { TIcon };

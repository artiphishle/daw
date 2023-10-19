import { ETrackType } from "app/common/types/track.types";
import {
  ActivityIcon as AudioIcon,
  GroupIcon as ChannelIcon,
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
    case ETrackType.Channel:
      return ChannelIcon;
    default:
      return MidiIcon;
  }
};
export { getIconByType, AudioIcon, ChannelIcon, MidiIcon, TimeIcon };
export type { TIcon };

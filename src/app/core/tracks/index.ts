import AudioTrack, {
  type IAudioTrack,
} from "@/app/core/tracks/audio/AudioTrack";
import GroupTrack, {
  type IGroupTrack,
} from "@/app/core/tracks/group/GroupTrack";
import MidiTrack, { type IMidiTrack } from "@/app/core/tracks/midi/MidiTrack";
import TimeTrack, { type ITimeTrack } from "@/app/core/tracks/time/TimeTrack";

export { AudioTrack, GroupTrack, MidiTrack, TimeTrack };
export type { IAudioTrack, IGroupTrack, IMidiTrack, ITimeTrack };

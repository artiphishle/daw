import AudioTrack, {
  type IAudioTrack,
} from "@/app/core/tracks/audio/AudioTrack";
import MidiTrack, { type IMidiTrack } from "@/app/core/tracks/midi/MidiTrack";
import TimeTrack, { type ITimeTrack } from "@/app/core/tracks/time/TimeTrack";

export { AudioTrack, MidiTrack, TimeTrack };
export type { IAudioTrack, IMidiTrack, ITimeTrack };

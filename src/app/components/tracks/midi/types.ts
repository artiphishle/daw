import type { Time } from "tone/build/esm/core/type/Units";
import type { ITrack } from "../types";

enum EMidiPluginType {
  Drums,
}
/*
interface INote {
  key: string;
  duration: Time;
  time: Time;
}
*/
type TToneSequenceNote = "x" | null;
type TMidiDrumSequence = Record<string, TToneSequenceNote[]>;
interface IMidiChannel {
  id: number;
  // notes?: INote[];
  notes: TToneSequenceNote[];
}
interface IMidiPlugin {
  type?: EMidiPluginType.Drums;
  channels: IMidiChannel[];
}
interface IMidiTrackConfig extends ITrack {
  plugins?: IMidiPlugin[];
}

export { EMidiPluginType };
export type { IMidiChannel, IMidiPlugin, IMidiTrackConfig };
export type { TToneSequenceNote, TMidiDrumSequence };

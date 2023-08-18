import type { Time } from "tone/build/esm/core/type/Units";
import type { ITrack } from "../types";

enum EMidiPluginType {
  Drums,
}

interface INote {
  key: string;
  duration: Time;
  time: Time;
}
interface IMidiChannel {
  id: number;
  notes?: INote[];
}
interface IMidiPlugin {
  type?: EMidiPluginType.Drums;
  channels: IMidiChannel[];
}
interface IMidiTrackConfig extends ITrack {
  plugins?: IMidiPlugin[];
}

export { EMidiPluginType };
export type { IMidiChannel, IMidiPlugin, IMidiTrackConfig, INote };

import { Note } from "tone/build/esm/core/type/NoteUnits";

enum EMidiPluginType {
  Drums,
}

type TMidiChannel = Array<Note | null>;
interface IMidiPlugin {
  type?: EMidiPluginType.Drums;
  channels: TMidiChannel[];
}

export { EMidiPluginType };
export type { TMidiChannel, IMidiPlugin };

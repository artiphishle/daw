import type { ITrack } from "@/app/core/tracks/types";

enum EMidiPluginType {
  Drums,
}

type TToneSequenceNote = "x" | null;
type TMidiDrumSequence = Record<string, TToneSequenceNote[]>;

interface IMidiChannel {
  id: number;
  notes: TToneSequenceNote[];
}
interface IMidiPlugin {
  type?: EMidiPluginType.Drums;
  channels: IMidiChannel[];
}

export { EMidiPluginType };
export type { IMidiChannel, IMidiPlugin };
export type { TToneSequenceNote, TMidiDrumSequence };

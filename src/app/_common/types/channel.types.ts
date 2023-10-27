import * as Tone from "tone";

import type { UniqueIdentifier } from "@dnd-kit/core";

export interface IChannel {
  readonly id: UniqueIdentifier;
  readonly label: string;
  readonly options: Partial<Tone.ChannelOptions>;
  channel?: Tone.Channel;
  readonly routing: { input: string; output: string };
}

import { IChannel } from './channel.types';
import { ITrack } from './track.types';
import { UniqueIdentifier } from './utility.types';

interface IMixer {
  activeTrackId?: UniqueIdentifier;
  channels: IChannel[];
  tracks: ITrack[];
  className?: string;
  openInstrument: () => void;
}

export type { IMixer };

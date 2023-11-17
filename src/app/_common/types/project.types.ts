import type { ReactNode } from 'react';
import type { Subdivision } from 'tone/build/esm/core/type/Units';
import type { IChannel } from '@/types/channel.types';
import type { ITrack } from '@/types/track.types';
import type { UniqueIdentifier } from '@/types/utility.types';

/*** @dialog */
export interface IStartDialog {
  readonly toneReady: boolean;
  readonly setToneReady: (toneReady: boolean) => void;
}

/*** @dnd */
export interface IDraggable {
  readonly children: ReactNode;
  readonly id: string;
}
export interface IDroppable {
  readonly id: string;
  readonly children?: ReactNode;
}
export interface ISortableItem {
  readonly children: ReactNode;
  readonly className: string;
  readonly id: UniqueIdentifier;
}

/*** @dsp */
export interface ISignalFlow {
  readonly in: UniqueIdentifier;
  readonly out: UniqueIdentifier;
  readonly inserts?: UniqueIdentifier[];
  readonly sends?: UniqueIdentifier[];
}

/*** @song */
export interface ISong {
  readonly children: ReactNode;
  readonly className?: string;
  readonly grow?: boolean;
}
/*** @portal */
export enum EPortal {
  Instruments = 'portal-instruments',
}

/*** @settings */
export enum EScale {
  Major,
  Minor,
}
export interface IProject {
  readonly activeTrackId: UniqueIdentifier;
  readonly bpm: number;
  readonly clef: string;
  readonly scale: EScale;
  readonly measureCount: number;
  readonly name: string;
  readonly offsetLeft: number;
  readonly position: string;
  readonly quantization: number;
  readonly swing: number;
  readonly swingSubdivision: Subdivision;
}

/*** @data move this to api.types */
export interface IData {
  readonly channels: IChannel[];
  readonly project: IProject;
  readonly tracks: ITrack[];
}

/*** @transport */
export enum ETransportState {
  Paused = 'paused',
  Started = 'started',
  Stopped = 'stopped',
}
export interface ITransport {
  readonly project: IProject;
  readonly setProject: (project: IProject) => void;
}

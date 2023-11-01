import type { Subdivision } from 'tone/build/esm/core/type/Units';
import type { UniqueIdentifier } from '@dnd-kit/core';
import type { ITrack } from 'app/_common/types/track.types';
import type { IChannel } from './channel.types';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export enum ETransportState {
  Paused = 'paused',
  Started = 'started',
  Stopped = 'stopped',
}
export enum EPortal {
  Instruments = 'portal-instruments',
}
export interface ISong {
  children: ReactNode;
  className?: string;
  grow?: boolean;
}
export interface IStartDialog {
  toneReady: boolean;
  setToneReady: Dispatch<SetStateAction<boolean>>;
}
export interface IProject {
  activeTrackId: UniqueIdentifier;
  bpm: number;
  clef: string;
  scale: string; // TODO enum
  measureCount: number;
  name: string;
  offsetLeft: number;
  position: string;
  quantization: number;
  swing: number;
  swingSubdivision: Subdivision;
}

export interface ISignalFlow {
  in: UniqueIdentifier;
  out: UniqueIdentifier;
  inserts?: UniqueIdentifier[];
  sends?: UniqueIdentifier[];
}

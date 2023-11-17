import type { ReactNode } from 'react';
import { ITrack } from './track.types';
import { IProject } from './project.types';

interface IArranger {
  readonly project: IProject;
  readonly tracks: ITrack[];
  readonly className?: string;
  readonly setProject: (project: IProject) => void;
  readonly setTracks: (tracks: ITrack[]) => void;
}

export type { IArranger };

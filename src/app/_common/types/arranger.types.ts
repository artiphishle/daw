import type { ReactNode } from 'react';
import { ITrack } from './track.types';
import { IProject } from './project.types';

interface IArranger {
  readonly project: IProject;
  readonly tracks: ITrack[];
  readonly children: ReactNode;
  readonly className?: string;
}

export type { IArranger };

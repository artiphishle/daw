import { DEFAULT_OFFSET_LEFT } from '@/common/constants';

import type { IProject } from '@/common/types/project.types';

import styles from '@/common/styles';
const $ = styles.time;

interface ITime {
  measureCount: number;
  setProject: (project: IProject) => void;
}

/*** @issue Support multiple modes: Q, s, etc. */
export function Time({ measureCount, setProject }: ITime) {
  return (
    <div className={$.main}>
      <div className={$.col1} style={{ width: `${DEFAULT_OFFSET_LEFT}px` }}>
        &nbsp;
      </div>
      {new Array(measureCount).fill('').map((_, measureIndex) => (
        <div className={$.inner} key={`time-track-measure-${measureIndex}`}>
          {measureIndex + 1}
        </div>
      ))}
    </div>
  );
}

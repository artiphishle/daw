import { DEFAULT_OFFSET_LEFT } from '@/common/constants';

import styles from '@/common/styles';
const $ = styles.time;

export default function Time({ measureCount }: { measureCount: number }) {
  const mc = measureCount as number;

  /*** @issue Support multiple modes: Q, s, etc. */
  return (
    <div className={styles.track.time}>
      <div style={{ width: `${DEFAULT_OFFSET_LEFT}px` }}>&nbsp;</div>
      {new Array(measureCount).fill('').map((_, measureIndex) => (
        <div className={$.main} key={`time-track-measure-${measureIndex}`}>
          {measureIndex + 1}
        </div>
      ))}
    </div>
  );
}

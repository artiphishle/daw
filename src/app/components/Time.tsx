import { DEFAULT_OFFSET_LEFT } from "../common/constants";
import { TimeIcon } from "../../config/icons";
import styles from "../../config/styles";

export default function Time({ measureCount }: { measureCount: number }) {
  const mc = measureCount as number;

  // Support 4x'16n' notes for now (TODO '32n' at least)
  return (
    <div className={styles.track.time}>
      <div style={{ width: `${DEFAULT_OFFSET_LEFT}px` }}>&nbsp;</div>
      {new Array(measureCount).fill("").map((_, measureIndex) => (
        <div
          className="flex flex-1 items-center px-1 py-2 border-l border-r-gray-200"
          key={`time-track-measure-${measureIndex}`}
        >
          {measureIndex + 1}
        </div>
      ))}
    </div>
  );
}

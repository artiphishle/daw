'use client';
import _ from 'lodash/fp';
import { Scale } from 'tonal';

import { DEFAULT_OFFSET_LEFT } from 'app/_common/constants';
import useProjectContext from 'app/_core/hooks/api/useProjectContext';
import { Grid } from 'packages/pfui';

const $ = {
  main: 'mb-10 bg-white',
  inner: 'flex flex-cols text-xs',
};

export default function PianoRoll() {
  // Const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { projectContext: $d } = useProjectContext();
  const activeTrack = $d?.tracks.find(({ id }) => id === $d?.activeTrackId);
  activeTrack || console.warn('[PianoRoll] No active track');

  /*** @todo extract those 4 lines */
  const clef = $d?.clef;
  const notes2 = Scale.get(`${clef}2 major`).notes;
  const notes1 = Scale.get(`${clef}1 major`).notes;
  const noteScale = [...notes2.reverse(), ...notes1.reverse()];

  // const findRowIndex = (note: string) => noteScale.findIndex((n) => n === note);
  const gridColumnCount = $d ? $d.quantization * $d.measureCount : 0;
  const rows = new Array(noteScale.length * gridColumnCount).fill('_');

  return (
    <section className={$.main}>
      <div className={$.inner}>
        <Grid cols={1} style={{ width: DEFAULT_OFFSET_LEFT }} />
        <Grid className="flex-1" cols={gridColumnCount}>
          {rows.map((row, rowIndex) => (
            <div key={`pianoroll-griditem-${rowIndex}`}>{row}</div>
          ))}
        </Grid>
      </div>
    </section>
  );
}

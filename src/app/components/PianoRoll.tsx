import _ from "lodash/fp";
import { Scale } from "tonal";

import { DEFAULT_OFFSET_LEFT } from "app/common/constants";
import useProjectContext from "@/core/hooks/api/useProjectContext";
import { Grid } from "packages/pfui";

import type { ITrack } from "app/common/types/track.types";

export default function PianoRoll() {
  // Const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { projectContext } = useProjectContext();
  if (!projectContext) return null;
  const { clef, activeTrackId, tracks } = projectContext;
  const activeTrack: ITrack | undefined = tracks.find(
    ({ id }) => id === activeTrackId
  );
  if (!activeTrack) {
    console.error("[PianoRoll] No active track");
    return null;
  }
  const events = activeTrack.routing.input.parts?.[0].events;
  const notes2 = Scale.get(`${clef}2 major`).notes;
  const notes1 = Scale.get(`${clef}1 major`).notes;
  const noteScale = [...notes2.reverse(), ...notes1.reverse()];
  const findRowIndex = (note: string) => noteScale.findIndex((n) => n === note);
  const { measureCount, quantization } = projectContext;
  const gridColumnCount = quantization * measureCount;
  const rows = new Array(noteScale.length * gridColumnCount).fill("_");

  return (
    <section className="mb-10 bg-white">
      <div className="flex flex-cols text-xs">
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

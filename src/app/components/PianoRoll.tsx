import { Scale } from "tonal";

import { DEFAULT_OFFSET_LEFT } from "@/app/core/config/constants";

import useProjectContext from "@/app/core/hooks/api/useProjectContext";
import { Grid } from "@/ui";

import type { ITrack } from "../types/daw";

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
  const notes = activeTrack.routing.input.notes || [];

  const notes2 = Scale.get(`${clef}2 major`).notes;
  const notes1 = Scale.get(`${clef}1 major`).notes;
  const noteScale = [...notes2.reverse(), ...notes1.reverse()];
  // Const findRowIndex = (note: string) => scale.findIndex((n) => n === note);
  const { measureCount, quantization } = projectContext;
  const gridColumnCount = quantization * measureCount;
  const rows = new Array(notes.length * gridColumnCount).fill("_");

  notes.forEach((scaleNote, rowIndex) => {
    notes.forEach((note, noteIndex) => {
      if (note === scaleNote) {
        const nInd = rowIndex * gridColumnCount + noteIndex;
        rows[nInd] = note;
      }
    });
  });

  return (
    <section className="mb-10">
      <div className="flex flex-cols text-xs">
        <Grid cols={1} style={{ width: DEFAULT_OFFSET_LEFT }}>
          {notes.map((note, noteIndex) => (
            <div key={`pianoroll-note-${noteIndex}`}>{note}</div>
          ))}
        </Grid>
        <Grid className="flex-1" cols={gridColumnCount}>
          {rows.map((row, rowIndex) => (
            <div key={`pianoroll-griditem-${rowIndex}`}>{row}</div>
          ))}
        </Grid>
      </div>
    </section>
  );
}

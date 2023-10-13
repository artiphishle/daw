import _ from "lodash/fp";
import { Scale } from "tonal";

import { DEFAULT_OFFSET_LEFT } from "@/constants";
import useProjectContext from "@/core/hooks/api/useProjectContext";
import { Grid } from "@/ui";

import type { ITrack } from "@/types/track.types";
import { IMidiEvent } from "@/types/midi.types";

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
  const events = activeTrack.routing.input.parts?.[0].sequences?.[0]?.events;
  const notes = events?.map((event: IMidiEvent | IMidiEvent[]) =>
    _.isArray(event) ? event.map(({ n }) => n) : event.n && event.n
  );

  const notes2 = Scale.get(`${clef}2 major`).notes;
  const notes1 = Scale.get(`${clef}1 major`).notes;
  const noteScale = [...notes2.reverse(), ...notes1.reverse()];
  const findRowIndex = (note: string) => noteScale.findIndex((n) => n === note);
  const { measureCount, quantization } = projectContext;
  const gridColumnCount = quantization * measureCount;
  const rows = new Array(noteScale.length * gridColumnCount).fill("_");

  return (
    <section className="mb-10">
      <div className="flex flex-cols text-xs">
        <Grid cols={1} style={{ width: DEFAULT_OFFSET_LEFT }}></Grid>
        <Grid className="flex-1" cols={gridColumnCount}>
          {rows.map((row, rowIndex) => (
            <div key={`pianoroll-griditem-${rowIndex}`}>{row}</div>
          ))}
        </Grid>
      </div>
    </section>
  );
}

import { Scale } from "tonal";

import { Grid } from "@/app/ui";
import useProjectContext from "@/app/core/hooks/useProjectContext";
import { DEFAULT_OFFSET_LEFT } from "@/app/core/config/constants";
import { useState } from "react";

export default function PianoRoll() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { projectContext } = useProjectContext();
  if (!projectContext) return;
  const { clef, activeTrackId, tracks } = projectContext;
  const track = tracks.find(({ id }) => id === activeTrackId);
  const events = track?.routing.input.events || [];

  const scale2 = Scale.get(`${clef}2 major`).notes;
  const scale1 = Scale.get(`${clef}1 major`).notes;
  const scale = [...scale2.reverse(), ...scale1.reverse()];
  const findRowIndex = (note: string) => scale.findIndex((n) => n === note);

  const { measureCount, quantization } = projectContext;
  const gridColumnCount = quantization * measureCount;
  const rows = new Array(scale.length * gridColumnCount).fill("_");

  scale.forEach((scaleNote, rowIndex) => {
    events.forEach(({ note }, eventIndex) => {
      if (note === scaleNote) {
        const noteIndex = rowIndex * gridColumnCount + eventIndex;
        rows[noteIndex] = note;
      }
    });
  });

  return (
    <section className="mb-10">
      <div className="flex flex-cols text-xs">
        <Grid cols={1} style={{ width: DEFAULT_OFFSET_LEFT }} data={scale} />
        <Grid
          className="flex-1"
          cols={measureCount * quantization}
          data={rows}
        />
      </div>
    </section>
  );
}

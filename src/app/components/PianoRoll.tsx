import { useState } from "react";
import { Scale } from "tonal";

import { Grid } from "@/app/ui";

import useProjectContext, {
  EInstrument,
} from "@/app/core/hooks/useProjectContext";

const scale = Scale.get("C4 major").notes.reverse();

export default function PianoRoll() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { ProjectContext } = useProjectContext();
  const [steps, setSteps] = useState([
    ["C3", "E3", "A3"],
    null,
    ["C3", "E3", "G3", "B3"],
    null,
    ["C3", "F3", "A3"],
    null,
    ["D3", "G3", "B3"],
    null,
  ]);

  if (!ProjectContext) return;
  const { measureCount, quantization } = ProjectContext;
  const gridColumnCount = quantization * measureCount;
  const rows = new Array(gridColumnCount).fill(" ");

  return (
    <section>
      <div className="flex flex-cols">
        <Grid cols={1} data={scale} />
        <Grid
          className="w-full"
          cols={measureCount * quantization}
          data={rows}
        />
      </div>
    </section>
  );
}

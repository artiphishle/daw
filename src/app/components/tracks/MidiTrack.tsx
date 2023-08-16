import { MouseEvent, useState } from "react";
import { ListMusicIcon } from "lucide-react";
import cn from "classNames";

import type { IMidiTrackConfig, ITrack, TTrackConfig } from "./types";
import Accordion from "../ui/accordion/Accordion";
import AccordionSummary from "../ui/accordion/AccordionSummary";
import AccordionDetails from "../ui/accordion/AccordionDetails";
import MidiPluginDrums from "./MidiPluginDrums";

/**
 * TODO put this into config
 * @description It's the global project setting of how many measures are shown in the arrangement
 */
const MEASURE_COUNT = 8;
const QUANTIZATION = 8;

const styles = {
  bg: { pad: "bg-[#ffffff50]", padActive: "bg-orange-400" },
  track: "flex w-full bg-orange-100 mb-2 items-center text-xs",
  trackCol1:
    "flex justify-between items-center w-40 px-4 py-1 border-r border-r-orange-200",
};
export { styles };

export default function MidiTrack({ name, plugins = [] }: IMidiTrackConfig) {
  const [measureCount, setMeasureCount] = useState(MEASURE_COUNT);
  const [quantization, setQuantization] = useState(QUANTIZATION);

  const events = {
    togglePad: function (event: MouseEvent<HTMLDivElement>) {
      const pad = event.target as HTMLDivElement;

      pad.classList.toggle(styles.bg.pad);
      pad.classList.toggle(styles.bg.padActive);
    },
  };

  return (
    <Accordion>
      <AccordionDetails>
        <AccordionSummary className={styles.track}>
          <div className={styles.trackCol1}>
            <ListMusicIcon className="fill-orange-400" /> {name}
          </div>
          <div className="flex w-full">
            {new Array(measureCount).fill("").map((_, partIndex) => (
              <div
                key={partIndex}
                className="p-1 flex flex-1 w-full border-r border-orange-200"
              >
                {new Array(quantization).fill("").map((_, padIndex) => (
                  <div
                    className={cn("flex-1 mr-1", styles.bg.pad)}
                    onClick={events.togglePad}
                    key={`pad-${padIndex}}`}
                  >
                    &nbsp;
                  </div>
                ))}
              </div>
            ))}
          </div>
        </AccordionSummary>
        {plugins.length ? (
          <MidiPluginDrums channels={plugins[0].channels} />
        ) : null}
      </AccordionDetails>
    </Accordion>
  );
}

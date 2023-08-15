import cn from "classnames";
import { ListMusic } from "lucide-react";

import Accordion from "../ui/accordion/Accordion";
import AccordionDetails from "../ui/accordion/AccordionDetails";
import AccordionSummary from "../ui/accordion/AccordionSummary";
import { MouseEvent, useState } from "react";
import MidiPluginDrums from "./MidiPluginDrums";

/**
 * TODO put this into config
 * @description It's the global project setting of how many measures are shown in the arrangement
 */
const MEASURE_COUNT = 8;

export default function MidiTrack() {
  const [measureCount, setMeasureCount] = useState(MEASURE_COUNT);

  const events = {
    // TODO this event handler should be in the accordion
    cancel: function (event: MouseEvent<HTMLDivElement>) {
      event.stopPropagation();
      event.preventDefault();
    },

    togglePad: function (event: MouseEvent<HTMLDivElement>) {
      const part = event.target as HTMLDivElement;

      part.classList.toggle("bg-[#ffffff50]");
      part.classList.toggle("bg-orange-400");
    },
  };

  return (
    <Accordion>
      <AccordionDetails>
        <AccordionSummary>
          <div className={cn("flex w-full bg-orange-100 mb-2 items-center")}>
            <div className="px-4 py-1 border-r border-r-orange-200">
              <ListMusic className="fill-orange-400" />
            </div>
            <div onClick={events.cancel} className="w-full flex">
              {new Array(measureCount).fill("").map((_, partIndex) => (
                <div
                  key={partIndex}
                  className="p-1 flex flex-1 w-full border-r border-orange-200"
                >
                  {new Array(8).fill("").map((_, padIndex) => (
                    <div
                      className="flex-1 bg-[#ffffff50] mr-1"
                      onClick={events.togglePad}
                      key={`pad-${padIndex}}`}
                    >
                      &nbsp;
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </AccordionSummary>
        <p>
          <MidiPluginDrums />
        </p>
      </AccordionDetails>
    </Accordion>
  );
}

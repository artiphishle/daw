import { type MouseEvent } from "react";
import { ListMusicIcon } from "lucide-react";
import { Sequence } from "tone";
import cn from "classnames";

import { styles } from "@/app/core/tracks/styles";

import { ETrackType, type ITrack } from "@/app/core/tracks/types";
import { EInstrument } from "@/app/hooks/useProjectSettings";
import type { Note } from "tone/build/esm/core/type/NoteUnits";

type TNote = Array<Note | undefined>;

export default function MidiTrack({
  name,
  routing: {
    input: { instrument, label, notes = [] },
  },
}: ITrack) {
  new Sequence(
    (time, note) => {
      if (!note) return;
      const isNoise = [EInstrument.SnareDrum, EInstrument.ClosedHiHat].includes(
        label as EInstrument
      );

      return isNoise
        ? instrument.triggerAttackRelease("8n", time)
        : instrument.triggerAttackRelease(note, time);
    },
    notes,
    "4n"
  ).start(0);

  const events = {
    togglePad: function (event: MouseEvent<HTMLDivElement>) {
      const pad = event.target as HTMLDivElement;
      pad.classList.toggle(styles.bg.pad);
      pad.classList.toggle(styles.bg.padActive);
    },
  };

  return (
    <div className={cn(styles.track.row(ETrackType.Midi), "bg-orange-200")}>
      <div className={styles.track.column1(ETrackType.Midi)}>
        <ListMusicIcon className={styles.track.icon(ETrackType.Midi)} />
        <div className="whitespace-nowrap w-28 overflow-x-hidden text-ellipsis">
          {name}
        </div>
      </div>
      <div className={`p-1 flex w-full border-r border-orange-200`}>
        {notes.map((note, padIndex) => {
          return (
            <div
              className={cn(
                "flex-1 mr-1 text-white text-center cursor-pointer text-[0.6rem]",
                styles.bg[!!note ? "padActive" : "pad"]
              )}
              onClick={events.togglePad}
              key={`pad-${padIndex}}`}
            >
              {note || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

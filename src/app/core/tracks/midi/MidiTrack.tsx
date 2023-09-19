import { type MouseEvent } from "react";
import { ListMusicIcon } from "lucide-react";
import { Sequence } from "tone";
import cn from "classnames";

import styles from "@/app/core/config/styles";

import { ETrackType } from "@/app/core/tracks/types";
import { EInstrument } from "@/app/core/hooks/useProjectSettings";
import type { ITrack } from "../Track";

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
      pad.classList.toggle(styles.notes.bg);
      pad.classList.toggle(styles.notes.bgActive);
    },
  };

  return (
    <div className={cn(styles.track.row(ETrackType.Midi), "bg-orange-200")}>
      <div className={styles.track.col1.main(ETrackType.Midi)}>
        <ListMusicIcon className={styles.track.icon(ETrackType.Midi)} />
        <div className={styles.track.col1.name}>{name}</div>
      </div>
      <div className={styles.track.col2.main}>
        {notes.map((note, padIndex) => {
          return (
            <div
              className={cn(
                styles.notes.main,
                styles.notes[!!note ? "bgActive" : "bg"]
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

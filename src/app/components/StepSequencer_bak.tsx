"use client";

import { GaugeIcon } from "lucide-react";
import { Players, Sequence } from "tone";
import { stepSequencerConfig } from "./config";

export default function StepSequencer() {
  const { tracks } = stepSequencerConfig;

  const keys = new Players({
    urls: {
      0: "A1.mp3",
      1: "Cs2.mp3",
      2: "E2.mp3",
      3: "Fs2.mp3",
    },
    fadeOut: "64n",
    baseUrl: "https://tonejs.github.io/audio/casio/",
  }).toDestination();

  const sequence = new Sequence((sequenceTime) => {
    tracks.forEach((track) => {
      const { instrument, notes } = track;

      notes.forEach(({ isInactive, note, time }, i) => {
        if (isInactive) return;

        const t = i ? time : sequenceTime;

        note
          ? instrument.triggerAttackRelease(note, "8n", t)
          : instrument.triggerAttackRelease("8n", time);
      });
    });
  }).start(0);

  /*
  // load/update tracks on instrument load/update
  useEffect(() => {
    function getTracks(): ITrack[] {
      return instruments.map(({ instrument, name: label, notes }) => {
        const part = new Part();

        part.callback = (time, { note }) =>
          instrument.triggerAttackRelease(note.note, "16n", time);
        part.value = notes;
        part.start(0);

        return { label, notes, part } as ITrack;
      });
    }
    setTracks(getTracks());
  }, [instruments, instruments.length]);
  */

  return (
    <div className="flex p-4 flex-col">
      {tracks?.map(({ name, notes }, trackIndex) => (
        <div key={`${name}-${trackIndex}`} className="flex">
          <div className="px-2 py-1 bg-white items-center text-xs flex mb-1">
            <div className="flex">
              <GaugeIcon className="text-gray-300 -rotate-45" />
              <div className="w-10 p-2">{name}</div>
              {notes.map((t, stepIndex) => {
                return (
                  <div
                    key={`${name}-pad-${stepIndex}`}
                    className={`${
                      !t.isInactive
                        ? "bg-blue-100 text-blue-500"
                        : "bg-gray-100"
                    } cursor-pointer w-8 mr-1 p-2`}
                  >
                    {t.note || ""}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-1">&nbsp;</div>
        </div>
      ))}
    </div>
  );
}

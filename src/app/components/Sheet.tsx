import { useEffect } from "react";
import { Midi } from "@tonejs/midi";

import abcjs, { type TuneObjectArray } from "abcjs";
import "abcjs/abcjs-audio.css";

import { PanSongParsed as notes } from "@/app/test/unit/PanSong.parsed";
import type { NoteEventTime as INoteEventTime } from "@spotify/basic-pitch/types";

export enum ENoteStyle {
  Rhythm = "rhythm",
  Harmonic = "harmonic",
  X = "x",
  Normal = "normal",
  Triangle = "triangle",
}

interface ISheet {
  markdown: string;
  noteStyle?: ENoteStyle;
}

export default function Sheet({
  markdown,
}: // NoteStyle = ENoteStyle.Normal,
ISheet) {
  // Const [noteStyl, setNoteStyl] = useState<ENoteStyle>(noteStyle);
  useEffect(() => {
    const sheet: TuneObjectArray = abcjs.renderAbc("paper", markdown);

    console.info("[Sheet] rendered:", sheet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const midi = new Midi();
  const trackWithMelodia = midi.addTrack();
  trackWithMelodia.name = "Melodia";

  notes.forEach(
    ({
      amplitude,
      durationSeconds,
      pitchBends,
      pitchMidi,
      startTimeSeconds,
    }: INoteEventTime) => {
      trackWithMelodia.addNote({
        duration: durationSeconds,
        midi: pitchMidi,
        time: startTimeSeconds,
        velocity: amplitude,
      });

      if (pitchBends) {
        pitchBends.forEach((pitchBend, pitchBendIndex) =>
          trackWithMelodia.addPitchBend({
            time:
              startTimeSeconds +
              (durationSeconds * pitchBendIndex) / pitchBends!.length,
            value: pitchBend,
          })
        );
      }
    }
  );

  return <div className="bg-white" id="paper" />;
}

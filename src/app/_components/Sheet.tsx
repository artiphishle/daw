'use client';
import { useEffect } from 'react';
import { Midi } from '@tonejs/midi';

import styles from 'app/_common/styles';
import abcjs, { type TuneObjectArray } from 'abcjs';
import 'abcjs/abcjs-audio.css';
import t from 'app/_core/i18n';
// import { PanSongParsed } from "testdata/unit/PanSong.parsed";

// import type { NoteEventTime as INoteEventTime } from "@spotify/basic-pitch/types";

export enum ENoteStyle {
  Rhythm = 'rhythm',
  Harmonic = 'harmonic',
  X = 'x',
  Normal = 'normal',
  Triangle = 'triangle',
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
    const sheet: TuneObjectArray = abcjs.renderAbc('paper', markdown);

    // console.info("[Sheet] rendered:", sheet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const midi = new Midi();
  const trackWithMelodia = midi.addTrack();
  trackWithMelodia.name = 'Melodia';

  /*
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
  );*/

  return (
    <section className="bg-white p-8">
      <h1 className={styles.headings.h1}>{t('sheets')}</h1>
      <p>
        The music sheet was generated using abc.js, markdown for music notes!
      </p>
      <div className="bg-white" id="paper" />;
    </section>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { Midi } from '@tonejs/midi';

import abcjs, { type TuneObjectArray } from 'abcjs';
import 'abcjs/abcjs-audio.css';
import t from 'app/_core/i18n';
import { ESheetNoteStyle, ISheet } from '@/common/types/sheet.types';
// import { PanSongParsed } from "testdata/unit/PanSong.parsed";
// import type { NoteEventTime as INoteEventTime } from "@spotify/basic-pitch/types";

import styles from 'app/_common/styles';
const $ = styles.sheet;

export function Sheet({
  markdown,
  noteStyle = ESheetNoteStyle.Normal,
}: ISheet) {
  useEffect(() => {
    const sheet: TuneObjectArray = abcjs.renderAbc('paper', markdown);

    // console.info("[Sheet] rendered:", sheet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [noteStyl, setNoteStyl] = useState<ESheetNoteStyle>(noteStyle);
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
    <section className={$.main}>
      <h1 className={styles.headings.h1}>{t('sheets')}</h1>
      <div id="paper" />;
    </section>
  );
}

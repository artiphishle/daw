'use client';
import _ from 'lodash/fp';
import * as Tone from 'tone';
import { MouseEvent, useEffect } from 'react';
import classNames from 'classnames';
import { useWindowWidth } from '@react-hook/window-size';

import { getIconByType } from 'config/icons';
import { SortableItem } from 'app/_components';
import useNoteEditor from 'app/_core/hooks/useNoteEditor';
import useScheduler from 'app/_core/hooks/audio/useAudioScheduler';

import { DEFAULT_OFFSET_LEFT, getMaxNotes } from 'app/_common/constants';
import Note from '../Note';

import { EEndpoint } from 'app/_common/types/api.types';
import { ETrackType, type ITrack } from 'app/_common/types/track.types';
import type { IMidiPart } from 'app/_common/types/midi.types';

import styles from 'app/_common/styles';
import WaveSurferAudioTrack from './WaveSurferAudioTrack';
import { WaveSurferOptions } from 'wavesurfer.js';
const $ = styles.track;

interface IExtendedTrack {
  tracks: ITrack[];
  track: ITrack;
  measureCount: number;
  mutate: (endpoint: EEndpoint) => void;
  patchProjectContext: (patch: Record<string, any>) => void;
}
function Track({
  tracks,
  track,
  measureCount,
  mutate,
  patchProjectContext,
}: IExtendedTrack) {
  const { id, name, type, routing, className = '' } = track;
  const windowWidth = useWindowWidth() - DEFAULT_OFFSET_LEFT;
  const { setupInstrument } = useScheduler();
  const { id: inputId, instrument, parts } = routing.input;
  const { addNote, deleteNote } = useNoteEditor({
    tracks,
    patchProjectContext,
    mutate,
  });
  const $li = classNames($.row, className);
  const $e = {
    onArrangementClick: (event: MouseEvent) => {
      Tone.Transport.stop();
      Tone.setContext(new Tone.Context());
      const element = event.target as HTMLElement;
      const clientX = event.clientX - DEFAULT_OFFSET_LEFT;
      const qWidth = windowWidth / 16 / measureCount;
      const qTotalIndex = Math.floor(clientX / qWidth);
      const partIndex = Math.floor(qTotalIndex / 16);
      const qIndex = qTotalIndex - partIndex * 16;
      const isNote = element.getAttribute('data-type') === 'note';

      isNote
        ? deleteNote({
            partIndex,
            track,
            noteIndex: parseInt(element.getAttribute('data-index')!, 10),
          })
        : addNote({ track, partIndex, qIndex });
    },
    onTrackSelection: (event: MouseEvent) => {
      const element = event.currentTarget as HTMLElement;
      const trackId = element.getAttribute('data-track-id')!;
      patchProjectContext({ activeTrackId: trackId });
      mutate(EEndpoint.ProjectSettings);
    },
  };

  const drawPart = (pIndex: number, part: IMidiPart) => {
    const measureWidth = windowWidth / measureCount;
    const width = measureWidth / 16;
    const commonStyle = {
      width,
      height: '100%',
      top: '0',
      borderRight: '1px solid #fff',
      borderBottom: '1px solid #fff',
    };

    if (part.notes) {
      const maxNotes = getMaxNotes(part.notes);
      return part.notes.map((notes, notesIndex) => {
        return notes.map((note, noteIndex) => {
          return (
            <Note
              index={noteIndex}
              key={`note-${noteIndex}`}
              style={{
                ...commonStyle,
                left: notesIndex * width + pIndex * measureWidth,
                top: `calc(${(40 / maxNotes) * noteIndex}px`,
                height: `${100 / maxNotes}%`,
              }}
              value={note}
            />
          );
        });
      });
    } else if (part.times)
      return part.times.map((time, timeIndex) => {
        const left = time * width + pIndex * measureWidth;

        return (
          <Note
            index={timeIndex}
            key={`note-${timeIndex}`}
            style={{
              left,
              width,
              top: 0,
              height: '100%',
              borderRight: '1px solid #fff',
            }}
          />
        );
      });
  };

  /*** @issue https://github.com/artiphishle/daw/issues/87 */
  useEffect(() => {
    const { instrument: i, options } = instrument! as any;
    if (options.url && i?.load)
      i.load(options.url as string) // to useAudioScheduler
        .then(() => setupInstrument({ id: inputId, instrument: i, parts }))
        .catch(console.error);
    else setupInstrument({ id, instrument: i, parts });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instrument]);

  const props = {
    main: { id, className: $li },
    inner: { className: classNames($.col1.main, className) },
  };
  const TypeIcon = getIconByType(type);

  return (
    <SortableItem {...props.main}>
      <div
        data-track-id={id}
        onClick={$e.onTrackSelection}
        {...props.inner}
        style={{ height: 40 }}
      >
        <TypeIcon />
        <div className={$.col1.name}>{name}</div>
      </div>
      <div onClick={$e.onArrangementClick} className={$.col2.main}>
        {type === ETrackType.Audio ? (
          <WaveSurferAudioTrack
            url={(track.routing.input.options as WaveSurferOptions).url}
          />
        ) : (
          parts.map((part, partIndex) => drawPart(partIndex, part))
        )}
      </div>
    </SortableItem>
  );
}
export default Track;

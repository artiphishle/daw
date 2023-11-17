'use client';
import { useEffect, type MouseEvent } from 'react';
import _ from 'lodash/fp';
import classNames from 'classnames';
import { useWindowWidth } from '@react-hook/window-size';

import { getIconByType } from 'config/icons';
import { Note, SortableItem } from '@/components';
import useScheduler from '@/core/hooks/audio/useAudioScheduler';
import { getMaxNotes, DEFAULT_OFFSET_LEFT } from '@/common/constants';
import WaveSurferAudioTrack from './WaveSurferAudioTrack';
import { WaveSurferOptions } from 'wavesurfer.js';
import useNoteEditor from '@/core/hooks/useNoteEditor';

import { ETrackType, type ITrack } from 'app/_common/types/track.types';
import type { IMidiPart } from '@/common/types/midi.types';
import type { IProject } from '@/common/types/project.types';

import styles from 'app/_common/styles';
const $ = styles.track;

export function Track({
  patchProject,
  patchTrack,
  project: { measureCount },
  setActiveTrackId,
  track,
}: {
  project: IProject;
  patchProject: (patch: Partial<IProject>) => Promise<void>;
  patchTrack: (patch: Partial<ITrack>) => Promise<void>;
  setActiveTrackId: (activeTrackId: any) => void;
  track: ITrack;
}) {
  const { setupInstrument } = useScheduler();
  const { id, name, routing, type, className, isActive = false } = track;
  const { addNote, deleteNote } = useNoteEditor({ patchTrack });
  const windowWidth = useWindowWidth() - DEFAULT_OFFSET_LEFT;
  const { id: inputId, instrument, parts } = routing.input;
  const $li = classNames($.li, className);
  const $e = {
    onArrangementClick: (event: MouseEvent) => {
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
      setActiveTrackId(trackId);
      patchProject({ activeTrackId: trackId });
    },
  };

  const drawPart = (pIndex: number, part: IMidiPart) => {
    const measureWidth = windowWidth / measureCount;
    const width = measureWidth / 16;
    const commonStyle = {
      width,
      height: '100%',
      top: '0',
      marginRight: '1px',
      marginBottom: '1px',
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
            }}
          />
        );
      });
  };

  /*** @issue https://github.com/artiphishle/daw/issues/87 */
  useEffect(() => {
    const { instrument: i, options } = instrument! as any;
    if (options.url && i?.load)
      i.load(options.url as string)
        .then(() => setupInstrument({ id: inputId, instrument: i, parts }))
        .catch(console.error);
    else setupInstrument({ id, instrument: i, parts });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const props = {
    main: { id, className: $li },
    inner: {
      className: classNames({ [$.active]: isActive }, $.col1.main, className),
    },
  };
  const TypeIcon = getIconByType(type);

  return (
    <SortableItem {...props.main}>
      <div
        data-track-id={id}
        onClick={$e.onTrackSelection}
        {...props.inner}
        // style={{ height: 40 }}
      >
        <TypeIcon className={$.icon} />
        &nbsp;
        <div className={$.col1.name}>{windowWidth < 100 ? '' : name}</div>
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

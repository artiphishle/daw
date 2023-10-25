'use client';
import _ from 'lodash/fp';
import { MouseEvent, useEffect } from 'react';
import classNames from 'classnames';
import { useWindowWidth } from '@react-hook/window-size';
import * as Tone from 'tone';

import { getIconByType } from 'config/icons';
import { SortableItem } from '@/components';
import useScheduler from '@/core/hooks/audio/useAudioScheduler';

import { DEFAULT_OFFSET_LEFT } from 'app/common/constants';
import Note from '../Note';
import type { IMidiPart } from 'app/common/types/midi.types';
import type { ITrack } from 'app/common/types/track.types';

import styles from 'app/common/styles';
import { EEndpoint } from '@/common/types/api.types';
import useNoteEditor from '@/core/hooks/useNoteEditor';
const $ = styles.track;

interface IExtendedTrack {
  tracks: ITrack[];
  track: ITrack;
  measureCount: number;
  quantization: number;
  mutate: (endpoint: EEndpoint) => void;
  patchProjectContext: (patch: Record<string, any>) => void;
}

function Track({
  tracks,
  track,
  measureCount,
  quantization,
  mutate,
  patchProjectContext,
}: IExtendedTrack) {
  const { id, name, type, routing, className = '' } = track;
  const windowWidth = useWindowWidth() - DEFAULT_OFFSET_LEFT;
  const { setupPlayer } = useScheduler();
  const { id: inputId, instrument, parts = [] } = routing.input;
  const { addNote, deleteNote } = useNoteEditor({
    tracks,
    parts,
    patchProjectContext,
    mutate,
  });
  const $li = classNames($.row, className);
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
      patchProjectContext({ activeTrackId: trackId });
      mutate(EEndpoint.ProjectSettings);
    },
  };

  const drawPart = (part: IMidiPart, partIndex: number) => {
    const { events } = part;

    return events.map(({ note, duration, x }, eventIndex) => {
      const measureWidth = windowWidth / measureCount;
      const left = x * (measureWidth / 16) + partIndex * measureWidth;
      const width = measureWidth / parseInt(duration, 10);

      return (
        <Note
          index={eventIndex}
          key={`note-${eventIndex}`}
          note={note}
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

  useEffect(() => {
    if (!(instrument?.options as Tone.PlayerOptions).url) return;

    setupPlayer({
      player: instrument?.instrument as Tone.Player,
      id: inputId,
      parts,
      windowWidth,
      measureCount,
    });
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
        {parts.map((part, partIndex) => drawPart(part, partIndex))}
      </div>
    </SortableItem>
  );
}
export default Track;

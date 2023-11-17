'use client';
import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import classNames from 'classnames';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Locator, Time, Track } from '@/components';
import { Flex, Grid } from '@/pfui';
import { useSelector, useTransport } from '@/core/hooks';
import {
  patchProject,
  patchTrack,
  patchTracks,
} from '@/api/project/_presets/DefaultPreset';

import type { IArranger } from '@/common/types/arranger.types';

import styles from '@/common/styles';
const $ = styles.arranger;

export function Arranger({
  project,
  tracks,
  setProject,
  setTracks,
  className = '',
}: IArranger) {
  const [position, setPosition] = useState<string>('0:0:0.000');
  const [activeTrackId, setActiveTrackId] = useState(project.activeTrackId);
  const loopFn = setPosition;
  const { loop } = useTransport({ loopFn });
  loop.start();
  const { measureCount, quantization, offsetLeft } = project;
  const { deselectTracks } = useSelector();
  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(mouseSensor);

  const events = {
    dragEnd: ({ active, over }: DragEndEvent) => {
      if (active.id === over?.id) return;
      const oldIndex = tracks.findIndex(({ id }) => id === active.id);
      const newIndex = tracks.findIndex(({ id }) => id === over?.id);
      const sortedTracks = arrayMove(tracks, oldIndex, newIndex);
      setTracks(sortedTracks);
      patchTracks(deselectTracks(sortedTracks).tracks);
    },
  };

  return (
    <DndContext onDragEnd={events.dragEnd} sensors={sensors}>
      <section className={classNames($.main, className)}>
        <Grid
          className={$.innerBack.main}
          cols={tracks.length * measureCount * quantization}
          rows={tracks.length}
          style={{ left: offsetLeft }}
          classNameItem={$.innerBack.item}
        />
        <section className={$.main}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={events.dragEnd}
          >
            <SortableContext
              items={tracks}
              strategy={verticalListSortingStrategy}
            >
              <Flex grow vertical>
                <Time
                  measureCount={project.measureCount}
                  setProject={setProject}
                />
                <ol className={$.ol}>
                  {tracks.map((track) => (
                    <Track
                      patchProject={patchProject}
                      patchTrack={patchTrack}
                      key={track.id}
                      project={project}
                      setActiveTrackId={setActiveTrackId}
                      track={{
                        ...track,
                        isActive: activeTrackId === track.id,
                      }}
                    />
                  ))}
                </ol>
              </Flex>
            </SortableContext>
          </DndContext>
          <Locator position={position} />
        </section>
      </section>
    </DndContext>
  );
}

'use client';
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

import styles from '@/common/styles';
import { Locator, Time, Track } from '@/components';

import type { IArranger } from '@/common/types/arranger.types';
import { Flex, Grid } from '@/pfui';
import { useState } from 'react';
import useTransport from '@/core/hooks/useTransport';
import {
  patchProject,
  patchTrack,
  patchTracks,
} from '@/api/project/_presets/DefaultPreset';

export default function Arranger({
  project: initialProject,
  tracks,
  setTracks,
  className = '',
}: IArranger) {
  const [position, setPosition] = useState<string>('0:0:0.000');
  const [project, setProject] = useState(initialProject);
  const [activeTrackId, setActiveTrackId] = useState(
    initialProject.activeTrackId,
  );
  const loopFn = setPosition;
  const { loop } = useTransport({ loopFn });
  const { measureCount, quantization, offsetLeft } = project;
  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(mouseSensor);
  const $ = styles.arranger;

  const events = {
    dragEnd: ({ active, over }: DragEndEvent) => {
      if (active.id === over?.id) return;
      const oldIndex = tracks.findIndex(({ id }) => id === active.id);
      const newIndex = tracks.findIndex(({ id }) => id === over?.id);
      const sortedTracks = arrayMove(tracks, oldIndex, newIndex);
      setTracks(sortedTracks);
      patchTracks(sortedTracks);
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
                <Time />
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

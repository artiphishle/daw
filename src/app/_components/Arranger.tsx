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
import { Locator, Time } from '@/components';

import type { IArranger } from '@/common/types/arranger.types';
import { Flex, Grid } from '@/pfui';
import { useState } from 'react';
import useTransport from '@/core/hooks/useTransport';

export default function Arranger({
  project,
  tracks,
  children,
  className = '',
}: IArranger) {
  const [position, setPosition] = useState<string>('0:0:0.000');
  const loopFn = setPosition;
  const { loop } = useTransport({ loopFn });
  const { measureCount, quantization, offsetLeft } = project;
  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(mouseSensor);
  const $ = styles.arranger;

  const events = {
    dragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (active.id === over?.id) return;

      const oldIndex = tracks.findIndex(({ id }) => id === active.id);
      const newIndex = tracks.findIndex(({ id }) => id === over?.id);
      const sortedTracks = arrayMove(tracks, oldIndex, newIndex);
      // await patchProjectContext({ tracks: sortedTracks });
      // mutate(EEndpoint.ProjectSettings);
    },
  };

  function dragEnd({ active, delta }: DragEndEvent) {
    console.log('active/moved x/y', active, delta.x, '/', delta.y);
  }

  return (
    <DndContext onDragEnd={dragEnd} sensors={sensors}>
      <section className={classNames($.main, className)}>
        <Grid
          className={'grid absolute top-[32px] right-0'}
          cols={tracks.length * measureCount * quantization}
          rows={tracks.length}
          style={{
            left: offsetLeft,
          }}
          classNameItem="h-[40px] mb-[4px] border-l border-l-white"
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
                <ol className="flex-1">{children}</ol>
              </Flex>
            </SortableContext>
          </DndContext>
          <Locator position={position} />
        </section>
      </section>
    </DndContext>
  );
}

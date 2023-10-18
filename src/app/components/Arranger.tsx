import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import classNames from "classnames";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import styles from "app/common/styles";
import { Locator, Track } from "@/components";
import Time from "./Time";
import useProjectContext from "@/core/hooks/api/useProjectContext";

import type { IArranger } from "../common/types/arranger.types";
import { EEndpoint } from "../common/types/api.types";

export default function Arranger({ className = "" }: IArranger) {
  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(mouseSensor);
  const $ = styles.arranger;
  const { projectContext, patchProjectContext, mutate } = useProjectContext();

  if (!projectContext) return null;
  const { tracks, activeTrackId, measureCount, quantization } = projectContext;

  const events = {
    dragEnd: async (event: DragEndEvent) => {
      const { active, over } = event;
      if (active.id === over?.id) return;

      const oldIndex = tracks.findIndex(({ id }) => id === active.id);
      const newIndex = tracks.findIndex(({ id }) => id === over?.id);
      const sortedTracks = arrayMove(tracks, oldIndex, newIndex);

      await patchProjectContext({ tracks: sortedTracks });
      mutate(EEndpoint.ProjectSettings);
    },
  };
  console.warn("[Arranger] suspicious rerender amount");
  return (
    <section className={classNames($.main, className)}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={events.dragEnd}
      >
        <SortableContext items={tracks} strategy={verticalListSortingStrategy}>
          <ol className="flex-1 ">
            <Time measureCount={measureCount} />
            {tracks.map((track, trackIndex) => (
              <Track
                className={
                  activeTrackId === track.id ? styles.track.active : ""
                }
                key={`track-${trackIndex}`}
                measureCount={measureCount}
                quantization={quantization}
                {...track}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>
      {projectContext && <Locator projectContext={projectContext} />}
    </section>
  );
}

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import classNames from "classnames";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import styles from "@/app/core/config/styles";
import { Locator } from "@/app/components";
import Track from "@/app/components/track/Track";
import Time from "./Time";
import useProjectContext from "@/app/core/hooks/api/useProjectContext";

import type { IArranger } from "../types/arranger.types";
import { ETrackType } from "../types/track.types";

export default function Arranger({ className = "" }: IArranger) {
  const $ = styles.arranger;
  const { projectContext, patchProjectContext } = useProjectContext();

  if (!projectContext) return null;
  const { tracks, activeTrackId, measureCount, quantization } = projectContext;

  const events = {
    dragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (active.id === over?.id) return;

      const oldIndex = tracks.findIndex(({ id }) => id === active.id);
      const newIndex = tracks.findIndex(({ id }) => id === over?.id);
      const sortedTracks = arrayMove(tracks, oldIndex, newIndex);
      patchProjectContext({ tracks: sortedTracks });
    },
  };
  console.log("rendering tracks now");
  return (
    <section className={classNames($.main, className)}>
      <DndContext collisionDetection={closestCenter} onDragEnd={events.dragEnd}>
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

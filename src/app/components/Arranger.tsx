import {
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import styles from "@/app/core/config/styles";
import useProjectSettings from "@/app/core/hooks/useProjectSettings";
import { Locator } from "@/app/components";
import Track from "@/app/core/tracks/Track";

export default function Arranger() {
  const { projectSettings, updateProjectSettings } = useProjectSettings();

  if (!projectSettings) return null;
  const { tracks, activeTrackId } = projectSettings;

  const events = {
    dragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (active.id === over?.id) return;

      const oldIndex = tracks.findIndex(({ id }) => id === active.id);
      const newIndex = tracks.findIndex(({ id }) => id === over?.id);
      const sortedTracks = arrayMove(tracks, oldIndex, newIndex);
      updateProjectSettings({ tracks: sortedTracks });

      return sortedTracks;
    },
  };

  return (
    <div className="relative">
      <DndContext collisionDetection={closestCenter} onDragEnd={events.dragEnd}>
        <SortableContext items={tracks} strategy={verticalListSortingStrategy}>
          <ol className="flex-1 bg-white">
            {tracks.map((track, trackIndex) => (
              <Track
                className={
                  activeTrackId === track.id ? styles.track.active : ""
                }
                key={`track-${trackIndex}`}
                {...track}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>
      {projectSettings && <Locator projectSettings={projectSettings} />}
    </div>
  );
}

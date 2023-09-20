import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import useProjectSettings from "@/app/core/hooks/useProjectSettings";

import { Locator } from "@/app/components";
import Track from "@/app/core/tracks/Track";

export default function Arranger() {
  const { projectSettings, updateProjectSettings } = useProjectSettings();
  if (!projectSettings) return null;
  const { tracks } = projectSettings;
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

  /*
  function Track(track: ITrack) {
    const { type } = track;
    switch (type) {
      case ETrackType.Audio:
        const url = track.url as string;
        return <AudioTrack url={url} {...track} />;
      case ETrackType.Group:
        return <GroupTrack {...track} />;
      case ETrackType.Midi:
        return <MidiTrack {...track} />;
      case ETrackType.Time:
        return <TimeTrack {...track} />;
      default:
        return <div>Track type doesn&apos;t exist: &apos;{type}&apos;</div>;
    }
  }
  */

  return (
    <div className="relative">
      <DndContext collisionDetection={closestCenter} onDragEnd={events.dragEnd}>
        <SortableContext items={tracks} strategy={verticalListSortingStrategy}>
          <ol className="flex-1 bg-white">
            {tracks.map((track, trackIndex) => (
              <Track key={`track-${trackIndex}`} {...track} />
            ))}
          </ol>
        </SortableContext>
      </DndContext>
      {projectSettings && <Locator projectSettings={projectSettings} />}
    </div>
  );
}

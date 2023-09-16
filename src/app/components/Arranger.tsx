import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "@/app/components/SortableItem";
import {
  AudioTrack,
  GroupTrack,
  MidiTrack,
  TimeTrack,
} from "@/app/core/tracks";
import useProjectSettings from "@/app/hooks/useProjectSettings";

import { ETrackType, ITrack } from "@/app/core/tracks/types";
import Locator from "./Locator";

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

  function getTrack(track: ITrack) {
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

  function Tracks(tracks: ITrack[]) {
    return tracks.map((track) => {
      const { id, type } = track;

      if (type === ETrackType.Time || type === ETrackType.Group)
        return (
          <li id={id as string} key={id}>
            {getTrack(track)}
          </li>
        );
      return (
        <SortableItem id={id as string} key={id}>
          {getTrack(track)}
        </SortableItem>
      );
    });
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={events.dragEnd}>
      <div className="relative">
        <SortableContext items={tracks} strategy={verticalListSortingStrategy}>
          <ol className="flex-1">{<>{Tracks(tracks)}</>}</ol>
        </SortableContext>
        {projectSettings && <Locator projectSettings={projectSettings} />}
      </div>
    </DndContext>
  );
}

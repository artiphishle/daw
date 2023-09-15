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
  IAudioTrack,
  MidiTrack,
  TimeTrack,
} from "@/app/core/tracks";
import useProjectSettings from "@/app/hooks/useProjectSettings";
import Locator from "@/app/components/Locator";

import { ETrackType } from "@/app/core/tracks/types";
import type { TTrack } from "@/app/core/config/types";

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

  function getTrack(trackConfig: TTrack) {
    const { type } = trackConfig;
    switch (type) {
      case ETrackType.Audio:
        return <AudioTrack {...(trackConfig as IAudioTrack)} />;
      case ETrackType.Group:
        return <GroupTrack {...trackConfig} />;
      case ETrackType.Midi:
        return <MidiTrack {...trackConfig} />;
      case ETrackType.Time:
        return <TimeTrack {...trackConfig} />;
      default:
        return <div>Track type doesn&apos;t exist: &apos;{type}&apos;</div>;
    }
  }

  function Tracks(tracks: TTrack[]) {
    return tracks.map((trackConfig) => {
      const { id, type } = trackConfig;

      if (type === ETrackType.Time || type === ETrackType.Group)
        return (
          <li id={id as string} key={id}>
            {getTrack(trackConfig)}
          </li>
        );

      return (
        <SortableItem id={id as string} key={id}>
          {getTrack(trackConfig)}
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

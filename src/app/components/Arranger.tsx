import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Locator from "@/app/components/Locator";
import SortableItem from "@/app/components/SortableItem";
import { AudioTrack, MidiTrack, TimeTrack } from "@/app/components/tracks";

import { ETrackType } from "@/app/components/tracks/types";
import type { TTrackConfig } from "@/app/core/config/types";

interface IArrangerProps {
  tracks?: TTrackConfig[];
}

export default function Arranger({ tracks: _tracks = [] }: IArrangerProps) {
  function Tracks() {
    const tracks = _tracks.map(({ name, type, ...props }, trackIndex) => {
      const id = `track-${trackIndex}`;
      const Track = { Audio: AudioTrack, Midi: MidiTrack, Time: TimeTrack };
      let track;

      switch (type) {
        case ETrackType.Audio:
          track = <AudioTrack type={type} name={name} />;
          break;
        case ETrackType.Midi:
          track = <MidiTrack type={type} name={name} {...props} />;
          break;
        case ETrackType.Time:
          track = <TimeTrack />;
          break;
        default:
          console.warn(`Type: '${type}' doesn't exist in ETrackType`);
      }

      return (
        <SortableItem id={id} key={id}>
          {track}
        </SortableItem>
      );
    });
    return tracks;
  }
  return (
    <div className="relative">
      <SortableContext items={[]} strategy={verticalListSortingStrategy}>
        <ol className="flex-1">{<>{Tracks()}</>}</ol>
      </SortableContext>
      <Locator />
    </div>
  );
}

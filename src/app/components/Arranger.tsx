import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Locator from "@/app/components/Locator";
import SortableItem from "@/app/components/SortableItem";

import AudioTrack from "@/app/components/tracks/audio/AudioTrack";
import MidiTrack from "@/app/components/tracks/midi/MidiTrack";
import TimeTrack from "@/app/components/tracks/time/TimeTrack";

import { ETrackType } from "./tracks/types";
import { TTrackConfig } from "../core/config/types";

interface IArrangerProps {
  tracks?: TTrackConfig[];
}

export default function Arranger({ tracks: _tracks = [] }: IArrangerProps) {
  function Tracks() {
    const tracks = _tracks.map(({ name, type, ...props }, trackIndex) => {
      const id = `track-${trackIndex}`;

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
    <section className="relative">
      <SortableContext items={[]} strategy={verticalListSortingStrategy}>
        <ol className="flex-1">{<>{Tracks()}</>}</ol>
      </SortableContext>
      <Locator />
    </section>
  );
}

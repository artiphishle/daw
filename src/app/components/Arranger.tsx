import { ReactNode } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "@/app/components/SortableItem";
import { AudioTrack, MidiTrack, TimeTrack } from "@/app/core/tracks";

import { ETrackType } from "@/app/core/tracks/types";
import type { TTrackConfig } from "@/app/core/config/types";
import type { ITransport } from "@/app/components";

export interface IArranger {
  children?: ReactNode;
  tracks: TTrackConfig[];
  setTracks: (tracks: TTrackConfig[]) => void;
  transport?: ITransport;
}

export default function Arranger({ children, tracks, transport }: IArranger) {
  function getTrack(trackConfig: TTrackConfig) {
    const { type } = trackConfig;
    switch (type) {
      case ETrackType.Audio:
        return <AudioTrack {...trackConfig} />;
      case ETrackType.Midi:
        return <MidiTrack {...trackConfig} />;
      case ETrackType.Time:
        return <TimeTrack />;
      default:
        return <div>Track type doesn&apos;t exist: &apos;{type}&apos;</div>;
    }
  }

  function Tracks(tracks: TTrackConfig[]) {
    return tracks.map((trackConfig) => {
      const id = trackConfig.id as string;
      const { type } = trackConfig;

      if (type === ETrackType.Time)
        return (
          <li id={id} key={id}>
            {getTrack(trackConfig)}
          </li>
        );

      return (
        <SortableItem id={id} key={id}>
          {getTrack(trackConfig)}
        </SortableItem>
      );
    });
  }

  return (
    <div className="relative">
      <SortableContext items={tracks} strategy={verticalListSortingStrategy}>
        <ol className="flex-1">{<>{Tracks(tracks)}</>}</ol>
      </SortableContext>
      {children && children}
    </div>
  );
}

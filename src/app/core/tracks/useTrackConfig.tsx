import { Sequence, type Sequence as TSequence } from "tone";
import classNames from "classnames";

import {
  AudioIcon,
  GroupIcon,
  MidiIcon,
  TimeIcon,
  type TIcon,
} from "@/app/core/config/icons";
import styles from "@/app/core/config/styles";
import WaveForm from "@/app/core/tracks/WaveForm";

import { EInstrument } from "@/app/core/hooks/useProjectSettings";
import { ETrackType } from "@/app/core/tracks/types";
import type { IProjectSettings, TNote } from "@/app/core/config/types";
import type { MouseEvent, ReactNode } from "react";

interface ITrackConfig {
  Icon: TIcon;
  draw: (args: { [k: string]: any }) => ReactNode;
  onToggle?: (event: MouseEvent<HTMLDivElement>) => void;
  play?: ({
    instrument,
    label,
    notes,
  }: {
    instrument: any;
    label: string;
    notes: TNote[];
  }) => void;
}

const audioConfig: ITrackConfig = {
  Icon: AudioIcon,
  draw: ({ url }) => {
    return <WaveForm url={url as string} />;
  },
};
const groupConfig: ITrackConfig = {
  Icon: GroupIcon,
  draw: () => {
    return <div />;
  },
};
function play(instrument: any, label: string, notes: TNote[]) {
  return new Sequence(
    (time, note) => {
      if (!note) return;
      const isNoise = [EInstrument.SnareDrum, EInstrument.ClosedHiHat].includes(
        label as EInstrument
      );

      if (typeof instrument === "string")
        throw new Error(`Instrument is a string: ${instrument}`);

      return isNoise
        ? instrument?.triggerAttackRelease("8n", time)
        : instrument?.triggerAttackRelease(note, "8n", time);
    },
    notes,
    "4n"
  ).start(0);
}
const midiConfig: ITrackConfig = {
  Icon: MidiIcon,
  draw: ({ id: trackId, projectSettings, updateProjectSettings }) => {
    let seq: TSequence;
    const { tracks } = projectSettings as IProjectSettings;
    const [track] = tracks.filter((track) => track.id === trackId);
    const { instrument, label, notes } = track.routing.input;
    const onToggle = (event: MouseEvent<HTMLDivElement>) => {
      seq.dispose();
      const currentTrack = event.target as HTMLDivElement;
      const [track] = tracks.filter((track) => track.id === currentTrack.id);
      const noteIndex = parseInt(currentTrack.getAttribute("data-noteindex")!);
      let newNotes = track.routing.input.notes;
      newNotes[noteIndex] = newNotes[noteIndex] ? null : "C1";

      const newTracks = tracks.map((track) => {
        if (track.id !== trackId) return track;
        let newTrack = { ...track };
        newTrack.routing.input.notes = newNotes;
        return newTrack;
      });
      updateProjectSettings({ tracks: newTracks });
    };
    seq = play(instrument, label, notes);

    function Note(props: { note: TNote; noteIndex: number }) {
      const { note, noteIndex } = props;

      const css = styles.notes;
      return (
        <div
          id={trackId}
          onClick={onToggle}
          className={classNames(css.main, note ? css.bgActive : css.bg)}
          data-noteindex={noteIndex}
        >
          {note || ""}
        </div>
      );
    }

    return (notes as TNote[]).map((note, noteIndex) => (
      <Note
        note={note}
        noteIndex={noteIndex}
        key={`note-${noteIndex}-${note}`}
      />
    ));
  },
};
const timeConfig: ITrackConfig = {
  Icon: TimeIcon,
  draw: ({ measureCount }) => {
    const mc = measureCount as number;
    return (
      <div className="flex w-full">
        {new Array(measureCount).fill("").map((_, measureIndex) => (
          <div
            className="flex flex-1 items-center px-1 py-2 border-r border-r-gray-200"
            key={`time-track-measure-${measureIndex}`}
          >
            {measureIndex + 1}
          </div>
        ))}
      </div>
    );
  },
};
const trackConfig = new Map<ETrackType, ITrackConfig>([
  [ETrackType.Audio, audioConfig],
  [ETrackType.Group, groupConfig],
  [ETrackType.Midi, midiConfig],
  [ETrackType.Time, timeConfig],
]);

export default function useTrackConfig(type: ETrackType) {
  return trackConfig.get(type);
}

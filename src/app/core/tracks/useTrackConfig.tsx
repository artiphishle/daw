import { Sequence } from "tone";
import classNames from "classnames";

import {
  AudioIcon,
  GroupIcon,
  MidiIcon,
  TimeIcon,
  type TIcon,
} from "@/app/core/config/icons";
import styles from "@/app/core/config/styles";
import WaveForm from "@/app/core/tracks/audio/WaveForm";

import { EInstrument } from "@/app/core/hooks/useProjectSettings";
import { ETrackType } from "@/app/core/tracks/types";
import type { TNote } from "@/app/core/config/types";
import type { MouseEvent, ReactNode } from "react";

interface INote {
  note?: TNote;
}
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
const midiConfig: ITrackConfig = {
  Icon: MidiIcon,
  draw: ({ notes }) => {
    function Note({ note }: INote) {
      const css = styles.notes;
      return (
        <div className={classNames(css.main, note ? css.bgActive : css.bg)}>
          {note || ""}
        </div>
      );
    }
    return (notes as TNote[]).map((note, noteIndex) => (
      <Note note={note} key={`note-${noteIndex}-${note}`} />
    ));
  },
  play: ({ instrument, label, notes }) =>
    (() =>
      new Sequence(
        (time, note) => {
          if (!note) return;
          const isNoise = [
            EInstrument.SnareDrum,
            EInstrument.ClosedHiHat,
          ].includes(label as EInstrument);

          return isNoise
            ? instrument.triggerAttackRelease("8n", time)
            : instrument.triggerAttackRelease(note, "8n", time);
        },
        notes,
        "4n"
      ).start(0))(),
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

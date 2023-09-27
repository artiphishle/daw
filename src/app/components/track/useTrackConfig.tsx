import { Time, ToneAudioBuffer, Transport } from "tone";
import { analyze } from "web-audio-beat-detector";
import classNames from "classnames";

import { DEFAULT_OFFSET_LEFT } from "@/app/core/config/constants";

import {
  AudioIcon,
  GroupIcon,
  MidiIcon,
  TimeIcon,
} from "@/app/core/config/icons";
import styles from "@/app/core/config/styles";
import WaveForm from "@/app/components/track/WaveForm";

import { EInstrument } from "@/app/core/hooks/useProjectContext";
import { EUnit } from "@/app/types/utility";
import type { IProjectContext } from "@/app/core/config/types";
import type { MouseEvent } from "react";
import {
  ETrackType,
  type IMidiEvent,
  type ITrackConfig,
} from "@/app/types/daw";
import type {
  Instrument,
  InstrumentOptions,
} from "tone/build/esm/instrument/Instrument";

const audioConfig: ITrackConfig = {
  Icon: AudioIcon,
  draw: ({ url }) => {
    (async function () {
      try {
        const buffer = await new ToneAudioBuffer().load(url);
        const tempo = await analyze(buffer.get()!);
        console.info("[BPM Detection]", url.split("/").pop(), tempo);
      } catch (error) {
        console.error(error);
      }
    })();

    return <WaveForm url={url as string} />;
  },
};
const groupConfig: ITrackConfig = {
  Icon: GroupIcon,
  draw: () => {
    return <div />;
  },
};
function play(
  instrument: Instrument<InstrumentOptions>,
  label: string,
  measureCount: number,
  events: IMidiEvent[]
) {
  function repeat(currentTime: number) {
    events.forEach(({ note, duration, time }) => {
      const t = Time(time).valueOf() + currentTime;
      const d = duration.valueOf();
      const isNoise = [EInstrument.SnareDrum, EInstrument.ClosedHiHat].includes(
        label as EInstrument
      );

      return isNoise
        ? instrument.triggerAttackRelease(d, t)
        : instrument.triggerAttackRelease(note, d, t);
    });
  }
  Transport.scheduleRepeat(repeat, `${measureCount}m`);
}

const midiConfig: ITrackConfig = {
  Icon: MidiIcon,
  draw: ({ id: trackId, measureCount, projectContext, windowWidth }) => {
    const { tracks } = projectContext as IProjectContext;
    const [track] = tracks.filter((track) => track.id === trackId);
    const onToggle = (event: MouseEvent<HTMLDivElement>) => {
      const currentTrack = event.target as HTMLDivElement;
      const [track] = tracks.filter((track) => track.id === currentTrack.id);
      const noteIndex = parseInt(currentTrack.getAttribute("data-noteindex")!);
      // TODO
      // updateProjectContext({ tracks: newTracks });
    };
    const { instrument, label, events = [] } = track.routing.input;
    if (!instrument) return trackId;
    /* seq = */ play(instrument, label, measureCount, events);
    const css = styles.notes;
    const TOTAL_TICKS = 768 * measureCount;
    const TICK_IN_PX = windowWidth / TOTAL_TICKS;

    return events.map(
      ({ note, duration, time }: IMidiEvent, eventIndex: number) => {
        const left = `${parseInt(time) * TICK_IN_PX}${EUnit.Px}`;
        const width = `${parseInt(duration) * TICK_IN_PX}${EUnit.Px}`;

        return (
          <div
            key={`midi-event-${eventIndex}`}
            onClick={onToggle}
            className={classNames(css.main, note ? css.bgActive : css.bg)}
            data-noteindex={eventIndex}
            style={{ left, width, position: "absolute", top: 0, bottom: 0 }}
          >
            {note}
          </div>
        );
      }
    );
  },
};
const timeConfig: ITrackConfig = {
  Icon: TimeIcon,
  draw: ({ measureCount }) => {
    const mc = measureCount as number;

    // Support 4x'16n' notes for now (TODO '32n' at least)
    return (
      <div className="flex w-full">
        <div style={{ width: `${DEFAULT_OFFSET_LEFT}px` }}>
          <TimeIcon />
        </div>
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

export { timeConfig };

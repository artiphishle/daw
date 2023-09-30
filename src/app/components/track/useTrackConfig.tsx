import { Time, ToneAudioBuffer, Transport } from "tone";
import { analyze } from "web-audio-beat-detector";
import classNames from "classnames";

import { AudioIcon, GroupIcon, MidiIcon } from "@/app/core/config/icons";
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
    (async () => {
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
  draw: () => <div />,
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
        ? (instrument as any).triggerAttackRelease(d, t)
        : (instrument as any).triggerAttackRelease(note, d, t);
    });
  }
  Transport.scheduleRepeat(repeat, `${measureCount}m`);
}

const instrumentConfig: ITrackConfig = {
  Icon: MidiIcon,
  draw: ({ id: trackId, measureCount, projectContext, windowWidth }) => {
    const { tracks } = projectContext as IProjectContext;
    const [track] = tracks.filter((track) => track.id === trackId);
    const onToggle = (event: MouseEvent<HTMLDivElement>) => {
      const currentTrack = event.target as HTMLDivElement;
      const [track] = tracks.filter((track) => track.id === currentTrack.id);
      const noteIndex = parseInt(
        currentTrack.getAttribute("data-noteindex")!,
        10
      );

      /*
       * TODO
       * updateProjectContext({ tracks: newTracks });
       */
    };
    const { instrument, label, events = [] } = track.routing.input;
    if (!instrument) return trackId;
    /* Seq = */ play(instrument, label, measureCount, events);
    const css = styles.notes;
    const TOTAL_TICKS = 768 * measureCount;
    const TICK_IN_PX = windowWidth / TOTAL_TICKS;

    return events.map(
      ({ note, duration, time }: IMidiEvent, eventIndex: number) => {
        const left = `${parseInt(time, 10) * TICK_IN_PX}${EUnit.Px}`;
        const width = `${parseInt(duration, 10) * TICK_IN_PX}${EUnit.Px}`;

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

const samplerConfig: ITrackConfig = {
  Icon: MidiIcon,
  draw: () => <div />,
};

const trackConfig = new Map<ETrackType, ITrackConfig>([
  [ETrackType.Audio, audioConfig],
  [ETrackType.Group, groupConfig],
  [ETrackType.Instrument, instrumentConfig],
  [ETrackType.Sampler, samplerConfig],
]);

export default function useTrackConfig(type: ETrackType) {
  const config = trackConfig.get(type);
  const errorMsg = `[useTrackConfig] Track type ${type} not found`;
  if (!config || !config.draw || !config.Icon) throw new Error(errorMsg);

  return config;
}

import { ToneAudioBuffer } from "tone";
import { analyze } from "web-audio-beat-detector";
import classNames from "classnames";

import { AudioIcon, GroupIcon, MidiIcon } from "@/app/core/config/icons";
import styles from "@/app/core/config/styles";
import WaveForm from "@/app/components/track/WaveForm";

import type { MouseEvent } from "react";
import {
  ETrackType,
  type IProjectContext,
  type ITrackConfig,
  // eslint-disable-next-line react-hooks/exhaustive-deps,
} from "@/app/types/daw";

const audioConfig: ITrackConfig = {
  Icon: AudioIcon,
  draw: ({ url }) => {
    (async () => {
      try {
        const buffer = await new ToneAudioBuffer().load(url);
        const tempo = await analyze(buffer.get()!);
        console.info("[BPM Detection]", url, tempo);
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
    const { instrument, id, notes = [] } = track.routing.input;
    const instr = instrument?.instrument;

    const css = styles.notes;
    const widths = {
      "2n": windowWidth / 2 / measureCount,
      "4n": windowWidth / 4 / measureCount,
      "8n": windowWidth / 8 / measureCount,
      "16n": windowWidth / 16 / measureCount,
    };

    return notes.map((note, noteIndex) => {
      const left = noteIndex * (windowWidth / 16) * 4;
      const n = note as string | string[];
      return (
        <div
          key={`midi-event-${n}-${noteIndex}`}
          onClick={onToggle}
          className={classNames(css.main, n ? css.bgActive : css.bg)}
          data-noteindex={n}
          style={{
            left: `${left}px`,
            width: `${widths["16n"]}px`,
            position: "absolute",
            top: 0,
            bottom: 0,
          }}
        >
          {n}
        </div>
      );
    });
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

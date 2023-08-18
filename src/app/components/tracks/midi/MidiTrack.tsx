import { type MouseEvent, useState } from "react";
import * as Tone from "tone";
import { ListMusicIcon } from "lucide-react";
import cn from "classnames";

import Accordion from "@/app/components/ui/accordion/Accordion";

import { styles } from "@/app/components/tracks/styles";
import midiChannels from "@/app/components/tracks/midi/constants/channels.midi.constants";
import { ETrackType } from "@/app/components/tracks/types";
import type {
  IMidiTrackConfig,
  INote,
} from "@/app/components/tracks/midi/types";
import useBaseDrum from "../../instruments/drums/baseDrum/hooks/useBaseDrum";
import useSnareDrum from "../../instruments/drums/snareDrum/hooks/useSnareDrum";

/**
 * TODO put this into config
 * @description It's the global project setting of how many measures are shown in the arrangement
 */
const MEASURE_COUNT = 8;
const QUANTIZATION = 8;

interface ITemplateProps {
  notes?: INote[];
  name: string;
  nested?: boolean;
}

export default function MidiTrack({ name, plugins = [] }: IMidiTrackConfig) {
  function isPlayed(notes: INote[], timeIndex: number) {
    return notes.filter(({ time }) => timeIndex === time)[0];
  }

  const baseDrum = useBaseDrum();
  const snareDrum = useSnareDrum();

  function Template({ notes = [], name, nested = false }: ITemplateProps) {
    const [measureCount] = useState(MEASURE_COUNT);
    const [quantization] = useState(QUANTIZATION);

    const events = {
      togglePad: function (event: MouseEvent<HTMLDivElement>) {
        const pad = event.target as HTMLDivElement;

        pad.classList.toggle(styles.bg.pad);
        pad.classList.toggle(styles.bg.padActive);
      },
    };

    return (
      <div
        className={cn(
          styles.track.row(ETrackType.Midi),
          nested ? "bg-orange-100" : "bg-orange-200"
        )}
      >
        <div className={styles.track.column1(ETrackType.Midi)}>
          <ListMusicIcon className={styles.track.icon(ETrackType.Midi)} />
          <div className="whitespace-nowrap w-28 overflow-x-hidden text-ellipsis">
            {name}
          </div>
        </div>
        <div className={`p-1 flex w-full border-r border-orange-200`}>
          {new Array(measureCount * quantization)
            .fill("")
            .map((_, padIndex) => {
              const playedNote = isPlayed(notes, padIndex);

              if (playedNote) {
                if (playedNote.key === "C1") {
                  baseDrum.triggerAttackRelease(
                    playedNote.key,
                    playedNote.duration,
                    (playedNote.time as number) * Tone.Time("8n").toSeconds()
                  );
                }
                if (playedNote.key === "D1") {
                  snareDrum.triggerAttackRelease(
                    playedNote.duration,
                    (playedNote.time as number) * Tone.Time("8n").toSeconds()
                  );
                }
              }

              return (
                <div
                  className={cn(
                    "flex-1 mr-1 text-white",
                    styles.bg.pad,
                    notes.length && (playedNote ? styles.bg.padActive : "")
                  )}
                  onClick={events.togglePad}
                  key={`pad-${padIndex}}`}
                >
                  {playedNote ? playedNote.key : ""}
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  if (!plugins.length) return <Template name={name} />;

  function Details() {
    return (
      <>
        {plugins[0].channels.map(({ notes, id }, channelIndex) => (
          <Template
            notes={notes}
            key={`channel-${id}-${channelIndex}`}
            name={midiChannels[id].name}
            nested={true}
          />
        ))}
      </>
    );
  }
  return (
    <Accordion summary={<Template name={name} />} details={<Details />} open />
  );
}
import { type MouseEvent, useState, useEffect } from "react";
import { ListMusicIcon } from "lucide-react";
import { Sequence } from "tone";
import cn from "classnames";

import midiChannels from "@/app/core/tracks/midi/constants/channels.midi.constants";
import { styles } from "@/app/core/tracks/styles";

import useProjectSettings from "@/app/hooks/useProjectSettings";
import { useBaseDrum, useSnareDrum } from "@/app/core/instruments";
import { Accordion } from "@/app/ui";

import { ETrackType, ITrack } from "@/app/core/tracks/types";
import type {
  IMidiPlugin,
  TToneSequenceNote,
} from "@/app/core/tracks/midi/types";

interface ITemplateProps {
  notes?: TToneSequenceNote[];
  name: string;
  nested?: boolean;
}

export interface IMidiTrack extends ITrack {
  plugins?: IMidiPlugin[];
}

export default function MidiTrack({ name, plugins = [] }: IMidiTrack) {
  const { projectSettings } = useProjectSettings();
  const baseDrum = useBaseDrum();
  const snareDrum = useSnareDrum();

  function Template({ notes = [], name, nested = false }: ITemplateProps) {
    // const sequence = new Sequence((time, value) => {}, notes);

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
          {notes.map((note, padIndex) => {
            return (
              <div
                className={cn(
                  "flex-1 mr-1 text-white",
                  styles.bg[!!note ? "padActive" : "pad"]
                )}
                onClick={events.togglePad}
                key={`pad-${padIndex}}`}
              >
                {note || ""}
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

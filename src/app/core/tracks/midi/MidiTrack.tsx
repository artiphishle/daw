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
import type { IMidiPlugin, TMidiChannel } from "@/app/core/tracks/midi/types";
import useHiHat from "../../instruments/drums/hiHat/hooks/useHiHat";

interface ITemplateProps {
  notes?: TMidiChannel;
  name: string;
  nested?: boolean;
}

export interface IMidiTrack extends ITrack {
  plugins?: IMidiPlugin[];
}

export default function MidiTrack({ name, plugins = [] }: IMidiTrack) {
  // const { projectSettings } = useProjectSettings();
  const baseDrum = useBaseDrum();
  const snareDrum = useSnareDrum();
  const closedHihat = useHiHat({ open: false });

  function Template({ notes = [], name, nested = false }: ITemplateProps) {
    const sequence = new Sequence(
      (time, note) => {
        if (!note) return;
        if (note === "C1") return baseDrum.triggerAttackRelease(note, time);
        if (note === "D1") return snareDrum.triggerAttackRelease("8n", time);
        if (note === "F#1") return closedHihat.triggerAttackRelease(time);
      },
      notes,
      "2n"
    ).start(0);

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
        {plugins[0].channels.map((channel, channelIndex) => {
          if (!channel) return;

          return (
            <Template
              notes={channel}
              key={`channel-${channelIndex}`}
              name={midiChannels[channelIndex].name}
              nested={true}
            />
          );
        })}
      </>
    );
  }
  return (
    <Accordion summary={<Template name={name} />} details={<Details />} open />
  );
}

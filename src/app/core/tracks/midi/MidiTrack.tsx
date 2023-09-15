import { type MouseEvent } from "react";
import { GripVerticalIcon, ListMusicIcon } from "lucide-react";
import { Sequence } from "tone";
import cn from "classnames";

import midiChannels from "@/app/core/tracks/midi/constants/channels.midi.constants";
import { styles } from "@/app/core/tracks/styles";

import { useBaseDrum, useSnareDrum, useHiHat } from "@/app/core/instruments";
import { Accordion } from "@/app/ui";

import { ETrackType, ITrack } from "@/app/core/tracks/types";
import type { IMidiPlugin, TMidiChannel } from "@/app/core/tracks/midi/types";

interface ITemplateProps {
  notes?: TMidiChannel;
  name: string;
  nested?: boolean;
}

export interface IMidiTrack extends ITrack {
  notes?: TMidiChannel;
  plugins?: IMidiPlugin[];
}

export default function MidiTrack({
  routing: {
    input: { instrument },
  },
  name,
  notes = [
    "C2",
    "E2",
    "G2",
    null,
    "C2",
    "E2",
    "G2",
    null,
    "C2",
    "E2",
    "G2",
    null,
    "C2",
    "E2",
    "G2",
    null,
    "C2",
    "E2",
    "G2",
    null,
    "C2",
    "E2",
    "G2",
    null,
    "C2",
    "E2",
    "G2",
    null,
    "C2",
    "E2",
    "G2",
    null,
  ],
  plugins = [],
}: IMidiTrack) {
  const baseDrum = useBaseDrum().toDestination();
  const snareDrum = useSnareDrum().toDestination();
  const closedHihat = useHiHat({ open: false }).toDestination();

  function Template({ notes = [], name, nested = false }: ITemplateProps) {
    if (instrument) {
      new Sequence(
        (time, note) => {
          if (!note) return;
          return instrument.triggerAttackRelease(note, "8n", time, 0.7);
        },
        notes,
        "4n"
      ).start(0);
    } else
      new Sequence(
        (time, note) => {
          if (!note) return;
          // TODO support all notes from midiChannels
          if (note === "C1") return baseDrum.triggerAttackRelease(note, time);
          if (note === "D1") return snareDrum.triggerAttackRelease("8n", time);
          if (note === "F#1")
            return closedHihat.triggerAttackRelease("8n", time);
        },
        notes,
        "4n"
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
                  "flex-1 mr-1 text-white text-center cursor-pointer text-[0.6rem]",
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

  if (instrument || !plugins.length)
    return <Template name={name} notes={notes} />;

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

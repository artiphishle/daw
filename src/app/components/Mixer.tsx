"use client";

import { useEffect, useState } from "react";
import { Destination } from "tone";
import useConfig from "../core/config/useConfig";
import { ETrackType } from "./tracks/types";

export default function Mixer() {
  const { data, error, isLoading } = useConfig();

  const [audioVolume, setAudioVolume] = useState(-6.01);
  const [midiVolume, setMidiVolume] = useState(-6.31);
  const [masterVolume, setMasterVolume] = useState(-8.01);

  useEffect(() => {
    // TODO useChannel hook for dynamic channeling
    Destination.volume.value = masterVolume;
  }, [audioVolume, midiVolume, masterVolume]);

  function Db() {
    return (
      <div className="py-2">
        <div className="text-xs border-b-4 border-b-yellow-400 h-2 w-full">
          &nbsp;
        </div>
        <div className="text-xs border-b-4 border-b-yellow-300 h-2 w-full">
          &nbsp;
        </div>
        <div className="text-xs border-b-4 border-b-yellow-200 h-2 w-full">
          &nbsp;
        </div>
        <div className="text-xs border-b-4 border-b-green-300 h-2 w-full">
          &nbsp;
        </div>
        <div className="text-xs border-b-4 border-b-green-400 h-2 w-full">
          &nbsp;
        </div>
      </div>
    );
  }

  const settings = {
    [ETrackType.Audio]: {
      bg: "bg-purple-100",
      label: "Audio",
    },
    [ETrackType.Midi]: {
      bg: "bg-orange-100",
      label: "Midi",
    },
    [ETrackType.StepSequencer]: {
      bg: "bg-green-100",
      label: "StepSequencer",
    },
  };

  return (
    <div className="py-4 bg-gray-100 flex w-full self-end">
      {data?.tracks.map((track, trackIndex) => {
        if (track.type === ETrackType.Time) return;
        return (
          <div
            className={`p-4 ${settings[track.type].bg} text-xs`}
            key={`mixer-track-${trackIndex}`}
          >
            <div className={`px-2 `}>Volume</div>
            <Db />
            <div>{(settings[track.type] as any).label}</div>
          </div>
        );
      })}

      <div className="p-4 bg-gray-400 text-xs">
        <div className="px-2 bg-gray-400">Volume</div>
        <Db />
        <div>Stereo out</div>
      </div>
    </div>
  );

  /*
  return (
    <div className="py-4 bg-gray-100 flex w-full self-end">
      {new Array(4).fill("").map((_, i) => (
        <div className="p-4 bg-orange-100 text-xs" key={`midi-${i}`}>
          <div className="px-2 bg-orange-100">{midiVolume}</div>
          <Db />
          <div>Midi</div>
        </div>
      ))}
      {new Array(2).fill("").map((_, i) => (
        <div className="p-4 bg-purple-100 text-xs" key={`audio-${i}`}>
          <div className="px-2 bg-purple-100">{audioVolume}</div>
          <Db />
          <div>Audio</div>
        </div>
      ))}
      <div>
        <div className="p-4 m-1 text-xs justify-self-end bg-white ">
          <div>{masterVolume}</div>
          <Db />
          <div>Main</div>
        </div>
      </div>
    </div>
  );
  */
}

interface IMixerConfig {
  visibility: { [type in ETrackType as string]: boolean };
}

export type { IMixerConfig };

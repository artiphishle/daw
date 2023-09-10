import { useEffect, useState } from "react";
import { Destination } from "tone";

import t from "@/app/core/i18n";

import { ETrackType } from "@/app/core/tracks/types";
import useProjectSettings from "../hooks/useProjectSettings";

export interface IMixer {
  visibility: {
    [ETrackType.Audio]: true;
    [ETrackType.Midi]: true;
  };
}

export default function Mixer() {
  const [audioVolume, setAudioVolume] = useState(0);
  const [midiVolume, setMidiVolume] = useState(0);
  const [masterVolume, setMasterVolume] = useState(0);

  useEffect(() => {
    // TODO useChannel hook for dynamic channeling
    Destination.volume.value = masterVolume;
  }, [audioVolume, midiVolume, masterVolume]);

  const { projectSettings, isLoading, error } = useProjectSettings();
  if (isLoading) return <div>Loading...</div>;
  if (error || !projectSettings) return <div>Error: {error}</div>;
  const { tracks } = projectSettings;

  function Db() {
    return <div className="py-2 h-20"></div>;
  }

  // TODO not here
  const settings = {
    [ETrackType.Audio]: {
      bg: "bg-purple-100",
      label: "Audio",
      text: "text-purple-800",
    },
    [ETrackType.Midi]: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      label: "Midi",
    },
  };

  return (
    <div className="py-4 bg-white flex justify-between w-full">
      <div className="flex">
        {tracks.map((track, trackIndex) => {
          if (track.type === ETrackType.Time) return;

          return (
            <div
              className={`p-4 mt-6 mr-2 justify-center ${
                settings[track.type].bg
              } text-xs items-center ${settings[track.type].text}`}
              key={`mixer-track-${trackIndex}`}
            >
              <div className={`px-2 `}>-0.02db</div>
              <Db />
              <div>{(settings[track.type] as any).label}</div>
            </div>
          );
        })}
      </div>
      <div className="flex p-4 bg-gray-400 text-xs items-end">
        <Db />
        <div>{t("stereoOut")}</div>
      </div>
    </div>
  );
}

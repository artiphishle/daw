import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { Destination } from "tone";

import t from "@/app/core/i18n";
import useProjectSettings from "@/app/hooks/useProjectSettings";
import Volume from "@/app/components/Volume";
import { ErrorMessage } from "@/app/ui";

import { ETrackType } from "@/app/core/tracks/types";

export interface IMixer {
  settings: {
    [k in Exclude<ETrackType, ETrackType.Time>]: {
      bg: string;
      text: string;
      label: string;
      visible: boolean;
    };
  };
}

export default function Mixer() {
  const [audioVolume] = useState(0);
  const [midiVolume] = useState(0);
  const [masterVolume] = useState(0);

  useEffect(() => {
    // TODO useChannel hook for dynamic channeling
    Destination.volume.value = masterVolume;
  }, [audioVolume, midiVolume, masterVolume]);

  const { projectSettings, isLoading, error } = useProjectSettings();
  if (isLoading) return <Loader />;
  if (!projectSettings) throw error;

  const {
    tracks,
    mixer: { settings },
  } = projectSettings;

  return (
    <section className="px-4 py-8 bg-[#333] flex justify-between w-full">
      <div className="flex">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error.message} />
        ) : (
          tracks.map((track, trackIndex) => {
            if (track.type === ETrackType.Time) return;

            const trackTypeSettings = settings[track.type];

            return (
              <div
                className={`p-4 mt-6 mr-2 justify-center ${
                  settings[track.type].bg
                } text-xs items-center ${settings[track.type].text}`}
                key={`mixer-track-${trackIndex}`}
              >
                <div className={`px-2 `}>-0.02db</div>
                <Volume />
                <div>{settings[track.type]?.label}</div>
              </div>
            );
          })
        )}
      </div>
      <div className="flex flex-col p-4 mt-6 bg-gray-400 text-xs items-end">
        <Volume />
        <div>{t("stereoOut")}</div>
      </div>
    </section>
  );
}

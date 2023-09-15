import useSWR, { useSWRConfig, type Fetcher } from "swr";

import { useBassSynth } from "@/app/core/instruments";

import { EEndpoint } from "@/pages/api/constants";
import type { IProjectSettings } from "@/app/core/config/types";

export enum EInstrument {
  BassSynth = "BassSynth",
  PollySynth = "PollySynth",
  FMSynth = "FMSynth",
  AMSynth = "AMSynth",
  DuoSynth = "DuoSynth",
  MembraneSynth = "MembraneSynth",
  MetalSynth = "MetalSynth",
  MonoSynth = "MonoSynth",
  NoiseSynth = "NoiseSynth",
  PluckSynth = "PluckSynth",
  Sampler = "Sampler",
  Synth = "Synth",
}

export default function useProjectSettings() {
  // TODO dynamically load instruments
  const bassSynth = useBassSynth();

  const { mutate } = useSWRConfig();
  const fetcher: Fetcher<IProjectSettings, EEndpoint> = (endpoint: EEndpoint) =>
    fetch(endpoint).then((res) => {
      return new Promise(async (resolve) => {
        const { tracks, ...rest } = (await res.json()) as IProjectSettings;
        const mutatedTracks = tracks.map((track) => {
          const { instrument, label, onClick } = track.routing.input;
          if (!instrument) return track;

          switch (instrument) {
            case EInstrument.BassSynth:
              const mutatedRouting = {
                ...track.routing,
                input: { label, onClick, instrument: bassSynth },
              };
              return { ...track, routing: mutatedRouting };
            default:
              return track;
          }
        });
        resolve({ ...rest, tracks: mutatedTracks });
      });
    });

  const {
    data: projectSettings,
    isLoading,
    error,
  } = useSWR(EEndpoint.ProjectSettings, fetcher, {
    revalidateOnFocus: false, // would make Wavesurfer audio file disappear
  });

  const updateProjectSettings = async (patch: Partial<IProjectSettings>) => {
    // DESELECTOR (cannot serialize instruments)
    const readyPatch = patch.tracks
      ? patch.tracks.map((track) => {
          const { instrument } = track.routing.input;
          if (!instrument) return track;
          switch (instrument) {
            case EInstrument.BassSynth:
              let deselectedTrack = { ...track };
              deselectedTrack.routing.input.instrument = EInstrument.BassSynth;
              return deselectedTrack;
          }
        })
      : patch;

    await fetch(EEndpoint.ProjectSettings, {
      method: "PATCH",
      body: JSON.stringify(readyPatch),
    });

    mutate(EEndpoint.ProjectSettings);
  };

  return { projectSettings, isLoading, error, updateProjectSettings };
}

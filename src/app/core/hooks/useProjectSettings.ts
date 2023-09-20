import useSWR, { useSWRConfig, type Fetcher } from "swr";

import {
  useBaseDrum,
  useBassSynth,
  useHiHat,
  useSnareDrum,
} from "@/app/core/instruments";

import { EEndpoint } from "@/pages/api/constants";
import type { IProjectSettings } from "@/app/core/config/types";

export enum EInstrument {
  BaseDrum = "BaseDrum",
  SnareDrum = "SnareDrum",
  ClosedHiHat = "ClosedHiHat",

  BassSynth = "BassSynth",
  // PollySynth = "PollySynth",
  // FMSynth = "FMSynth",
  // AMSynth = "AMSynth",
  // DuoSynth = "DuoSynth",
  // MembraneSynth = "MembraneSynth",
  // MetalSynth = "MetalSynth",
  // MonoSynth = "MonoSynth",
  // NoiseSynth = "NoiseSynth",
  // PluckSynth = "PluckSynth",
  // Sampler = "Sampler",
  // Synth = "Synth",
}

// TODO Put api into: /app/api/
export default function useProjectSettings() {
  // TODO dynamically load instruments
  const INSTRUMENT = {
    BaseDrum: () => useBaseDrum(),
    SnareDrum: () => useSnareDrum(),
    ClosedHiHat: () => useHiHat({ open: false }),
    BassSynth: () => useBassSynth(),
  };

  /**
   * FETCH
   */
  const fetcher: Fetcher<IProjectSettings, EEndpoint> = (endpoint: EEndpoint) =>
    fetch(endpoint).then((res) => {
      return new Promise(async (resolve) => {
        const projectSettings = (await res.json()) as IProjectSettings;
        const { tracks, ...rest } = projectSettings;
        const mutatedTracks = tracks.map((track) => {
          const { instrument: instrumentString, ...inputRest } =
            track.routing.input;
          if (!instrumentString) return track;

          const selInstr = INSTRUMENT[instrumentString as EInstrument]();
          const selRouting = {
            ...track.routing,
            input: { instrument: selInstr, ...inputRest },
          };
          return { ...track, routing: selRouting };
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

  /**
   * UPdATE
   */
  const { mutate } = useSWRConfig();
  const updateProjectSettings = async (patch: Partial<IProjectSettings>) => {
    // DESELECTOR (cannot serialize instruments)
    const readyPatch = patch.tracks
      ? patch.tracks.map((track) => {
          const { instrument, label } = track.routing.input;
          if (!instrument) return track;
          let deselectedTrack = { ...track };
          deselectedTrack.routing.input.instrument = label;
          return deselectedTrack;
        })
      : patch;

    await fetch(EEndpoint.ProjectSettings, {
      method: "PATCH",
      body: JSON.stringify(patch.tracks ? { tracks: readyPatch } : readyPatch),
    });

    mutate(EEndpoint.ProjectSettings);
  };
  return { projectSettings, isLoading, error, updateProjectSettings };
}

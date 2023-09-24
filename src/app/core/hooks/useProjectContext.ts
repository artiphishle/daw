import useSWR, { useSWRConfig, type Fetcher } from "swr";

import {
  useBaseDrum,
  useBassSynth,
  useHiHat,
  useSnareDrum,
} from "@/app/core/instruments";

import { EEndpoint } from "@/pages/api/constants";
import type { IProjectContext } from "@/app/core/config/types";

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
export default function useProjectContext() {
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
  const fetcher: Fetcher<IProjectContext, EEndpoint> = (endpoint: EEndpoint) =>
    fetch(endpoint).then((res) => {
      return new Promise(async (resolve) => {
        const projectContext = (await res.json()) as IProjectContext;
        const { tracks, ...rest } = projectContext;
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
    data: projectContext,
    isLoading,
    error,
  } = useSWR(EEndpoint.ProjectContext, fetcher, {
    revalidateOnFocus: false, // would make Wavesurfer audio file disappear
  });

  /**
   * UPdATE
   */
  const { mutate } = useSWRConfig();
  const updateProjectContext = async (patch: Partial<IProjectContext>) => {
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

    await fetch(EEndpoint.ProjectContext, {
      method: "PATCH",
      body: JSON.stringify(patch.tracks ? { tracks: readyPatch } : readyPatch),
    });

    mutate(EEndpoint.ProjectContext);
  };
  return { projectContext, isLoading, error, updateProjectContext };
}

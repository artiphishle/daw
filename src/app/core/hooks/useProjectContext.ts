import useSWR, { useSWRConfig, type Fetcher } from "swr";

import {
  useBaseDrum,
  useBassSynth,
  useHiHat,
  useSampler,
  useSnareDrum,
} from "@/app/core/instruments";

import { ETrackType } from "@/app/types/daw";
import type { IProjectContext } from "@/app/core/config/types";

export enum EInstrument {
  BaseDrum = "BaseDrum",
  SnareDrum = "SnareDrum",
  ClosedHiHat = "ClosedHiHat",
  BassSynth = "BassSynth",
  Sampler = "Sampler",

  /*
   * PollySynth = "PollySynth",
   * FMSynth = "FMSynth",
   * AMSynth = "AMSynth",
   * DuoSynth = "DuoSynth",
   * MembraneSynth = "MembraneSynth",
   * MetalSynth = "MetalSynth",
   * MonoSynth = "MonoSynth",
   * NoiseSynth = "NoiseSynth",
   * PluckSynth = "PluckSynth",
   * Synth = "Synth",
   */
}

const typesWithInstrument = [ETrackType.Instrument, ETrackType.Sampler];
const endpointProjectSettings = "/api/project/settings";

// TODO Put api into: /app/api/
export default function useProjectContext() {
  // TODO dynamically load instruments
  const INSTRUMENT = {
    BaseDrum: useBaseDrum,
    SnareDrum: useSnareDrum,
    ClosedHiHat: useHiHat,
    BassSynth: useBassSynth,
    Sampler: useSampler,
  };

  /**
   * Fetch (GET)
   */
  const fetcher: Fetcher<IProjectContext, string> = (endpoint: string) =>
    fetch(endpointProjectSettings).then(
      (res) =>
        // eslint-disable-next-line no-async-promise-executor
        new Promise(async (resolve) => {
          const projectContext = (await res.json()) as IProjectContext;
          const { tracks, ...rest } = projectContext;
          const mutatedTracks = tracks.map((track) => {
            if (!typesWithInstrument.includes(track.type)) return track;

            const { id, options, ...inputRest } = track.routing.input;
            const instrument = INSTRUMENT[<EInstrument>id](options);
            const routing = {
              ...track.routing,
              input: { ...inputRest, id, instrument, options },
            };
            return { ...track, routing };
          });
          resolve({ ...rest, tracks: mutatedTracks });
        })
    );

  const {
    data: projectContext,
    isLoading,
    error,
  } = useSWR(endpointProjectSettings, fetcher, {
    revalidateOnFocus: false,
  });

  /**
   * Mutate (PATCH)
   */
  const { mutate } = useSWRConfig();
  const updateProjectContext = async (patch: Partial<IProjectContext>) => {
    // DESELECTOR (cannot serialize instruments)
    const readyPatch = patch.tracks
      ? patch.tracks?.map((track) => {
          if (!track.routing.input.instrument) return track;
          const deselectedTrack = { ...track };
          delete deselectedTrack.routing.input.instrument;
          return deselectedTrack;
        })
      : patch;
    await fetch(endpointProjectSettings, {
      method: "PATCH",
      body: JSON.stringify(patch.tracks ? { tracks: readyPatch } : readyPatch),
    });
    mutate(endpointProjectSettings);
  };
  return { projectContext, isLoading, error, updateProjectContext };
}

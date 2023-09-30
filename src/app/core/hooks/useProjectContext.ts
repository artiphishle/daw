import useSWR, { useSWRConfig, type Fetcher } from "swr";

import {
  useBaseDrum,
  useBassSynth,
  useHiHat,
  useSampler,
  useSnareDrum,
} from "@/app/core/instruments";

import { EEndpoint, ETrackType } from "@/app/types/daw";
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
  const typesWithInstrument = [ETrackType.Instrument, ETrackType.Sampler];

  /**
   * FETCH
   */
  const fetcher: Fetcher<IProjectContext, EEndpoint.ProjectContext> = (
    endpoint: EEndpoint.ProjectContext
  ) =>
    fetch(endpoint).then(
      (res) =>
        new Promise((resolve) => {
          res.json().then((projectContext: IProjectContext) => {
            const { tracks, ...rest } = projectContext;
            const mutatedTracks = tracks.map((track) => {
              if (!typesWithInstrument.includes(track.type)) return track;

              const { id, options, ...inputRest } = track.routing.input;
              const instrument = INSTRUMENT[<EInstrument>id](options);
              const input = { ...inputRest, id, instrument, options };
              const routing = { ...track.routing, input };
              return { ...track, routing };
            });
            resolve({ ...rest, tracks: mutatedTracks });
          });
        })
    );
  const {
    data: projectContext,
    isLoading,
    error,
  } = useSWR(EEndpoint.ProjectContext, fetcher, {
    revalidateOnFocus: false, // Would make Wavesurfer audio file disappear
  });

  /**
   * UPdATE
   */
  const { mutate } = useSWRConfig();
  const updateProjectContext = async (patch: Partial<IProjectContext>) => {
    // DESELECTOR (cannot serialize instruments)
    const readyPatch = patch.tracks?.map((track) => {
      const instrument = track.routing?.input?.instrument;
      if (!instrument) return track;
      const deselectedTrack = { ...track };
      deselectedTrack.routing.input.instrument === null;
      return deselectedTrack;
    });

    await fetch(EEndpoint.ProjectContext, {
      method: "PATCH",
      body: JSON.stringify(patch.tracks ? { tracks: readyPatch } : readyPatch),
    });
    mutate(EEndpoint.ProjectContext);
  };
  return { projectContext, isLoading, error, updateProjectContext };
}

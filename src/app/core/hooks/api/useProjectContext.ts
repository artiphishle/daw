"use client";
import useSWR, { useSWRConfig } from "swr";
import {
  MembraneSynth,
  MembraneSynthOptions,
  MetalSynth,
  MetalSynthOptions,
  NoiseSynth,
  NoiseSynthOptions,
  Sampler as ToneSampler,
  SamplerOptions,
  Synth,
  SynthOptions,
  MonoSynth,
  MonoSynthOptions,
  getContext,
} from "tone";

import Sampler from "@/app/core/instruments/sampler/Sampler";

import {
  EEndpoint,
  ETrackType,
  TInputOptions,
  type IProjectContext,
  EInstrument,
  IInstrument,
} from "@/app/types/daw";

// TODO load instruments dynamically
const loadInstrument = (
  _instrument: EInstrument,
  options: TInputOptions
): IInstrument => {
  let instrument = null;

  switch (_instrument) {
    case EInstrument.MembraneSynth:
      instrument = new MembraneSynth(options as MembraneSynthOptions);
      break;
    case EInstrument.MetalSynth:
      instrument = new MetalSynth(options as MetalSynthOptions);
      break;
    case EInstrument.MonoSynth:
      instrument = new MonoSynth(options as MonoSynthOptions);
      break;
    case EInstrument.NoiseSynth:
      instrument = new NoiseSynth(options as NoiseSynthOptions);
      break;
    case EInstrument.Sampler:
      instrument = new ToneSampler(options as SamplerOptions);
      break;
    case EInstrument.Synth:
      instrument = new Synth(options as SynthOptions);
      break;
    default:
      console.error(
        "[useProjectContext] Using 'Synth' for unknown instrument:",
        _instrument
      );
      instrument = new Synth(options as SynthOptions);
  }
  console.info("✅", _instrument);
  return {
    instrument,
    options,
    Instrument: Sampler,
  };
};
const INSTRUMENT_TYPE = [ETrackType.Instrument, ETrackType.Sampler];

export default function useProjectContext() {
  const { mutate } = useSWRConfig();

  // Add unserializable data and return the data
  const deselectData = (data: IProjectContext) => {
    if (!data.tracks) return data;
    const deselectedTracks = data.tracks.map((track) => {
      if (!INSTRUMENT_TYPE.includes(track.type)) return track;

      const instrument: IInstrument = loadInstrument(
        track.routing.input.id as EInstrument,
        { ...track.routing.input.options, context: getContext() }
      );
      track.routing.input.instrument = instrument;
      return track;
    });
    return { ...data, tracks: deselectedTracks };
  };

  // Remove unnserializable data and return the 'patch' to be applied
  const selectData = (data: Partial<IProjectContext>) => {
    if (!data.tracks) return data;
    return data.tracks.map((track) => {
      if (!track.routing.input.instrument) return track;
      delete track.routing.input.instrument;
      return track;
    });
  };

  const fetcher = async (url: EEndpoint) => {
    const res = await fetch(url);
    const data = await res.json();
    return deselectData(data);
  };

  const patch = async (patch: Partial<IProjectContext>) => {
    try {
      const res = await fetch(EEndpoint.ProjectSettings, {
        method: "PATCH",
        body: JSON.stringify(selectData(patch)),
      });
      const data = await res.json();

      mutate(EEndpoint.ProjectSettings, deselectData(data));
    } catch (error) {
      console.error(error);
    }
    // mutate(EEndpoint.ProjectSettings);
  };

  const { data, error, isLoading } = useSWR<IProjectContext, any, EEndpoint>(
    EEndpoint.ProjectSettings,
    fetcher
  );

  return { projectContext: data, error, isLoading, patchProjectContext: patch };
}

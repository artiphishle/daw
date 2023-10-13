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
  Players,
  PlayersOptions,
} from "tone";

import OmniSynth from "@/core/instruments/OmniSynth";

import { EEndpoint } from "@/types/api.types";
import { ETrackType } from "@/types/track.types";
import type { IProjectContext } from "@/types/project.types";
import {
  type TInputOptions,
  type IInstrument,
  EInstrument,
} from "@/types/instrument.types";
import Sampler from "@/core/instruments/Sampler";

// TODO load instruments dynamically
const loadInstrument = (
  _instrument: EInstrument,
  options: TInputOptions
): IInstrument => {
  let instrument = null;
  let Instrument = null;

  switch (_instrument) {
    case EInstrument.MembraneSynth:
      Instrument = OmniSynth;
      instrument = new MembraneSynth(options as MembraneSynthOptions);
      break;
    case EInstrument.MetalSynth:
      Instrument = OmniSynth;
      instrument = new MetalSynth(options as MetalSynthOptions);
      break;
    case EInstrument.MonoSynth:
      Instrument = OmniSynth;
      instrument = new MonoSynth(options as MonoSynthOptions);
      break;
    case EInstrument.NoiseSynth:
      Instrument = OmniSynth;
      instrument = new NoiseSynth(options as NoiseSynthOptions);
      break;
    case EInstrument.Player:
      Instrument = OmniSynth;
      instrument = new Players(options as PlayersOptions);
      break;
    case EInstrument.Players:
      Instrument = OmniSynth;
      instrument = new Players(options as PlayersOptions) as Players;
      break;
    case EInstrument.Sampler:
      Instrument = Sampler;
      instrument = new ToneSampler(options as SamplerOptions);
      break;
    case EInstrument.Synth:
      Instrument = OmniSynth;
      instrument = new Synth(options as SynthOptions);
      break;
    default:
      console.error(
        "[useProjectContext] Using 'Synth' for unknown instrument:",
        _instrument
      );
      Instrument = OmniSynth;
      instrument = new Synth(options as SynthOptions);
  }
  return {
    Instrument,
    instrument,
    options,
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
    const tracks = data.tracks.map((track) => {
      if (!track.routing.input.instrument) return track;
      delete track.routing.input.instrument;
      return track;
    });
    return { ...data, tracks };
  };

  const fetcher = async (url: EEndpoint) => {
    const res = await fetch(url);
    const data = await res.json();
    return deselectData(data);
  };

  const patch = async (patch: Partial<IProjectContext>) => {
    console.log("useProjectContext > patch", selectData(patch));
    try {
      const res = await fetch(EEndpoint.ProjectSettings, {
        method: "PATCH",
        body: JSON.stringify(selectData(patch)),
      });
      const data = await res.json();
      await mutate(EEndpoint.ProjectSettings, deselectData(data));
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, isLoading } = useSWR<IProjectContext, any, EEndpoint>(
    EEndpoint.ProjectSettings,
    fetcher
  );

  return {
    projectContext: data,
    error,
    isLoading,
    patchProjectContext: patch,
    mutate,
  };
}

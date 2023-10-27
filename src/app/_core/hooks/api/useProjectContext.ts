'use client';
import useSWR, { useSWRConfig } from 'swr';
import * as Tone from 'tone';

import OmniSynth from 'app/_core/instruments/OmniSynth';
import Sampler from 'app/_core/instruments/Sampler';

import { EEndpoint } from 'app/_common/types/api.types';
import type { IProjectContext } from 'app/_common/types/project.types';
import {
  type TInputOptions,
  type IInstrument,
  EInstrument,
} from 'app/_common/types/instrument.types';
import { useEffect, useState } from 'react';

// TODO load instruments dynamically
const loadInstrument = (_instrument: EInstrument, options: TInputOptions) => {
  let instrument = null;
  let Instrument = null;

  switch (_instrument) {
    case EInstrument.MembraneSynth:
    case EInstrument.MetalSynth:
    case EInstrument.MonoSynth:
    case EInstrument.NoiseSynth:
    case EInstrument.Players:
    case EInstrument.Synth:
      Instrument = OmniSynth;
      instrument = new Tone[_instrument](options as Record<string, unknown>);
      break;
    case EInstrument.Player:
      Instrument = OmniSynth;
      instrument = new Tone.Player(options as Tone.PlayerOptions);
      break;
    case EInstrument.Sampler:
      Instrument = Sampler;
      instrument = new Tone.Sampler(options as Tone.SamplerOptions);
      break;
    default:
      console.warn(
        "[useProjectContext] Using 'Synth' for unknown instrument:",
        _instrument,
      );
      Instrument = OmniSynth;
      instrument = new Tone.Synth(options as Tone.SynthOptions);
      break;
  }
  return { Instrument, instrument, options } as IInstrument;
};

export default function useProjectContext() {
  const { mutate } = useSWRConfig();
  const [loaded, setLoaded] = useState<any>([]);

  // Add unserializable data and return the data
  const deselectData = (data: IProjectContext) => {
    const { channels = [], tracks = [] } = data;

    // 1 Channel
    const deselectedChannels = channels.map((channel) => ({
      ...channel,
      channel: new Tone.Channel(channel.options),
    }));

    // 2 Instrument
    const deselectedTracks = tracks.map((track) => {
      const { routing } = track;
      const instrument: IInstrument = loadInstrument(
        routing.input.id as EInstrument,
        { ...routing.input.options },
      );
      setLoaded((loaded: any) => [...loaded, instrument]);
      routing.input.instrument = instrument;
      return {
        ...track,
        routing: { ...routing, input: { ...routing.input, instrument } },
      };
    });
    return { ...data, channels: deselectedChannels, tracks: deselectedTracks };
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
    console.log('useProjectContext > patch', selectData(patch));
    try {
      const res = await fetch(EEndpoint.ProjectSettings, {
        method: 'PATCH',
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
    fetcher,
  );

  return {
    projectContext: data,
    error,
    isLoading,
    patchProjectContext: patch,
    mutate,
  };
}

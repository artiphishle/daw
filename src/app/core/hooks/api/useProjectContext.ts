'use client';
import useSWR, { useSWRConfig } from 'swr';
import * as Tone from 'tone';

import OmniSynth from '@/core/instruments/OmniSynth';
import Sampler from '@/core/instruments/Sampler';

import { EEndpoint } from 'app/common/types/api.types';
import { ETrackType } from 'app/common/types/track.types';
import type { IProjectContext } from 'app/common/types/project.types';
import {
  type TInputOptions,
  type IInstrument,
  EInstrument,
} from 'app/common/types/instrument.types';

// TODO load instruments dynamically
const loadInstrument = (_instrument: EInstrument, options: TInputOptions) => {
  let instrument = null;
  let Instrument = null;

  switch (_instrument) {
    case EInstrument.MembraneSynth:
      Instrument = OmniSynth;
      instrument = new Tone.MembraneSynth(options as Tone.MembraneSynthOptions);
      break;
    case EInstrument.MetalSynth:
      Instrument = OmniSynth;
      instrument = new Tone.MetalSynth(options as Tone.MetalSynthOptions);
      break;
    case EInstrument.MonoSynth:
      Instrument = OmniSynth;
      instrument = new Tone.MonoSynth(options as Tone.MonoSynthOptions);
      break;
    case EInstrument.NoiseSynth:
      Instrument = OmniSynth;
      instrument = new Tone.NoiseSynth(options as Tone.NoiseSynthOptions);
      break;
    case EInstrument.Player:
      Instrument = OmniSynth;
      instrument = new Tone.Player(options as Tone.PlayerOptions);
      break;
    case EInstrument.Players:
      Instrument = OmniSynth;
      instrument = new Tone.Players(
        options as Tone.PlayersOptions
      ) as Tone.Players;
      break;
    case EInstrument.Sampler:
      Instrument = Sampler;
      instrument = new Tone.Sampler(options as Tone.SamplerOptions);
      break;
    case EInstrument.Synth:
      Instrument = OmniSynth;
      instrument = new Tone.Synth(options as Tone.SynthOptions);
      break;
    default:
      console.error(
        "[useProjectContext] Using 'Synth' for unknown instrument:",
        _instrument
      );
      Instrument = OmniSynth;
      instrument = new Tone.Synth(options as Tone.SynthOptions);
  }
  return {
    Instrument,
    instrument,
    options,
  };
};

export default function useProjectContext() {
  const { mutate } = useSWRConfig();

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
      const { type, routing } = track;

      if (type !== ETrackType.Player) return track;
      const instrument: IInstrument = loadInstrument(
        routing.input.id as EInstrument,
        { ...routing.input.options }
      );
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

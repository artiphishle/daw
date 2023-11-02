'use client';
import * as Tone from 'tone';

import OmniSynth from '@/core/instruments/OmniSynth';
import Sampler from '@/core/instruments/Sampler';

import {
  EInstrument,
  type IInstrument,
  type TInputOptions,
} from '@/common/types/instrument.types';
import { ITrack } from '@/common/types/track.types';
import { IChannel } from '@/common/types/channel.types';

export function useSelector() {
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
          "[useSelector] Using 'Synth' for unknown instrument:",
          _instrument,
        );
        Instrument = OmniSynth;
        instrument = new Tone.Synth(options as Tone.SynthOptions);
        break;
    }
    return { Instrument, instrument, options } as IInstrument;
  };

  return {
    deselectChannels: (channels: IChannel[]) => ({
      channels: channels.map((channel) => {
        delete channel.channel;
        return channel;
      }),
    }),
    deselectTracks: (tracks: ITrack[]) => ({
      tracks: tracks.map((track) => {
        delete track.routing.input.instrument;
        return { ...track };
      }),
    }),
    selectChannels: (channels: IChannel[]) =>
      channels.map(({ options, ...rest }) => ({
        ...rest,
        options,
        channel: new Tone.Channel(options),
      })),
    selectTracks: (tracks: ITrack[]) =>
      tracks.map((track) => {
        const { routing } = track;
        const instrument = loadInstrument(routing.input.id as EInstrument, {
          ...routing.input.options,
        });
        routing.input.instrument = instrument;
        return { ...track, ...routing };
      }),
  };
}

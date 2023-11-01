import { FC } from 'react';
import {
  ChannelOptions,
  MembraneSynth,
  MetalSynth,
  MonoSynth,
  NoiseSynth,
  Player,
  Players,
  PlayersOptions,
  Sampler,
  Synth,
} from 'tone';
import { RecursivePartial as TRecursivePartial } from 'tone/build/esm/core/util/Interface';

export interface IInstrumentPortal {
  InstrumentPortal: FC<{}>;
  openInstrument: () => void;
  toggleInstrument: () => void;
  closeInstrument: () => void;
  isOpen: boolean;
}

export enum EInstrument {
  AmSynth = 'AmSynth',
  FmSynth = 'FmSynth',
  MembraneSynth = 'MembraneSynth',
  MetalSynth = 'MetalSynth',
  MonoSynth = 'MonoSynth',
  NoiseSynth = 'NoiseSynth',
  OmniSynth = 'OmniSynth',
  Player = 'Player',
  Players = 'Players',
  Sampler = 'Sampler',
  Synth = 'Synth',
}

export type TInstrument =
  | MembraneSynth
  | MetalSynth
  | MonoSynth
  | NoiseSynth
  | Player
  | Players
  | Sampler
  | Synth;

export type TInputOptions =
  | TRecursivePartial<TInstrument>
  | Partial<ChannelOptions>
  | Partial<PlayersOptions>
  | { url?: string };

export interface IInstrument {
  Instrument: FC<any>;
  instrument: TInstrument;
  options: TInputOptions;
}

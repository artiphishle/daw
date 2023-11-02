// import useSWR, { useSWRConfig } from 'swr';
/*
import * as Tone from 'tone';

import OmniSynth from 'app/_core/instruments/OmniSynth';
import Sampler from 'app/_core/instruments/Sampler';
*/
// import { EEndpoint } from 'app/_common/types/api.types';
// import type { IProject } from 'app/_common/types/project.types';
/*
import {
  type TInputOptions,
  type IInstrument,
  EInstrument,
} from 'app/_common/types/instrument.types';
*/
// import { useSelector } from '../useSelector';

/*
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
*/
export default function useProjectContext(dangerousFields: string[]) {
  return {};
  // const { mutate } = useSWRConfig();
  // const { deselect, select } = useSelector();
  /*
  const fetcher = async (url: EEndpoint) =>
    select(await (await fetch(url)).json());
  */
  // const patch = (patch: Partial<IProjectContext>) => {
  // 1. Remove (deselect) unserializable data (Tone instrument/channel)
  // const body = { method: 'PATCH', body: JSON.stringify(deselect(patch)) };
  // 2. Update project data
  /*
    fetch(EEndpoint.ProjectSettings, body).then((res) => {
      res
        .json()
        .then((data) => {
          // 3. Update local cache (TODO first this? optimistic)
          mutate(EEndpoint.ProjectSettings, deselect(data)).catch(
            console.error,
          );
        })
        .catch(console.error);
    });
    */
}

/*
  return {
    data: useSWR<Partial<IProjectContext>, any, EEndpoint>(
      EEndpoint.ProjectSettings,
      fetcher,
    ),
    patch,
  };
  */

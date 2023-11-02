'use client';
import { ISignalFlow } from 'app/_common/types/project.types';
import _ from 'lodash/fp';
import { useState } from 'react';

/***
  @Hook
*/
function useAudioSignalRouter(initialFlows: ISignalFlow[] = []) {
  const [flows, setFlows] = useState<ISignalFlow[]>(initialFlows);

  const add = (flow: ISignalFlow) => setFlows([...flows, flow]);
  const remove = (flow: ISignalFlow) => setFlows(_.remove(flow, flows));

  const $dsp = [
    ['track-drums', 'channel-drums'],
    ['track-audio-halloween', 'masterGain'],
    ['track-player-drums', 'masterGain'],
    ['', 'master'],
  ];

  return { add, remove };
}

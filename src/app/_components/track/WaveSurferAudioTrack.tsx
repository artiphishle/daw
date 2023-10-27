import { ToneAudioBuffer } from 'tone';
import { WaveSurferOptions } from 'wavesurfer.js';
import { analyze } from 'web-audio-beat-detector';
import WaveForm from './WaveForm';

export default function WaveSurferAudioTrack({
  url,
}: Partial<WaveSurferOptions>) {
  if (!url) return null;

  (async () => {
    try {
      const buffer = await new ToneAudioBuffer().load(url);
      const tempo = await analyze(buffer.get()!);
      console.info('[WaveSurferAudioTrack] BPM Detection:]', url, tempo);
    } catch (error) {
      console.error(error);
    }
  })();

  return <WaveForm url={url as string} />;
}

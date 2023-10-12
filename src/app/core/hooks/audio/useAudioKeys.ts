import AudioKeys from "audiokeys";

interface IAudioKeysOptions {
  rows: 1 | 2;
}

export default function useAudioKeys({ rows = 1 }: IAudioKeysOptions) {
  return new AudioKeys({ rows });
}

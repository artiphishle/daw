import { Synth } from "tone";
import AudioKeys from "audiokeys";

export default function usePiano() {
  const synth = new Synth().toDestination();
  const keyboard = new AudioKeys({ rows: 1 });

  keyboard.down(({ frequency }: { frequency: number }) => {
    synth.triggerAttackRelease(frequency, "8n");
  });

  return;
}

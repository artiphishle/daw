import { MembraneSynth } from "tone";

export default function useBaseDrum() {
  const baseDrum = new MembraneSynth().toDestination();

  return baseDrum;
}

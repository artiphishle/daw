/**
 * Beater:
 * - A beater is a small, weighted object that strikes the drumhead to produce sound
 * - different shapes for e.g. different attack
 *
 * Pedals
 *   Heel down
 *   - heel is on the pedal
 *   - often for Jazz as light & controlled (powerful also possible)
 *   - beater comes completely off the drumhead
 *
 *   Heel up:
 *   - Rock, Country, Hiphop, etc.
 *   - powerful, you can slam on it
 *   - more comfortable
 *   - beater in on the drumhead in between hits, so restricts the drum a bit

 *   Heel up (advanced, fast doubles)
 *   - Slide technique
 *   - Heel toe (youtube: Derrick Cope)
 */

import { MembraneSynth, type MembraneSynthOptions } from "tone";
import { RecursivePartial } from "tone/build/esm/core/util/Interface";

export default function useBaseDrum({
  volume = -24,
  ...rest
}: RecursivePartial<MembraneSynthOptions>) {
  const baseDrum = new MembraneSynth({ volume, ...rest });

  return baseDrum;
}

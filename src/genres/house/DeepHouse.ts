import { useRolandTr909 } from "@/app/core/instruments/synths/hooks/useRolandTr909";

/**
 * @stylistics House, ChicagoHouse, Soul
 * @origins Jazz-Funk, New York Garage
 * @since 1980s
 * @artist Larry Heard – Can You Feel It
 *
 * @bpm 110 - 125
 * @bass muted
 */
const preset = {
  bpm: 120,
  tracks: {
    bass: {},
    drums: { synth: useRolandTr909 },
  },
};

export { preset };

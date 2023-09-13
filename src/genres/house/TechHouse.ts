// TODO buy that one
function useRolandTb303() {}

/**
 * @stylistic House, Techno, MinimalTechno
 * @origin associated with UK & Detroit
 * @since mid/late 1990s
 * @description
 * - Styistic features of Tehchno + House (DeepHouse finds MinimalTechno)
 * - Often contains Dub elements
 * - Some overlap with progressive house, the latter more energetic
 * @artist Adam Beyer
 */
const preset = {
  bpm: [110, 125],
  tracks: {
    drums: {
      /**
       * Boomy deephouse kick's replaced by techno ones:
       * shorter, deeper, darker, often distorted
       */
      baseDrum: {},
      /**
       * Noisier & more synthetic Snare's
       */
      snareDrum: {},
      /**
       * Smaller, quicker Hihat's
       */
      Hihat: { Closed: {}, Open: {} },
    },

    /**
     * Acid sounding synth melodies from the Roland TB-303
     */
    synths: { bass: {}, melodies: {} },
  },
};

export { preset };

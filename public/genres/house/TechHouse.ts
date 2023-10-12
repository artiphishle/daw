/**
 * @origin associated with UK & Detroit
 * @bpm 110-125
 * @since mid/late 1990s
 * @artist Adam Beyer
 *
 * @baseDrum Boomy deephouse bd's replaced, by techno's:
 * - shorter/deeper/darker & often distorted
 * @snareDrum Noisier & more synthetic
 * @hiHat smaller & quicker
 *
 * @stylistic
 * - House/Techno/MinimalTechno
 * - Features of Tehchno + House, DeepHouse finds MinimalTechno
 * - Often contains Dub elements
 * - Some overlap with progressive house, the latter more energetic
 */
const preset = {
  bpm: 110,
  tracks: {
    drums: {
      baseDrum: {},
      closedHiHat: {},
      openHiHat: {},
      snareDrum: {},
    },

    /**
     * Acid sounding synth melodies from the Roland TB-303
     */
    synths: { bass: {}, melodies: {} },
  },
};

export { preset };

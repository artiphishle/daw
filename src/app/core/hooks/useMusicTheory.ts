import useProjectSettings from "@/app/hooks/useProjectSettings";
import { Chord, Progression } from "tonal";

export default function useMusicTheory() {
  const { projectSettings } = useProjectSettings();
  if (!projectSettings) return null;
  const { clef: tonic } = projectSettings;

  /**
   * detects chord by notes
   */
  function detectChord(notes: string[]) {
    return Chord.detect(notes);
  }

  /**
   * returns notes of chord progression
   * e.g. "C" , "I V vi IV" returns C G Am F
   */
  function getChords(progression: string | string[]) {
    const ROMAN_NUMS = ["i", "ii", "iii", "iv", "v", "vi", "vii"];
    const prog =
      typeof progression === "string" ? progression.split(" ") : progression;

    const mappedProgression = prog.map((roman: string) =>
      ROMAN_NUMS.includes(roman) ? `${roman}m` : roman
    );
    return Progression.fromRomanNumerals(tonic, mappedProgression);
  }

  return { detectChord, getChords };
}

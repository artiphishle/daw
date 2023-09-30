import useProjectContext from "@/app/core/hooks/useProjectContext";
import { Chord, Progression } from "tonal";

export default function useMusicTheory() {
  const { projectContext } = useProjectContext();
  if (!projectContext) return null;
  const { clef: tonic } = projectContext;

  /**
   * Detects chord by notes
   */
  function detectChord(notes: string[]) {
    return Chord.detect(notes);
  }

  /**
   * Returns notes of chord progression
   * e.g. "C" , "I V vi IV" returns C G Am F
   */
  function getChords(progression: string | string[]) {
    const ROMAN_NUMS = ["i", "ii", "iii", "iv", "v", "vi", "vii"];
    const prog =
      typeof progression === "string"
? progression.split(" ")
: progression;

    const mappedProgression = prog.map((roman: string) =>
      (ROMAN_NUMS.includes(roman)
? `${roman}m`
: roman));
    return Progression.fromRomanNumerals(tonic, mappedProgression);
  }

  return { detectChord, getChords };
}

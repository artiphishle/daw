import { useState } from "react";
import { Chord, Progression } from "tonal";

interface IUseMusicTheoryProps {
  tonic: string;
}

export default function useMusicTheory({
  tonic: _tonic,
}: IUseMusicTheoryProps) {
  const [tonic, setTonic] = useState(_tonic);

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

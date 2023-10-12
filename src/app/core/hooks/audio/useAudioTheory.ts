import _ from "lodash/fp";
import { Chord, Progression } from "tonal";

import type { Note as TNote } from "tone/build/esm/core/type/NoteUnits";
import { isRomanNum } from "@/constants";

const ERR_NUM = "[useAudioTheory] isRomanNum: Invalid numeral";

type TProgression = string | string[];
interface IUseAudioTheory {
  tonic: TNote;
}
export default function useAudioTheory({ tonic }: IUseAudioTheory) {
  const getChordByNotes = (notes: string[]) => Chord.detect(notes);
  const getChordsByProgression = (progression: TProgression) => {
    const prog = _.isArray(progression) ? progression : progression.split(" ");
    const mappedProgression = prog.map((roman: string) =>
      isRomanNum(roman) ? `${roman}m` : ""
    );
    return Progression.fromRomanNumerals(tonic, mappedProgression);
  };
  return { getChordByNotes, getChordsByProgression };
}

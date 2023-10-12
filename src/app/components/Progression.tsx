import _ from "lodash/fp";

import t from "@/app/core/i18n";
import styles from "@/app/core/config/styles";
import useAudioTheory from "@/app/core/hooks/audio/useAudioTheory";
import useProjectContext from "@/app/core/hooks/api/useProjectContext";

import type { Note as TNote } from "tone/build/esm/core/type/NoteUnits";
import { PROGRESSION } from "@/constants";
import { useMemo } from "react";

interface IProgression {
  tonic: TNote;
}
export default function Progression({ tonic }: IProgression) {
  const [, progression] = PROGRESSION;
  const { getChordsByProgression } = useAudioTheory({ tonic });
  const chords = getChordsByProgression(progression);

  const memoProgressions = useMemo(
    () => PROGRESSION.map((p) => getChordsByProgression(p).join(" ")),
    [tonic]
  );

  const { projectContext } = useProjectContext();
  if (!projectContext) return null;
  const { clef } = projectContext;

  return (
    <section>
      <h3 className="py-4">
        Calculate progression (try to change &apos;clef&apos; on top)
      </h3>
      <table>
        <thead>
          <th>Roman numerals</th>
          <th>Tonic</th>
          <th>Progression</th>
        </thead>
        <tbody>
          {memoProgressions.map((memoProgression, progressionIndex) => {
            return (
              <tr
                key={`testing-progression-${progressionIndex}`}
                className="border border-b-gray-100"
              >
                <td className="p-3 border border-r-gray-100">
                  <b>{PROGRESSION[progressionIndex]}</b>
                </td>
                <td className="p-3">{clef}</td>
                <td className="p-3 bg-gray-200">{memoProgression}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <small>
        Try to change the &apos;clef&apos; in the transporter on top
      </small>
    </section>
  );
}

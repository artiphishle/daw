import _ from 'lodash/fp';
import { useMemo } from 'react';

import { PROGRESSION } from 'app/_common/constants';
import useAudioTheory from 'app/_core/hooks/audio/useAudioTheory';

import type { Note as TNote } from 'tone/build/esm/core/type/NoteUnits';
import t from 'app/_core/i18n';
import { fetchProject } from '@/api/project/_presets/DefaultPreset';

interface IProgression {
  tonic: TNote;
}
export default function Progression({ tonic }: IProgression) {
  const { clef } = fetchProject();
  const [, progression] = PROGRESSION;
  const { getChordsByProgression } = useAudioTheory({ tonic });
  const chords = getChordsByProgression(progression);

  const memoProgressions = useMemo(
    () => PROGRESSION.map((p) => getChordsByProgression(p).join(' ')),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tonic],
  );

  return (
    <section>
      <h3 className="py-4">
        Calculate progression (try to change &apos;clef&apos; on top)
      </h3>
      <table>
        <thead>
          <tr>
            <th>Roman numerals</th>
          </tr>
          <tr>
            <th>Tonic</th>
          </tr>
          <tr>
            <th>{_.upperFirst(t('progression'))}</th>
          </tr>
        </thead>
        <tbody>
          {memoProgressions.map((memoProgression, progressionIndex) => {
            return (
              <tr
                key={`testing-progression-${progressionIndex}`}
                className="border border-b-gray-100"
              >
                <td className="p-1 border border-r-gray-100">
                  <b>{PROGRESSION[progressionIndex]}</b>
                </td>
                <td className="p-1">{clef}</td>
                <td className="p-1 bg-gray-200">{memoProgression}</td>
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

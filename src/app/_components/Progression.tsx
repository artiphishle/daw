import _ from 'lodash/fp';
import React from 'react';

import { PROGRESSION } from '@/common/constants';
import t from '@/core/i18n';
import useAudioTheory from '@/core/hooks/audio/useAudioTheory';

import type { Note as TNote } from 'tone/build/esm/core/type/NoteUnits';

import styles from '@/common/styles';
const $ = styles.progression;

interface IProgression {
  clef: string;
  tonic: TNote; // clef[0] I assume
}
export function Progression({ clef, tonic }: IProgression) {
  const [, progression] = PROGRESSION;
  const { getChordsByProgression } = useAudioTheory({ tonic });
  const chords = getChordsByProgression(progression);

  const memoProgressions = React.useMemo(
    () => PROGRESSION.map((p) => getChordsByProgression(p).join(' ')),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tonic],
  );

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>{t('romanNumerals')}</th>
          </tr>
          <tr>
            <th>{t('tonic')}</th>
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
                className={$.tr}
              >
                <td className={$.td1}>
                  <b>{PROGRESSION[progressionIndex]}</b>
                </td>
                <td className={$.td2}>{clef}</td>
                <td className={$.td3}>{memoProgression}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

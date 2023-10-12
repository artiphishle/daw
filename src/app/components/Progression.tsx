import _ from "lodash/fp";

import t from "@/app/core/i18n";
import styles from "@/app/core/config/styles";
import useAudioTheory from "@/app/core/hooks/audio/useAudioTheory";
import useProjectContext from "@/app/core/hooks/api/useProjectContext";

import type { Note as TNote } from "tone/build/esm/core/type/NoteUnits";
import { PROGRESSION } from "@/constants";

interface IProgression {
  tonic: TNote;
}
export default function Progression({ tonic }: IProgression) {
  const [, progression] = PROGRESSION;
  const { getChordsByProgression } = useAudioTheory({ tonic });
  const chords = getChordsByProgression(progression);

  const { projectContext } = useProjectContext();
  if (!projectContext) return null;

  const { clef } = projectContext;

  return (
    <section className="bg-white p-8 mb-8">
      <h2 className={styles.headings.h2}>{t("chordProgression")}</h2>
      <p>
        Tonic <span className="p-2 bg-gray-200">{clef}</span> {t("progression")}
        : <span className="p-2 bg-gray-200">{progression}</span>
        &nbsp;
        <span>
          = <b>{chords.join(" ")}</b>
        </span>
      </p>
      <small>
        Try to change the &apos;clef&apos; in the transporter on top
      </small>
    </section>
  );
}

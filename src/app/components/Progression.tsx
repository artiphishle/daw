import t from "@/app/core/i18n";
import styles from "@/app/core/config/styles";
import useMusicTheory from "@/app/core/hooks/useMusicTheory";
import useProjectContext from "@/app/core/hooks/useProjectContext";

enum EProgression {
  IVviIV = "I V vi IV",
}

export default function Progression() {
  const chords = useMusicTheory()?.getChords(EProgression.IVviIV);

  const { projectContext } = useProjectContext();
  if (!projectContext) return null;

  const { clef } = projectContext;

  return (
    <section className="bg-white p-8 mb-8">
      <h2 className={styles.headings.h2}>{t("chordProgression")}</h2>
      <p>
        Tonic <span className="p-2 bg-gray-200">{clef}</span> {t("progression")}
        : <span className="p-2 bg-gray-200">I V vi IV</span>
        &nbsp;
        <span>
          = <b>{chords}</b>
        </span>
      </p>
      <small>
        Try to change the &apos;clef&apos; in the transporter on top
      </small>
    </section>
  );
}

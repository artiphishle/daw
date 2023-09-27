import t from "@/app/core/i18n";
import styles from "@/app/core/config/styles";
import useMusicTheory from "@/app/core/hooks/useMusicTheory";
import useProjectContext from "@/app/core/hooks/useProjectContext";

const PROGRESSION = [
  "I vi IV V", // 50s Progression
  "I V vi IV",
  "I IV ii V", // Montgomery Ward bridge
  "vi ii V I", // Circle Progression
  "I V IV IV I V I V", // Eight-bar blues
  "ii V I",
  "I V vi iii IV I IV V", // Pachelbel's Canon
  "i VII i V III VII i V i", // Passamezzo antico
  "I IV I V I IV I V I", // Passamezzo moderno
  "I I I I I I I I IV IV I I V IV I I", // Sixteen-bar blues
];

export default function Progression() {
  const chords = useMusicTheory()?.getChords(PROGRESSION[0]);

  const { projectContext } = useProjectContext();
  if (!projectContext) return null;

  const { clef } = projectContext;

  return (
    <section className="bg-white p-8 mb-8">
      <h2 className={styles.headings.h2}>{t("chordProgression")}</h2>
      <p>
        Tonic <span className="p-2 bg-gray-200">{clef}</span> {t("progression")}
        : <span className="p-2 bg-gray-200">{PROGRESSION[0]}</span>
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

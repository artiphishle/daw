import t from "@/app/core/i18n";
import generalStyles from "@/app/core/config/styles";
import useMusicTheory from "@/app/core/hooks/useMusicTheory";

enum EProgression {
  IVviIV = "I V vi IV",
}

export default function Progression() {
  return (
    <section className="bg-white p-4 border border-gray-100 mb-8">
      <h2 className={generalStyles.headings.h2}>{t("chordProgression")}</h2>
      <p>
        Tonic <span className="p-2 bg-gray-200">C</span> {t("progression")}:{" "}
        <span className="p-2 bg-gray-200">I V vi IV</span>&nbsp;
        <span>
          ={" "}
          <b>{useMusicTheory({ tonic: "C" }).getChords(EProgression.IVviIV)}</b>
        </span>
      </p>
    </section>
  );
}

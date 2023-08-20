import { styles } from "@/app/components/tracks/styles";
import t from "@/app/core/i18n";
import { ETrackType } from "../../types";

export default function MidiPluginDefault() {
  return (
    <ul className="flex flex-col">
      <li className={styles.track.row(ETrackType.Midi)}>
        <div className={styles.track.column1(ETrackType.Midi)}>
          <div>{t("all")}</div>
        </div>
      </li>
    </ul>
  );
}

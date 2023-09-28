import { Dispatch, SetStateAction } from "react";
import { Dialog } from "../ui";
import styles from "../core/config/styles";
import { start } from "tone";
import t from "../core/i18n";

interface IStartDialog {
  toneReady: boolean;
  setToneReady: Dispatch<SetStateAction<boolean>>;
}

function StartDialog({ toneReady, setToneReady }: IStartDialog) {
  return (
    <Dialog className={styles.dialog} id="start" open>
      <p className="p-4">{t("dialog.allowAudio")}</p>
      <button
        className={styles.button.primary}
        onClick={async () => {
          await start();
          setToneReady(true);
        }}
      >
        {t("ok")}
      </button>
    </Dialog>
  );
}

export { StartDialog };

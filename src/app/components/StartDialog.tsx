import { Dispatch, SetStateAction } from "react";
import { Button, Dialog } from "../../packages/pfui";
import styles from "../common/styles";
import { start } from "tone";
import t from "../core/i18n";
import { EButtonType } from "packages/pfui/button/Button";
import { EVariant } from "packages/pfui/constants";

interface IStartDialog {
  toneReady: boolean;
  setToneReady: Dispatch<SetStateAction<boolean>>;
}

function StartDialog({ toneReady, setToneReady }: IStartDialog) {
  return (
    <Dialog className={styles.dialog} id="start" open>
      <p className="p-4">{t("dialog.allowAudio")}</p>
      <Button
        onClick={async () => {
          await start();
          setToneReady(true);
        }}
        type={EButtonType.Button}
        value="OK"
        variant={EVariant.Primary}
      />
    </Dialog>
  );
}

export { StartDialog };

'use client';
import { start } from 'tone';

import { Button, Dialog } from '@/pfui';
import t from '@/core/i18n';

import { EButtonType, EVariant } from '@/pfui/constants';
import type { IStartDialog } from '@/common/types/project.types';

import styles from '@/common/styles';
const $ = styles.dialog;

function StartDialog({ setToneReady }: IStartDialog) {
  return (
    <Dialog className={$} id="start" open>
      <p className="p-4">{t('dialog.allowAudio')}</p>
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

'use client';
import * as Tone from 'tone';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { App } from 'app/_components';
import { Button, Dialog } from '@/pfui';
import t from '@/core/i18n';

import { EButtonType, ESize, EVariant } from '@/pfui/constants';

export default function Home() {
  const [toneReady, setToneReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function Start() {
    const onClick = () => {
      setIsLoading(true);
      Tone.start().then(() => setToneReady(true));
    };

    return (
      <Dialog className="mt-[20%] flex flex-col items-center margin-auto p-10">
        <p className="mb-8">{t('allowSound')}</p>
        {isLoading ? (
          <Loader className="" size={24} />
        ) : (
          <Button
            className="inline"
            size={ESize.Xl}
            type={EButtonType.Button}
            variant={EVariant.Primary}
            onClick={onClick}
            value={t('ok')}
          />
        )}
      </Dialog>
    );
  }

  return toneReady ? <App /> : <Start />;
}

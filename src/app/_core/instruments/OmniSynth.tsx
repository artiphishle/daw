import styles from '@/common/styles';
import { PanelTopCloseIcon, XIcon } from 'lucide-react';

import type { MonoSynthOptions } from 'tone';
interface IOmniSynth {
  onClose: () => void;
}

export default function OmniSynth({ onClose }: IOmniSynth) {
  return (
    <section>
      <h1 className={styles.headings.h1} style={{ marginTop: '2rem' }}>
        OmniSynth
      </h1>
      <p>This synth is soon available.</p>
      <div className="absolute top-0 right-0 left-0 bg-zinc-800 p-1 text-right">
        <button onClick={onClose}>
          <XIcon />
        </button>
      </div>
    </section>
  );
}

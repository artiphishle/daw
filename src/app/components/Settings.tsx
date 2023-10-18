import useMidiDevice from "@/core/hooks/audio/useMidiDevice";
import styles from "../../config/styles";
import { useEffect } from "react";

export default function Settings() {
  // Enable MIDI Device (WebMidi)
  useMidiDevice({ sysex: false });

  // useEffect(() => {}, []);

  return (
    <section className="bg-white p-4 pt-8">
      <h1 className={styles.headings.h1}>Settings</h1>
      <hr className="my-8" />
      <h2 className={styles.headings.h2}>Theme</h2>
      <h3 className={styles.headings.h3}>Colors (pending...)</h3>
      <section className="flex">
        <ul>
          <li>Normal</li>
          <li>Primary</li>
          <li>Secondary</li>
          <li>...</li>
          <li>Success</li>
          <li>Warning</li>
          <li>Danger</li>
        </ul>
      </section>
      <hr className="my-8" />
      <h2 className={styles.headings.h2}>Midi Device</h2>
      <p>Tested in Chrome. More browseres supported in a bit.</p>
      {/* <button
        onClick={enableMidi}
        className="inline-flex items-center justify-center px-8 py-4 bg-slate-300"
      >
        Enable Midi Device (Native)
      </button>*/}
    </section>
  );
}

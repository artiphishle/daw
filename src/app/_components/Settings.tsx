'use client';
import { useState } from 'react';
import { ColorPicker } from 'primereact/colorpicker';
import colors from 'tailwindcss/colors';
import _ from 'lodash/fp';

import useMidiDevice from '@/core/hooks/audio/useMidiDevice';
import styles from '@/common/styles';

export default function Settings() {
  // Enable MIDI Device (WebMidi)
  useMidiDevice({ sysex: false });
  const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {}, []);
  function onChange(e: any) {
    console.log('yes', e);
  }
  const colorScale = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ];
  return (
    <section
      className="p-4 relative"
      style={{
        background: darkMode ? 'black' : 'white',
        color: darkMode ? 'white' : 'black',
      }}
    >
      <h1 className={styles.headings.h1}>Settings</h1>
      <h2 className={styles.headings.h2}>Theme</h2>
      <div
        className="absolute left-[200px] top-4"
        onClick={() => setDarkMode((darkMode) => !darkMode)}
      >
        <div
          className="p-4 rounded-full cursor-pointer"
          style={{
            background: darkMode ? 'white' : 'black',
            color: darkMode ? 'black' : 'white',
            fontWeight: 'bold',
          }}
        >
          Toggle Dark/Bright
        </div>
      </div>
      <hr className="my-2" />
      <section className="flex">
        <ul>
          <li>
            {Object.keys(colors).map((k: string, index) => {
              if (index < 9) return null;
              const shades = (colors as any)[k] as Record<string, string>;
              return (
                <section
                  key={`${k}-${index}`}
                  className="flex items-center gap-2 border-b-amber-50"
                >
                  <b className="w-28">{_.upperFirst(k)}</b>
                  <div className="flex">
                    {colorScale.map((sc) => (
                      <div
                        key={index}
                        className="card flex justify-content-center"
                      >
                        <ColorPicker
                          className="max-w-4"
                          value={shades[sc]}
                          style={{
                            marginBottom: '10px',
                            height: 'auto',
                          }}
                          onChange={() => {
                            console.log('TODO Change');
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </li>
        </ul>
      </section>
      <hr className="my-8" />
      <h2 className={styles.headings.h2}>Midi Device</h2>
      {/* <button
        onClick={enableMidi}
        className="inline-flex items-center justify-center px-8 py-4 bg-slate-300"
      >
        Enable Midi Device (Native)
      </button>*/}
    </section>
  );
}

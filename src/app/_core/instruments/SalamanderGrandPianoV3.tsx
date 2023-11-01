import { MouseEvent, useEffect, useState } from 'react';
import { Buffer, Destination, Reverb, Sampler } from 'tone';

export default function SalamanderGrandPianoV3() {
  const name = 'Salamander GP V3';
  const [isLoaded, setIsLoaded] = useState(false);
  const baseUrl = '/samples/SalamanderGP-V3_48khz24bit/';
  const release = 10;

  const sampler = new Sampler({
    baseUrl,
    release,
    urls: {
      A0: 'A0v1.wav',
      C1: 'C1v1.wav',
      'D#1': 'D1v1.wav',
      'F#1': 'Fs1v1.wav',
      A1: 'A1v1.wav',
      C2: 'C2v1.wav',
      'D#2': 'Ds2v1.wav',
      'F#2': 'Fs2v1.wav',
      A2: 'A2v1.wav',
      C3: 'C3v1.wav',
      'D#3': 'Ds3v1.wav',
      'F#3': 'Fs3v1.wav',
      A3: 'A3v1.wav',
      C4: 'C4v1.wav',
      'D#4': 'Ds4v1.wav',
      'F#4': 'Fs4v1.wav',
      A4: 'A4v1.wav',
      C5: 'C5v1.wav',
      'D#5': 'Ds5v1.wav',
      'F#5': 'Fs5v1.wav',
      A5: 'A5v1.wav',
      C6: 'C6v1.wav',
      'D#6': 'Ds6v1.wav',
      'F#6': 'Fs6v1.wav',
      A6: 'A6v1.wav',
      C7: 'C7v1.wav',
      'D#7': 'Ds7v1.wav',
      'F#7': 'Fs7v1.wav',
      A7: 'A7v1.wav',
      C8: 'C8v1.wav',
    },
  }).toDestination();

  const samples = [
    'A0',
    'A1',
    'A2',
    'A3',
    'A4',
    'A5',
    'A6',
    'A7',
    'C1',
    'C2',
    'C3',
    'C4',
    'C5',
    'C6',
    'C7',
    'C8',
    'Ds1',
    'Ds2',
    'Ds3',
    'Ds4',
    'Ds5',
    'Ds6',
    'Ds7',
    'Fs1',
    'Fs2',
    'Fs3',
    'Fs4',
    'Fs5',
    'Fs6',
    'Fs7',
  ];
  const loaders = samples.map((sample) =>
    (async () => await Buffer.load(`${baseUrl}/${sample}v1.wav`))(),
  );

  // Load all piano samples
  useEffect(() => {
    Promise.all(loaders).then(() => setIsLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
   * Const filter = new Tone.AutoFilter(4).start();
   * const distortion = new Tone.Distortion(0.5);
   */
  const reverb = new Reverb(10);

  /*
   * Connect the player to the filter, distortion and then to the master output
   * sampler.chain(filter, distortion, reverb, Tone.Destination);
   */
  sampler.chain(reverb, Destination);

  /*
   *Const keys = new Tone.Players({
   *  urls: {
   *    0: "A1v1.wav",
   *    1: "Fs5v1.wav",
   *    2: "C7v1.wav",
   *    3: "A6v1.wav",
   *  },
   *  fadeOut: "64n",
   *
   *  // Source des sons du séquenceur
   *  baseUrl: "./SalamanderGrandPianoV3/48khz24bit/",
   *}).toDestination();
   */
  function onMouseDown(event: MouseEvent<HTMLDivElement>) {
    const which = event.target as HTMLElement;
    sampler.triggerAttack(which.getAttribute('data-key')!);
  }

  function onMouseUp(event: MouseEvent<HTMLDivElement>) {
    const which = event.target as HTMLElement;
    sampler.triggerRelease(which.getAttribute('data-key')!);
  }

  const MidiKeys = () => (
    <div className="flex">
      {new Array(5).fill('').map((_, octave) =>
        ['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((key) => (
          <div
            data-key={`${key}${octave + 2}`}
            className="relative cursor-pointer pl-2 h-10 text-xs bg-slate-50 border-r border-r-slate-200 text-slate-500"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            key={`key-${key}`}
          >
            {key === 'E' || key === 'B' ? null : (
              <div
                data-key={`${key}#${octave + 2}`}
                className="bg-black w-2 h-6 text-white top-0 bottom-0 left-auto right-0 p-1"
              ></div>
            )}
          </div>
        )),
      )}
    </div>
  );

  return (
    <div className="handle absolute flex-col bg-blue-300 p-2">
      <h3 className="mb-2 font-black">{name}</h3>

      {isLoaded ? <MidiKeys /> : <div>Loading...</div>}
    </div>
  );
}

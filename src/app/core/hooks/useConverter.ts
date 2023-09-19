import { Buffer, Time, setContext } from "tone";
// import { Midi } from "@tonejs/midi";
import { midiToNoteName } from "@tonaljs/midi";
import {
  addPitchBendsToNoteEvents,
  noteFramesToTime,
  outputToNotesPoly,
  BasicPitch,
  type NoteEventTime,
} from "@spotify/basic-pitch";

import { ENoteStyle } from "@/app/components/Sheet";

interface IAudioToMidi {
  audio: string;
}
async function audioToAbc(notes: NoteEventTime[]) {
  let sheet = `X:1\nT:Pan Flute Song\nK:C\nL:1/8\n`;
  let totalDuration = 0;

  notes.forEach((note) => {
    const noteName = midiToNoteName(note.pitchMidi);
    const notation = Time(note.durationSeconds).toNotation();

    totalDuration += note.durationSeconds;

    if (totalDuration >= 4 * Time("4n").toSeconds()) {
      sheet += "|";
      totalDuration = 0;
    }
    sheet += `${noteName.slice(0, -1)}`;

    console.log("[Sheet] noteName:", noteName);
    console.log("[Sheet] notation:", notation);
    console.log("[Sheet] total durations:", totalDuration);
  });
  console.log("[Sheet] Abc:", sheet);
  return sheet;
}

/*
async function midiToAbc(filename: string) {
  const midi = await Midi.fromUrl("path/to/midi.mid");
  const name = midi.name; //the file name decoded from the first track

  let sheet = `X:1\nT:${name}\nM:C\nK:C\nL:1/8\nU:n=!style=${ENoteStyle.Normal}!slice(20))}`;

  midi.tracks.forEach((track) => {
    track.notes.forEach((note, noteIndex) => {
      // if (noteIndex & 4) sheet += "|";
      sheet += `${note.name}`;
      //note.midi, note.time, note.duration, note.name
    });

    // CC are an object / the keys are the CC number
    track.controlChanges[64];
    //they are also aliased to the CC number's common name (if it has one)
    track.controlChanges.sustain.forEach((cc) => {
      // cc.ticks, cc.value, cc.time
    });

    return { midiToAbc };
  });

  return sheet;
}
*/

async function audioToMidi({ audio }: IAudioToMidi) {
  setContext(new AudioContext({ sampleRate: 22050 }));
  const audioBuffer = (await Buffer.fromUrl(audio)).toMono().get()!;
  const frames: number[][] = [];
  const onsets: number[][] = [];
  const contours: number[][] = [];
  let pct: number;

  await new BasicPitch("/model.json").evaluateModel(
    audioBuffer,
    (f: number[][], o: number[][], c: number[][]) => {
      frames.push(...f);
      onsets.push(...o);
      contours.push(...c);
    },
    (p: number) => {
      pct = p;
    }
  );

  const notes = noteFramesToTime(
    addPitchBendsToNoteEvents(
      contours,
      outputToNotesPoly(frames, onsets, 0.25, 0.25, 5)
    )
  );

  return notes;
}

export default function useConverter() {
  return { audioToMidi, audioToAbc };
}

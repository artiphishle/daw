// import { Midi } from "@tonejs/midi";
import { midiToNoteName } from "@tonaljs/midi";
import { Time } from "tone";
import { NoteEventTime } from "@spotify/basic-pitch/types";

export default function useAudioConverter() {
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

  async function audioToAbc(notes: NoteEventTime[]) {
    let sheet = `X:1\nT:Pan Flute Song\nM:C\nL:1/8`;
    let totalDuration = 0;

    notes.forEach((note) => {
      const noteName = midiToNoteName(note.pitchMidi);
      const notation = Time(note.durationSeconds).toNotation();

      totalDuration += note.durationSeconds;

      console.log("[Sheet] noteName:", noteName);
      console.log("[Sheet] notation:", notation);
      console.log("[Sheet] total durations:", totalDuration);
    });
    console.log("[Sheet] Abc:", sheet);
    return sheet;
  }

  return { audioToAbc };
}

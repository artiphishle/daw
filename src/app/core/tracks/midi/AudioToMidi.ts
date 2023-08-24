import {
  addPitchBendsToNoteEvents,
  BasicPitch,
  noteFramesToTime,
  outputToNotesPoly,
} from "@spotify/basic-pitch";
import { Buffer, setContext } from "tone";

export default async function AudioToMidi() {
  const audioCtx = new AudioContext({ sampleRate: 22050 });
  setContext(audioCtx);

  const toneAudioBuffer = (await Buffer.fromUrl("/PanSong.mp3")).toMono();
  const audioBuffer = toneAudioBuffer.get()!;

  console.log("[AudioToMidi] audioBuffer:", audioBuffer);

  const basicPitch = new BasicPitch("/model.json");
  const frames: number[][] = [];
  const onsets: number[][] = [];
  const contours: number[][] = [];
  let pct: number;

  await basicPitch.evaluateModel(
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

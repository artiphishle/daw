"use client";

import Mixer from "@/app/components/Mixer";
import Toolbar from "@/app/components/Toolbar";
import AudioTrack from "@/app/components/tracks/AudioTrack";
import MidiTrack from "@/app/components/tracks/MidiTrack";
import PolySynth from "@/app/instruments/PolySynth";
import StepSequencer from "./components/StepSequencer";
import Time from "./components/view/Time";

export default function Home() {
  return (
    <main className="h-full flex flex-1 flex-col justify-between">
      {/* Toolbar */}
      <Toolbar />

      {/* Sequencer */}
      <StepSequencer />

      {/* Tracks */}
      <div className="flex-1">
        <Time />
        <MidiTrack />
        <MidiTrack />
        <MidiTrack />
        <MidiTrack />
        <AudioTrack />
        <AudioTrack />
      </div>

      {/* Instrument */}
      <PolySynth />

      {/* Mixer */}
      <Mixer />
    </main>
  );
}

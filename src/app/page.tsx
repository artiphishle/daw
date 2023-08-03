"use client";

import Mixer from "@/app/components/Mixer";
import Toolbar from "@/app/components/Toolbar";
import AudioTrack from "@/app/components/tracks/AudioTrack";
import MidiTrack from "@/app/components/tracks/MidiTrack";
import PolySynth from "@/app/instruments/PolySynth";
import Time from "./components/view/Time";

export default function Home() {
  console.log(navigator);

  return (
    <main className="h-full flex flex-1 flex-col justify-between">
      {/* Toolbar */}
      <Toolbar />

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

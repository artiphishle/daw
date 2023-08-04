import { GaugeIcon } from "lucide-react";
import {
  Filter,
  MembraneSynth,
  MetalSynth,
  NoiseSynth,
  Part,
  Synth,
} from "tone";

export default function StepSequencer() {
  const baseDrumTimes = [
    { time: "0:0:0" },
    { time: "0:0:3" },
    { time: "0:0:7" },
    { time: "0:0:12" },
    { time: "0:0:14" },
  ];
  const snareTimes = [{ time: "0:0:7" }, { time: "0:0:14" }];
  const hihatOpenTimes = [
    { time: "0:0:0" },
    { time: "0:0:1" },
    { time: "0:0:2" },
    { time: "0:0:3" },
    { time: "0:0:4" },
    { time: "0:0:5" },
    { time: "0:0:6" },
    { time: "0:0:7" },
    { time: "0:0:8" },
    { time: "0:0:9" },
    { time: "0:0:10" },
    { time: "0:0:11" },
    { time: "0:0:12" },
    { time: "0:0:13" },
    { time: "0:0:14" },
    { time: "0:0:15" },
  ];
  const bassTimes = [
    { time: "0:0:0", note: "C2", duration: "16n" },
    { time: "0:0:2", note: "C2", duration: "16n" },
    { time: "0:0:6", note: "D2", duration: "16n" },
    { time: "0:0:8", note: "D#2", duration: "16n" },
  ];
  const cymbalTimes = [{ note: "C3", duration: "16n", time: "0:0:9" }];

  const baseDrum = new MembraneSynth().toDestination();
  const snareDrum = new NoiseSynth({
    noise: { type: "white" },
    envelope: { attack: 0, decay: 0.2, sustain: 0.1, release: 0.2 },
  }).toDestination();
  const hihatOpen = new NoiseSynth({
    noise: { type: "white", fadeIn: 0.1 },
  }).toDestination();
  const bass = new Synth({
    oscillator: { type: "amsawtooth" },
  }).toDestination();
  const cymbal = new MetalSynth({
    detune: 0.1,
    envelope: { attack: 0.2, decay: 0.01, sustain: 0.01, release: 0.8 },
  }).connect(new Filter({ frequency: 2000 }).toDestination());

  const tracks = [
    { label: "BD", times: baseDrumTimes, snareDrum },
    { label: "SD", times: snareTimes, snareDrum },
    { label: "BA", times: bassTimes, bass },
    { label: "OH", times: hihatOpenTimes, hihatOpen },
    { label: "CH", times: cymbalTimes, cymbal },
  ];

  new Part(function (time) {
    baseDrum.triggerAttackRelease("C1", "16n", time);
  }, baseDrumTimes).start(0);

  new Part(function (time) {
    snareDrum.triggerAttackRelease("8n", time);
  }, snareTimes).start(0);

  new Part(function (time) {
    hihatOpen.triggerAttackRelease("16n", time);
  }, hihatOpenTimes).start(0);

  new Part(function (time, { note, duration }) {
    bass.triggerAttackRelease(note, duration, time);
  }, bassTimes).start(0);

  new Part(function (time, { note, duration }) {
    cymbal.triggerAttackRelease(note, duration, time);
  }, cymbalTimes).start(0);

  return (
    <div className="flex p-4 flex-col">
      {tracks.map(({ label, times }, trackIndex) => (
        <div key={`${label}-${trackIndex}`} className="flex">
          <div className="px-2 py-1 bg-white items-center text-xs flex mb-1">
            <div className="flex">
              <GaugeIcon className="text-gray-300 -rotate-45" />
              <div className="w-10 p-2">{label}</div>
              {new Array(16).fill("").map((_, padIndex) => {
                const bts = times.map((bt) =>
                  parseInt(bt.time.split(":").pop()!)
                );

                return (
                  <div
                    key={`${label}-pad-${padIndex}`}
                    className={`${
                      bts.includes(padIndex)
                        ? "bg-blue-100 text-blue-500"
                        : "bg-gray-100"
                    } cursor-pointer w-8 mr-1 p-2`}
                  >
                    {bts.includes(padIndex) ? "x" : ""}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-1">&nbsp;</div>
        </div>
      ))}
    </div>
  );
}

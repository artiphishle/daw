type UniqueIdentifier = string | number;

import useScheduler from "../useScheduler";
import type { Note } from "tone/build/esm/core/type/NoteUnits";

import Tone from "tone";
jest.mock("tone", () => {
  jest.fn().mockImplementation(() => ({
    start: jest.fn().mockReturnValue(true),
    stop: jest.fn(),
    dispose: jest.fn(),
    MembraneSynth: jest.fn(),
    Sequence: jest.fn().mockImplementation(() => ({
      start: jest.fn().mockReturnValue(true),
    })),
  }));
});

describe("[Hook] useScheduler", () => {
  it("should schedule a Tone.Sequence", () => {
    const id: UniqueIdentifier = "Synth";
    const measureCount = 2;
    const notes: Note[] = ["C4", "C4", "C4", "C4"];

    function MockComponent() {
      const instrument = new Tone.MembraneSynth();
      const { setup, dispose } = useScheduler();
      const sequence = setup(instrument, id, measureCount, notes);
      expect(sequence).toBeInstanceOf(Tone.Sequence);
      expect(dispose).not.toBeCalled();
    }
  });
});

type UniqueIdentifier = string | number;

import React from "react";
import useScheduler from "../audio/useAudioScheduler";
import { IRoutingInput } from "@/app/types/track.types";

jest.mock("@react-hook/window-size", () => {
  jest.fn().mockImplementation(() => ({
    default: jest.fn().mockReturnValue(400),
  }));
});
import useWindowWidth from "@react-hook/window-size";

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
import Tone from "tone";

describe("[Hook] useScheduler", () => {
  it("should schedule a Tone.Sequence", () => {
    /*
    const input: IRoutingInput = {
      label: "",
      id: "test-id",
      options: {
        volume: -24,
      },
      parts: [
        {
          label: "Test Part 1",
          sequences: [
            {
              label: "Test Sequence 1",
              events: [
                { n: "C4", v: 100 },
                { n: "C4", v: 104 },
                { n: "C4", v: 94 },
              ],
            },
          ],
        },
      ],
    };
    const instrument = {
      instrument: new Tone.MembraneSynth(
        input.options as Tone.MembraneSynthOptions
      ),
      Instrument: React.createElement("div"),
    };
    function MockComponent() {
      const { setup, dispose } = useScheduler();
      setup({
        measureCount: 2,
        id: input.id,
        instrument: instrument.instrument,
        parts: input.parts!,
      });
      expect(true).toBeTruthy();
    }
*/
  });
});

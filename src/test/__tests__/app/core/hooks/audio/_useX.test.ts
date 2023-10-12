import { waitFor, renderHook } from "@testing-library/react";
import * as Tone from "tone";
jest.mock("tone");

Tone.setContext(new Tone.Context());

describe("use", () => {
  it("...", async () => {
    const { result } = renderHook(() => {
      console.log("...");
    });

    // await waitFor(() => expect(result.current.loading).toBe(false));
    expect(true).toBe(true);
  });
});

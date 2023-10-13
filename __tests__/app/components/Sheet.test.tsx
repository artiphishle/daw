import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import { Sheet } from "@/components";
import data from "../../data/sheet";

describe("[Component] Sheet", () => {
  it("should verify that testing works!", () => {
    render(<Sheet markdown={data[0]} />);
    expect(screen.findByText("Sheets")).toBeDefined();
  });
});

export {};

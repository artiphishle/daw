import { render } from "@testing-library/react";
import Sheet from "@/app/components/Sheet";
import data from "@/test/data/sheet";

describe("[Component] Sheet", () => {
  it("should verify that testing works!", () => {
    const element = render(<Sheet markdown={data[0]} />);

    expect(element.findByText("Nice Sons")).toBeTruthy();
  });
});

export {};

import React from "react";
import { render, screen } from "@testing-library/react";
import SelectBreeds from "../SelectBreeds";

describe("SelectBreeds", function () {
  it("should be empty <div /> when breeds is undefined or length is less than 0", function () {
    const { container, rerender } = render(<SelectBreeds />);

    expect(container.firstChild).toBeNull();
    expect(container.textContent).toHaveLength(0);
    expect(screen.queryAllByText(/.+/)).toHaveLength(0);

    rerender(<SelectBreeds breeds={[]} />);

    expect(container.firstChild).toBeNull();
    expect(container.textContent).toHaveLength(0);
    expect(screen.queryAllByText(/.+/)).toHaveLength(0);
  });

  it("should render normally", function () {
    const breeds = ["breed1", "breed2", "breed3"];
    const currentBreed = breeds[0];
    const { container } = render(
      <SelectBreeds breeds={breeds} currentBreed={currentBreed} />
    );

    expect(screen.queryByText(/^breed1$/)).toBeInTheDocument();
    expect(container.textContent).toBe("breed1");
  });
});

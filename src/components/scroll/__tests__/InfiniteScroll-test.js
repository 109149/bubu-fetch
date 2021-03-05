import React from "react";
import { render, screen } from "@testing-library/react";
import InfiniteScroll from "../InfiniteScroll";

describe("InfiniteScroll", function () {
  beforeEach(function () {
    global.IntersectionObserver = class IntersectionObserver {
      observe() {
        return null;
      }
    };
  });

  it("should render with no props", function () {
    render(<InfiniteScroll />);

    expect(screen.queryByText("A")).toBeNull();
  });

  it("should toggle display text 'LOADING NEW IMAGES'", function () {
    const { rerender } = render(<InfiniteScroll loadingImages={true} />);

    expect(screen.queryByText(/^LOADING NEW IMAGES$/)).toBeInTheDocument();

    rerender(<InfiniteScroll loadingImages={false} />);

    expect(screen.queryByText(/^LOADING NEW IMAGES$/)).not.toBeInTheDocument();
  });

  it("should render with all props passed", function () {
    render(
      <InfiniteScroll loadingImages={true}>
        <div>WITH CHILDREN</div>
      </InfiniteScroll>
    );

    expect(screen.queryByText(/^WITH CHILDREN$/)).toBeInTheDocument();
    expect(screen.queryByText(/^LOADING NEW IMAGES$/)).toBeInTheDocument();
  });
});

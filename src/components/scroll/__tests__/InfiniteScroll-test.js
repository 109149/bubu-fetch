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

  it("should toggle display circular progress", function () {
    const { rerender } = render(<InfiniteScroll loadingImages={true} />);

    let circle = document.querySelector("#circular-progress").firstChild
      .firstChild.nodeName;
    expect(circle).toBe("circle");

    rerender(<InfiniteScroll loadingImages={false} />);
    expect(document.querySelector("#circular-progress")).toBeNull();
  });

  it("should render with all props passed", function () {
    render(
      <InfiniteScroll loadingImages={true}>
        <div>WITH CHILDREN</div>
      </InfiniteScroll>
    );

    expect(screen.queryByText(/^WITH CHILDREN$/)).toBeInTheDocument();
  });
});

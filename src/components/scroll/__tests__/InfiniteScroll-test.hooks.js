import React from "react";
import { render } from "@testing-library/react";
import { useInfiniteScroll } from "../hooks";

describe("InfiniteScroll.hooks", function () {
  describe("useInfiniteScroll", function () {
    beforeEach(function () {
      global.IntersectionObserver = class IntersectionObserver {
        observe() {
          return null;
        }
      };
    });

    it("should return non-null loader", function () {
      let loader;
      let cb = jest.fn();
      function InfiniteScroll() {
        loader = useInfiniteScroll(cb);

        return null;
      }

      render(<InfiniteScroll />);

      expect(loader).not.toBeNull();
      expect(cb).toHaveBeenCalledTimes(0);
    });
  });
});

import React from "react";

const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  toString: `Right(${x})`,
});

const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  toString: `Left(${x})`,
});

const fromNullable = (x) => (x != null ? Right(x) : Left());

const useInfiniteScroll = (cb) => {
  const loader = React.useRef(null);

  React.useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    function handleObserver(entities) {
      if (entities[0].isIntersecting) cb();
    }

    const observer = new IntersectionObserver(handleObserver, options);

    fromNullable(loader.current).fold(
      () => "current is null",
      observer.observe
    );

    // if (loader.current) observer.observe(loader.current);
  }, [cb]);

  return loader;
};

export { useInfiniteScroll };

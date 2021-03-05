import React from "react";

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

    if (loader.current) observer.observe(loader.current);
  }, [cb]);

  return loader;
};

export { useInfiniteScroll };

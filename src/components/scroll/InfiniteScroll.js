import React from "react";
import { useInfiniteScroll } from "./hooks";

const InfiniteScroll = (props) => {
  const { loadingImages, cb, children } = props;
  const loader = useInfiniteScroll(cb);

  return (
    <>
      {children}
      <div className="infinite-scroll" ref={loader}>
        {loadingImages && <h2>LOADING NEW IMAGES</h2>}
      </div>
    </>
  );
};

export default InfiniteScroll;

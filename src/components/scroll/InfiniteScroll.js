import React from "react";
import { useInfiniteScroll } from "./hooks";
import CircularProgress from "@material-ui/core/CircularProgress";

const InfiniteScroll = (props) => {
  const { loadingImages, cb, children } = props;
  const loader = useInfiniteScroll(cb);

  return (
    <>
      {children}
      <div className="infinite-scroll" ref={loader}>
        {loadingImages && <CircularProgress id="circular-progress" />}
      </div>
    </>
  );
};

export default InfiniteScroll;

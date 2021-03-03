import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div className="scene"></div>
      <div className="progress"></div>
      <div className="noise"></div>
    </div>
  );
};

export default Loading;

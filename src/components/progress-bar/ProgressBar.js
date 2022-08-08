import React from "react";

export const ProgressBar = ({ height, progress, bgcolor }) => {
  const Parentdiv = {
    height: height,
    width: "100%",
    backgroundColor: "#EDEDED",
    borderRadius: 40,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: progress < 100 ? "#01959F" : "#43936C",
    borderRadius: 40,
    textAlign: "right",
  };

  const progresstext = {
    padding: 10,
    color: "black",
    fontWeight: 900,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}></span>
      </div>
    </div>
  );
};

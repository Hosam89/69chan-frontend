import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loading">
      <div className="scene">
        <div className="flex flex-center sun-container">
          <div className="sun"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

import React, { useRef, useEffect } from "react";
import VideoBg from "../assets/VideoBg.mp4";

const Video = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Set the volume to 0.5 when the component mounts
    videoRef.current.volume = 0.03;
  }, []);

  return (
    <div className="video">
      <video ref={videoRef} src={VideoBg} autoPlay muted loop playsInline />
    </div>
  );
};

export default Video;

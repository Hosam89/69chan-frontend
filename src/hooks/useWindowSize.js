import { useEffect, useState } from "react";

export function useWindowSize() {
  //a state to get the window size
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  /** A Function to assign the window width to the state */
  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
    });
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();
    // Clean up fuction to get activated on the Window resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

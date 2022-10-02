import { useState, useEffect } from "react";

const getDimensions = () => [window.innerWidth, window.innerHeight];

export default function useScreenSize() {
  const [size, setSize] = useState(getDimensions());

  useEffect(() => {
    const handleResize = () => setSize(getDimensions());

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

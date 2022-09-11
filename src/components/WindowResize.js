import React from "react";
import { useEffect, useState } from "react";

export default function WindowResize() {
  const [windowResize, setWindowResize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowResize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return <div>{windowResize}</div>;
}

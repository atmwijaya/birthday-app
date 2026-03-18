import React from 'react'
import { useEffect, useState } from "react";

export default function BookPage({ children, isVisible, direction = "right", delay = 0 }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const t = setTimeout(() => setMounted(true), delay);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [isVisible, delay]);

  const translateX = direction === "right" ? "30px" : "-30px";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        transition: "opacity 0.6s ease, transform 0.6s ease",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateX(0)" : `translateX(${translateX})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {children}
    </div>
  );
}
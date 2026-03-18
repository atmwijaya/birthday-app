import React from 'react'
import { useEffect, useRef } from "react";

const EMOJIS = ["✨", "🌸", "💫", "🌺", "⭐", "🎀", "🌷", "💝"];

export default function FloatingDecorations({ count = 12 }) {
  const items = Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: EMOJIS[i % EMOJIS.length],
    left: `${(i * 8.5) % 100}%`,
    animDuration: `${6 + (i % 4) * 2}s`,
    animDelay: `${(i * 0.7) % 4}s`,
    size: `${0.9 + (i % 3) * 0.3}rem`,
    opacity: 0.3 + (i % 3) * 0.15,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            position: "absolute",
            left: item.left,
            bottom: "-2rem",
            fontSize: item.size,
            opacity: item.opacity,
            animation: `floatUp ${item.animDuration} ease-in-out infinite`,
            animationDelay: item.animDelay,
          }}
        >
          {item.emoji}
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
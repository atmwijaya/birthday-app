import React from 'react'

export default function PageDots({ total, current, onSelect }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.6rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Page ${i + 1}`}
          style={{
            width: current === i ? "1.8rem" : "0.55rem",
            height: "0.55rem",
            borderRadius: "1rem",
            border: "none",
            background: current === i
              ? "linear-gradient(90deg, #C084FC, #FB7185)"
              : "rgba(255,255,255,0.35)",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}
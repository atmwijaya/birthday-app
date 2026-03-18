import React from "react";
import { useEffect, useRef, useState } from "react";
import FloatingDecorations from "./floatingDecorations";

const COLORS = [
  "#FFD700",
  "#FF6B9D",
  "#C084FC",
  "#60A5FA",
  "#34D399",
  "#F97316",
  "#FB7185",
  "#A78BFA",
  "#FCD34D",
  "#F472B6",
  "#38BDF8",
  "#4ADE80",
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    const angle = Math.random() * Math.PI * 2;
    const speed = randomBetween(2, 8);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.decay = randomBetween(0.012, 0.025);
    this.radius = randomBetween(2, 4);
    this.gravity = 0.08;
    this.tail = [];
  }

  update() {
    this.tail.push({ x: this.x, y: this.y, alpha: this.alpha });
    if (this.tail.length > 6) this.tail.shift();
    this.vx *= 0.98;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }

  draw(ctx) {
    this.tail.forEach((t, i) => {
      ctx.beginPath();
      ctx.arc(t.x, t.y, this.radius * (i / this.tail.length), 0, Math.PI * 2);
      ctx.fillStyle =
        this.color +
        Math.floor(t.alpha * 80)
          .toString(16)
          .padStart(2, "0");
      ctx.fill();
    });
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle =
      this.color +
      Math.floor(this.alpha * 255)
        .toString(16)
        .padStart(2, "0");
    ctx.fill();
  }

  isDead() {
    return this.alpha <= 0;
  }
}

class Rocket {
  constructor(canvasW, canvasH) {
    this.x = randomBetween(canvasW * 0.2, canvasW * 0.8);
    this.y = canvasH;
    this.targetY = randomBetween(canvasH * 0.1, canvasH * 0.45);
    this.speed = randomBetween(8, 14);
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.exploded = false;
    this.trail = [];
  }

  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 12) this.trail.shift();
    this.y -= this.speed;
  }

  draw(ctx) {
    this.trail.forEach((t, i) => {
      const ratio = i / this.trail.length;
      ctx.beginPath();
      ctx.arc(t.x, t.y, 2.5 * ratio, 0, Math.PI * 2);
      ctx.fillStyle =
        this.color +
        Math.floor(ratio * 200)
          .toString(16)
          .padStart(2, "0");
      ctx.fill();
    });
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }

  shouldExplode() {
    return this.y <= this.targetY;
  }

  explode() {
    const particles = [];
    const count = Math.floor(randomBetween(80, 140));
    const colors = [
      this.color,
      COLORS[Math.floor(Math.random() * COLORS.length)],
    ];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(this.x, this.y, colors[i % 2]));
    }
    return particles;
  }
}

export default function FireworksSplash({ onComplete }) {
  const canvasRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const stateRef = useRef({ rockets: [], particles: [], frame: 0 });
  const animRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowFireworks(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showFireworks) return;
    const textTimer = setTimeout(() => setShowText(true), 1200);
    const skipTimer = setTimeout(() => setShowSkip(true), 1500);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(skipTimer);
    };
  }, [showFireworks]);

  const handleComplete = () => {
    setFadeOut(true);
    setTimeout(onComplete, 900);
  };

  useEffect(() => {
    if (!showFireworks) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      const { rockets, particles } = stateRef.current;
      const W = canvas.width;
      const H = canvas.height;

      ctx.fillStyle = "rgba(3, 0, 20, 0.18)";
      ctx.fillRect(0, 0, W, H);

      stateRef.current.frame++;

      if (stateRef.current.frame % 30 === 0) {
        rockets.push(new Rocket(W, H));
      }
      if (stateRef.current.frame % 18 === 0 && rockets.length < 3) {
        rockets.push(new Rocket(W, H));
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.update();
        r.draw(ctx);
        if (r.shouldExplode()) {
          const newParticles = r.explode();
          newParticles.forEach((p) => particles.push(p));
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.isDead()) particles.splice(i, 1);
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [showFireworks]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        transition: "opacity 0.9s ease",
        opacity: fadeOut ? 0 : 1,
        zIndex: 10,
      }}
      onClick={showFireworks ? handleComplete : undefined}
    >
      {/* Animasi Kue */}
      {!showFireworks && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#030014",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div style={{ position: "relative", width: 200, height: 200 }}>
            {/* Lapisan kue */}
            <div
              style={{
                width: "100%",
                height: 40,
                background: "#8B4513",
                borderRadius: 20,
                margin: "5px 0",
                opacity: 0,
                transform: "scale(0.8)",
                animation: "appear 0.5s forwards",
                animationDelay: "0s",
              }}
            />
            <div
              style={{
                width: "100%",
                height: 40,
                background: "#A0522D",
                borderRadius: 20,
                margin: "5px 0",
                opacity: 0,
                transform: "scale(0.8)",
                animation: "appear 0.5s forwards",
                animationDelay: "0.5s",
              }}
            />
            <div
              style={{
                width: "100%",
                height: 40,
                background: "#CD853F",
                borderRadius: 20,
                margin: "5px 0",
                opacity: 0,
                transform: "scale(0.8)",
                animation: "appear 0.5s forwards",
                animationDelay: "1s",
              }}
            />
            {/* Lilin */}
            <div
              style={{
                position: "absolute",
                bottom: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                width: 10,
                height: 50,
                background: "#FFD700",
                borderRadius: "5px 5px 0 0",
                opacity: 0,
                animation: "appear 0.5s 1.5s forwards",
              }}
            />
            {/* Api lilin */}
            <div
              style={{
                position: "absolute",
                bottom: "calc(100% + 50px)",
                left: "50%",
                transform: "translateX(-50%)",
                width: 16,
                height: 16,
                background: "#FFA500",
                borderRadius: "50% 50% 0 0",
                boxShadow: "0 0 20px orange",
                opacity: 0,
                animation: "appear 0.5s 2s forwards",
              }}
            />
          </div>
          <p
            style={{
              color: "white",
              fontFamily: "'Lato', sans-serif",
              fontSize: "1.2rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0,
              animation: "fadeIn 1s 2.5s forwards",
            }}
          >
            Menyiapkan kue spesial...
          </p>
        </div>
      )}

      {showFireworks && (
        <>
          <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />
          <FloatingDecorations count={8} />

          {/* Center text */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              textAlign: "center",
              padding: "2rem",
              pointerEvents: "none",
              transition: "opacity 1s ease, transform 1s ease",
              opacity: showText ? 1 : 0,
              transform: showText ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div
              style={{
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                filter: "drop-shadow(0 0 30px #FFD700)",
              }}
            >
              🎂
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 7vw, 4.5rem)",
                color: "#FFD700",
                letterSpacing: "0.05em",
                textShadow:
                  "0 0 40px rgba(255,215,0,0.8), 0 0 80px rgba(255,215,0,0.4)",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Happy Birthday!
            </h1>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 7vw, 4.5rem)",
                color: "#FFD700",
                letterSpacing: "0.05em",
                textShadow:
                  "0 0 40px rgba(255,215,0,0.8), 0 0 80px rgba(255,215,0,0.4)",
                margin: 0,
                lineHeight: 1.1,
              }}
              >
                ke-23 tahun!
            </h2>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "clamp(1rem, 3vw, 1.4rem)",
                color: "#F0C0FF",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                margin: 0,
                textShadow: "0 0 20px rgba(240,192,255,0.6)",
              }}
            >
              Ada pesan untuk Mashaa kuu, klikk layar ini yaa ✨
            </p>
          </div>

          {/* Skip button */}
          {showSkip && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleComplete();
              }}
              style={{
                position: "absolute",
                bottom: "2rem",
                right: "2rem",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
                padding: "0.6rem 1.4rem",
                borderRadius: "2rem",
                cursor: "pointer",
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255,255,255,0.15)";
              }}
            >
              Buka Kartu →
            </button>
          )}
        </>
      )}

      <style>{`
        @keyframes appear {
          to { opacity: 1; transform: scale(1); }
          }
        @keyframes fadeIn {
        to {opacity: 1;}
        }
      `}</style>
    </div>
  );
}

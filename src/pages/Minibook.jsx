import React from "react";
import { useState, useEffect } from "react";
import BookPage from "./Bookpage";
import PageDots from "../components/pageDots";
import FloatingDecorations from "../components/floatingDecorations";
import { useTransition, animated } from "react-spring";

const PERSON_IMAGE =
  "https://instagram.fsrg6-1.fna.fbcdn.net/v/t51.82787-19/638317683_18087974948151682_4689259912109632141_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fsrg6-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2QGbPmiDS7C335ESErtvo16Lja_yTUdvvZGKsBU_TwFQYxi_VqeKzs9-XxqgBlkl-Kyjll4EftjAgs8IILZOyKTi&_nc_ohc=6ITkOf8XYDcQ7kNvwEgA2DI&_nc_gid=OkxR0PSkQagRX5nxeVb-6Q&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Afw1JFSVInkRr4n1PvWMbvjyLCExDsIK2-iAg1xf6iXdIw&oe=69C0B0BE&_nc_sid=7a9f4b";
const PERSON_NAME = "Zanuba Khusnalmuna";
const SENDER_NAME = "Minionmuuu";

const PAGES = [
  { id: "cover" },
  { id: "wishes" },
  { id: "prayer" },
  { id: "closing" },
];

const pageGradients = [
  "linear-gradient(145deg, #1a0533 0%, #2d0a5e 50%, #1a0533 100%)",
  "linear-gradient(145deg, #0a1f3d 0%, #0d3068 50%, #0a1f3d 100%)",
  "linear-gradient(145deg, #1f0a2d 0%, #3d0a5e 50%, #1f0a2d 100%)",
  "linear-gradient(145deg, #0a2d1f 0%, #0a4a30 50%, #0a2d1f 100%)",
];

const accentColors = ["#C084FC", "#60A5FA", "#F472B6", "#34D399"];

function CoverPage({ isVisible, photoSrc, onPhotoChange }) {
  const [pulse, setPulse] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect (() => {
    setImageError(false);
  }, [photoSrc]);

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(t);
  }, []);

  const triggerFileInput = () => {
    document.getElementById("photoInput").click();
  }

  return (
    <BookPage isVisible={isVisible} direction="right">
      <div style={{ textAlign: "center", padding: "1.5rem", width: "100%" }}>
        {/* Envelope flap */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginBottom: "1.5rem",
          }}
        >
          {/* Decorative ring */}
          <div
            style={{
              position: "absolute",
              inset: "-24px",
              borderRadius: "50%",
              border: "2px solid rgba(192, 132, 252, 0.4)",
              animation: "ringPulse 2s ease-in-out infinite",
              animationDelay: "0.5",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "-24px",
              borderRadius: "50%",
              border: "1px solid rgba(192, 132, 252, 0.15)",
              animation: "ringPulse 2s ease-in-out infinite",
              animationDelay: "0.5s",
            }}
          />

          {/* Photo */}
          <div
            style={{
              width: "clamp(100px, 22vw, 130px)",
              height: "clamp(100px, 22vw, 130px)",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid rgba(192, 132, 252, 0.6)",
              boxShadow: `0 0 30px rgba(192, 132, 252, 0.5), 0 0 60px rgba(192, 132, 252, 0.2)`,
              position: "relative",
              zIndex: 1,
              backgroundColor: "#1a0533",
            }}
          >
            {!imageError ? (
                <img
                  src={photoSrc}
                  alt={PERSON_NAME}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg,#C084FC,#FB7185)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.5rem",
                  }}
                >
                  🎂
                </div>
              )}
          </div>

          {/* Tombol kamera untuk mengganti foto */}
            <label
              htmlFor="photoInput"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                background: "rgba(0,0,0,0.7)",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "2px solid white",
                transform: "translate(10%, 10%)",
                fontSize: "1.2rem",
                transition: "transform 0.2s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              📷
            </label>
        </div>

        {/* Input file tersembunyi */}
        <input
          type="file"
          id="photoInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onPhotoChange}
        />

        {/* Envelope header */}
        <div
          style={{
            background: "rgba(192,132,252,0.08)",
            border: "1px solid rgba(192,132,252,0.2)",
            borderRadius: "1rem",
            padding: "1.2rem 1.5rem",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Wax seal */}
          <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>💌</div>

          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              color: "rgba(255,255,255,0.6)",
              fontSize: "clamp(0.65rem, 2vw, 0.75rem)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              margin: "0 0 0.3rem 0",
            }}
          >
            Sebuah pesan istimewa untuk
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#C084FC",
              fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
              margin: "0 0 0.3rem 0",
              textShadow: "0 0 20px rgba(192,132,252,0.5)",
              letterSpacing: "0.03em",
            }}
          >
            {PERSON_NAME}
          </h2>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "0.3rem" }}
          >
            {"🎂🎉🎊🎁🎈".split("").map((e, i) => (
              <span
                key={i}
                style={{
                  fontSize: "1rem",
                  animation: `bounce 1.2s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                {e}
              </span>
            ))}
          </div>
        </div>

        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            color: "rgba(255,255,255,0.4)",
            fontSize: "clamp(0.6rem, 1.8vw, 0.7rem)",
            marginTop: "1rem",
            letterSpacing: "0.15em",
          }}
        >
          Geser untuk membuka →
        </p>
      </div>

      <style>{`
        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </BookPage>
  );
}

function WishesPage({ isVisible }) {
  const wishes = [
    {
      icon: "🌟",
      text: "Semoga menjadi pribadi yang baik, selalu berbakti kepada orang tua dan selalu menjaga istiqomah yaa.",
    },
    {
      icon: "💫",
      text: "Semoga setiap langkah dalam hidup kamu bisa membawa kebermanfaatan bagi orang sekitar dan keluarga.",
    },
    {
      icon: "🌺",
      text: "Semoga setiap harimu indah seperti bunga yang mekar penuh warna, harum, dan memberi kebaikan bagi semua.",
    },
    {
      icon: "🔥",
      text: "Tetap menjadi mashaa kuu yang aku kenal dan semoga tetap bisa bareng-bareng dalam jauh maupun dekat.",
    },
  ];

  return (
    <BookPage isVisible={isVisible} direction="right" delay={100}>
      <div style={{ padding: "1.2rem 1.5rem", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "1.2rem" }}>
          <span style={{ fontSize: "1.8rem" }}>🎊</span>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#60A5FA",
              fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
              margin: "0.3rem 0 0.2rem",
              textShadow: "0 0 20px rgba(96,165,250,0.5)",
            }}
          >
            Harapan & Ucapan
          </h3>
          <div
            style={{
              width: "3rem",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, #60A5FA, transparent)",
              margin: "0 auto",
            }}
          />
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {wishes.map((wish, i) => (
            <div
              key={i}
              style={{
                background: "rgba(96,165,250,0.07)",
                border: "1px solid rgba(96,165,250,0.15)",
                borderRadius: "0.75rem",
                padding: "0.75rem 1rem",
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-start",
                backdropFilter: "blur(6px)",
                animation: `slideIn 0.5s ease both`,
                animationDelay: `${0.2 + i * 0.15}s`,
              }}
            >
              <span
                style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: "2px" }}
              >
                {wish.icon}
              </span>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "clamp(0.75rem, 2.2vw, 0.87rem)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {wish.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </BookPage>
  );
}

function PrayerPage({ isVisible }) {
  const prayers = [
    "Ya Allah, panjangkan umurnya dalam keberkahan, kesehatan, dan keimanan.",
    "Mudahkan setiap urusannya, lapangkan dadanya dari kesedihan dan kesulitan.",
    "Berikan ia kebahagiaan dunia dan akhirat, serta jauhkan dari segala keburukan.",
    "Kabulkan setiap doa dan impiannya, dan kelilingi hidupnya dengan orang-orang yang mencintainya. Aamiin 🤲",
  ];

  return (
    <BookPage isVisible={isVisible} direction="left" delay={100}>
      <div style={{ padding: "1.2rem 1.5rem", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "1.2rem" }}>
          <span style={{ fontSize: "1.8rem" }}>🤲</span>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#F472B6",
              fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
              margin: "0.3rem 0 0.2rem",
              textShadow: "0 0 20px rgba(244,114,182,0.5)",
            }}
          >
            Doa & Harapan
          </h3>
          <div
            style={{
              width: "3rem",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, #F472B6, transparent)",
              margin: "0 auto",
            }}
          />
        </div>

        <div
          style={{
            background: "rgba(244,114,182,0.06)",
            border: "1px solid rgba(244,114,182,0.2)",
            borderRadius: "1rem",
            padding: "1rem 1.2rem",
            backdropFilter: "blur(8px)",
            position: "relative",
          }}
        >
          {/* Decorative quotes */}
          <div
            style={{
              position: "absolute",
              top: "0.5rem",
              left: "0.8rem",
              fontFamily: "Georgia, serif",
              fontSize: "3rem",
              color: "rgba(244,114,182,0.2)",
              lineHeight: 1,
            }}
          >
            "
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              paddingTop: "0.5rem",
            }}
          >
            {prayers.map((prayer, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'Lato', sans-serif",
                  color: "rgba(255,255,255,0.82)",
                  fontSize: "clamp(0.73rem, 2.1vw, 0.85rem)",
                  lineHeight: 1.65,
                  margin: 0,
                  paddingLeft: "0.5rem",
                  borderLeft:
                    i < prayers.length - 1
                      ? "2px solid rgba(244,114,182,0.2)"
                      : "none",
                  animation: `fadeUp 0.5s ease both`,
                  animationDelay: `${0.2 + i * 0.12}s`,
                }}
              >
                {prayer}
              </p>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </BookPage>
  );
}

function ClosingPage({ isVisible }) {
  const [heartBig, setHeartBig] = useState(false);
  useEffect(() => {
    if (isVisible) {
      const t = setInterval(() => setHeartBig((h) => !h), 1500);
      return () => clearInterval(t);
    }
  }, [isVisible]);

  return (
    <BookPage isVisible={isVisible} direction="left" delay={100}>
      <div style={{ textAlign: "center", padding: "1.5rem", width: "100%" }}>
        {/* Big animated heart */}
        <div
          style={{
            fontSize: "4rem",
            marginBottom: "1rem",
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: heartBig ? "scale(1.2)" : "scale(1)",
            filter: "drop-shadow(0 0 20px rgba(52,211,153,0.6))",
          }}
        >
          💚
        </div>

        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#34D399",
            fontSize: "clamp(1.3rem, 4.5vw, 1.8rem)",
            margin: "0 0 0.5rem",
            textShadow: "0 0 20px rgba(52,211,153,0.5)",
          }}
        >
          Selamat Ulang Tahun!
        </h3>

        <div
          style={{
            background: "rgba(52,211,153,0.07)",
            border: "1px solid rgba(52,211,153,0.2)",
            borderRadius: "1rem",
            padding: "1rem 1.2rem",
            margin: "1rem 0",
            backdropFilter: "blur(8px)",
          }}
        >
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              color: "rgba(255,255,255,0.85)",
              fontSize: "clamp(0.78rem, 2.3vw, 0.92rem)",
              lineHeight: 1.7,
              margin: 0,
              fontStyle: "italic",
            }}
          >
            "Semoga hari ini menjadi awal dari bab paling indah dalam hidupmu.
            Kamu layak mendapatkan semua kebaikan yang ada di dunia ini."
          </p>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(0.65rem, 1.8vw, 0.75rem)",
              letterSpacing: "0.1em",
              margin: "0 0 0.2rem",
            }}
          >
            Dengan penuh cinta,
          </p>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#34D399",
              fontSize: "clamp(1rem, 3vw, 1.3rem)",
              margin: 0,
              textShadow: "0 0 15px rgba(52,211,153,0.4)",
            }}
          >
            {SENDER_NAME} 💌
          </p>
        </div>

        {/* Decorative row */}
        <div
          style={{
            marginTop: "1.2rem",
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          {"🌟✨💫⭐🌟".split("").map((e, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.9rem",
                animation: `sparkle 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              {e}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0.4; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.3) rotate(15deg); }
        }
      `}</style>
    </BookPage>
  );
}

// Main
export default function MiniBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [appeared, setAppeared] = useState(false);
  const [swipeStart, setSwipeStart] = useState(null);
  const [direction, setDirection] = useState(1);
  const [photoSrc, setPhotoSrc] = useState(PERSON_IMAGE);

  useEffect(() => {
    const t = setTimeout(() => setAppeared(true), 100);
    return () => clearTimeout(t);
  }, []);

  const goNext = () => {
    if (currentPage < PAGES.length - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  };

  const handleSwipeStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setSwipeStart(clientX);
  };

  const handleSwipeEnd = (e) => {
    if (swipeStart === null) return;
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = swipeStart - clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? goNext() : goPrev();
    }
    setSwipeStart(null);
  };

  const transitions = useTransition(currentPage, {
    from: {
      opacity: 0,
      transform: `translateX(${direction > 0 ? "100%" : "-100%"}) scale(0.98)`,
      filter: "blur(8px)",
    },
    enter: { 
        opacity: 1, 
        transform: "translateX(0%) scale(1)",
        filter: "blur(0px)" 
    },
    leave: {
      opacity: 0,
      transform: `translateX(${direction > 0 ? "-100%" : "100%"}) scale(0.98)`,
      filter: "blur(8px)",
    },
    config: { mass: 1, tension: 200, friction: 25, easing: t => t * (2-t) },
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setPhotoSrc(loadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  }

  const pageComponents = [
    <CoverPage 
      key="cover"
      isVisible={currentPage === 0}
      photoSrc={photoSrc}
      onPhotoChange={handlePhotoChange}
     />,
    <WishesPage isVisible={currentPage === 1} />,
    <PrayerPage isVisible={currentPage === 2} />,
    <ClosingPage isVisible={currentPage === 3} />,
  ];

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingDecorations count={10} />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: "40vw",
          height: "40vw",
          background: `radial-gradient(circle, ${accentColors[currentPage]}18 0%, transparent 70%)`,
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          transition: "background 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: "none",
        }}
      />

      {/* Book container */}
      <div
        style={{
          width: "clamp(300px, 90vw, 400px)",
          transition:
            "opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: appeared ? 1 : 0,
          transform: appeared
            ? "scale(1) translateY(0)"
            : "scale(0.9) translateY(30px)",
          position: "relative",
          filter: appeared ? "blur(0px)" : "blur(6px)",
          zIndex: 2,
        }}
      >
        {/* Page label */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "0.75rem",
            fontFamily: "'Lato', sans-serif",
            color: "rgba(255,255,255,0.35)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Halaman {currentPage + 1} dari {PAGES.length}
        </div>

        {/* Book card */}
        <div
          style={{
            background: pageGradients[currentPage],
            borderRadius: "1.5rem",
            border: `1px solid ${accentColors[currentPage]}30`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${accentColors[currentPage]}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
            overflow: "hidden",
            position: "relative",
            transition:
              "background 0.7s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.7s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
            minHeight: "clamp(400px, 70vh, 520px)",
            display: "flex",
            flexDirection: "column",
          }}
          onMouseDown={handleSwipeStart}
          onMouseUp={handleSwipeEnd}
          onTouchStart={handleSwipeStart}
          onTouchEnd={handleSwipeEnd}
        >
          {/* Book spine effect */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "4px",
              background: `linear-gradient(180deg, ${accentColors[currentPage]}60, ${accentColors[currentPage]}20, ${accentColors[currentPage]}60)`,
              transition: "background 0.8s ease",
            }}
          />

          {/* Corner decorations */}
          {["top-left", "top-right", "bottom-left", "bottom-right"].map(
            (pos) => {
              const [v, h] = pos.split("-");
              return (
                <div
                  key={pos}
                  style={{
                    position: "absolute",
                    [v]: "12px",
                    [h]: "12px",
                    width: "20px",
                    height: "20px",
                    borderTop:
                      v === "top"
                        ? `1px solid ${accentColors[currentPage]}40`
                        : "none",
                    borderBottom:
                      v === "bottom"
                        ? `1px solid ${accentColors[currentPage]}40`
                        : "none",
                    borderLeft:
                      h === "left"
                        ? `1px solid ${accentColors[currentPage]}40`
                        : "none",
                    borderRight:
                      h === "right"
                        ? `1px solid ${accentColors[currentPage]}40`
                        : "none",
                    transition: "border-color 0.8s ease",
                  }}
                />
              );
            },
          )}

          {/* Page content */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {pageComponents[currentPage]}
          </div>

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem 1.2rem 1.2rem",
              borderTop: `1px solid rgba(255,255,255,0.05)`,
            }}
          >
            <button
              onClick={goPrev}
              disabled={currentPage === 0}
              style={{
                background:
                  currentPage === 0
                    ? "rgba(255,255,255,0.05)"
                    : `rgba(255,255,255,0.1)`,
                border: `1px solid rgba(255,255,255,${currentPage === 0 ? "0.05" : "0.15"})`,
                color: currentPage === 0 ? "rgba(255,255,255,0.2)" : "white",
                width: "2.2rem",
                height: "2.2rem",
                borderRadius: "50%",
                cursor: currentPage === 0 ? "allowed" : "pointer",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                position: "relative",
              }}
            >
              ‹
            </button>

            <PageDots
              total={PAGES.length}
              current={currentPage}
              onSelect={setCurrentPage}
            />

            <button
              onClick={goNext}
              disabled={currentPage === PAGES.length - 1}
              style={{
                background:
                  currentPage === PAGES.length - 1
                    ? "rgba(255,255,255,0.05)"
                    : `rgba(255,255,255,0.1)`,
                border: `1px solid rgba(255,255,255,${currentPage === PAGES.length - 1 ? "0.05" : "0.15"})`,
                color:
                  currentPage === PAGES.length - 1
                    ? "rgba(255,255,255,0.2)"
                    : "white",
                width: "2.2rem",
                height: "2.2rem",
                borderRadius: "50%",
                cursor:
                  currentPage === PAGES.length - 1 ? "allowed" : "pointer",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ›
            </button>
          </div>
        </div>

        {/* Swipe hint */}
        <p
          style={{
            textAlign: "center",
            fontFamily: "'Lato', sans-serif",
            color: "rgba(255,255,255,0.25)",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            marginTop: "0.75rem",
          }}
        >
          Swipe atau gunakan tombol panah untuk navigasi
        </p>
      </div>
    </div>
  );
}

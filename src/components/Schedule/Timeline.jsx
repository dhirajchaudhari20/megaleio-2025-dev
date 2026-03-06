import React, { useState, useEffect, useRef } from "react";
import { timelineData } from "../../data/eventsData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── Videos ───────────────────────────────────────────────── */
import stormVideo from "../../assets/vecteezy_storm-during-night-in-the-forest_1625786.mov";
import fogVideo from "../../assets/vecteezy_dark-forest-and-castle-in-misty-foggy-day_1627233.mov";

/* ── Images ───────────────────────────────────────────────── */
import logo from "../../assets/images/logo.png";
import titleImg from "../../assets/img1.png";
import darkForest from "../../assets/Dark forest with subtle red fog.jpg";
import emptyStreet from "../../assets/empty-street-at-night-with-red-lights.jpg";
import bg2 from "../../assets/display/bg2.png";
import vecna from "../../assets/vecna_tsp.png";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════ */

const getCategory = (title) => {
  const t = title.toLowerCase();
  if (/robo|drone|line.?fol/i.test(t)) return { color: "#38bdf8", label: "ROBOTICS", icon: "🤖" };
  if (/bgmi|e.?foot|gaming/i.test(t)) return { color: "#a78bfa", label: "ESPORTS", icon: "🎮" };
  if (/hack|blind|quiz|bridge|gdg/i.test(t)) return { color: "#34d399", label: "TECH", icon: "💻" };
  if (/arm|power|sport/i.test(t)) return { color: "#fb923c", label: "SPORTS", icon: "💪" };
  if (/workshop/i.test(t)) return { color: "#facc15", label: "WORKSHOP", icon: "🛠" };
  if (/civil|junk/i.test(t)) return { color: "#94a3b8", label: "CIVIL", icon: "🏗" };
  if (/ceremony|prize|closing|opening/i.test(t)) return { color: "#f472b6", label: "CEREMONY", icon: "🏆" };
  if (/ai|idea|present|impact/i.test(t)) return { color: "#22d3ee", label: "INNOVATION", icon: "🧠" };
  if (/bpp/i.test(t)) return { color: "#e879f9", label: "CONTEST", icon: "📝" };
  return { color: "#dc2626", label: "EVENT", icon: "⚡" };
};

const PARTICLES = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: `${1.5 + Math.random() * 3}px`,
  opacity: 0.12 + Math.random() * 0.28,
  dur: 14 + Math.random() * 18,
  delay: Math.random() * 12,
}));

const DAY_BANNERS = [darkForest, emptyStreet, bg2];

const CHAPTERS = [
  { num: "ONE", title: "THE GATHERING", quote: "Something is coming..." },
  { num: "TWO", title: "THE UNRAVELING", quote: "The gate is open..." },
  { num: "THREE", title: "THE FINALE", quote: "Finish the fight..." },
];

const DAY_TINTS = [
  "linear-gradient(135deg, rgba(220,38,38,0.12) 0%, rgba(5,0,5,0.7) 100%)",
  "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(5,0,5,0.7) 100%)",
  "linear-gradient(135deg, rgba(234,179,8,0.08) 0%, rgba(5,0,5,0.7) 100%)",
];

const LIGHT_COLORS = [
  "#e53e3e", "#38b2ac", "#ecc94b", "#9f7aea",
  "#48bb78", "#ed8936", "#4299e1", "#f56565",
];

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

const Timeline = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const containerRef = useRef(null);

  /* ── header fade-in ─────────────────────────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  /* ── GSAP ScrollTrigger ─────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Card slide-in reveals */
      gsap.utils.toArray(".tl-card-wrap").forEach((card) => {
        const idx = parseInt(card.dataset.idx, 10) || 0;
        const isLeft = idx % 2 === 0;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          x: window.innerWidth > 768 ? (isLeft ? -60 : 60) : 40,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      /* Banner image parallax */
      gsap.utils.toArray(".tl-banner").forEach((banner) => {
        const img = banner.querySelector(".tl-banner-img");
        if (img) {
          gsap.fromTo(
            img,
            { y: -30 },
            {
              scrollTrigger: {
                trigger: banner,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
              y: 60,
              ease: "none",
            }
          );
        }
      });

      /* Chapter titles reveal */
      gsap.utils.toArray(".tl-chapter-content").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 1.2,
          ease: "power2.out",
        });
      });

      /* Rift dividers */
      gsap.utils.toArray(".tl-rift").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          scaleX: 0,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const totalEvents = timelineData.reduce((a, d) => a + d.events.length, 0);

  /* ══════════════════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{`
        /* ── Particles ──────────────────────────────────────── */
        @keyframes particleFloat {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: var(--p-op); }
          90%  { opacity: var(--p-op); }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }

        /* ── Flicker (Hawkins lights) ───────────────────────── */
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
            filter: drop-shadow(0 0 30px rgba(220,38,38,0.6))
                    drop-shadow(0 0 60px rgba(220,38,38,0.3));
          }
          20%, 24%, 55% {
            opacity: 0.4;
            filter: none;
          }
        }

        /* ── Scroll indicator ───────────────────────────────── */
        @keyframes scrollDot {
          0%   { transform: translateY(0); opacity: 1; }
          50%  { transform: translateY(10px); opacity: 0.2; }
          100% { transform: translateY(0); opacity: 1; }
        }

        /* ── Timeline node pulse ────────────────────────────── */
        @keyframes nodePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.4); }
          50%      { box-shadow: 0 0 0 8px rgba(220,38,38,0); }
        }

        /* ── Priority breathing ─────────────────────────────── */
        @keyframes priorityBreathe {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(220,38,38,0),
                        inset 0 0 20px rgba(220,38,38,0.03);
          }
          50% {
            box-shadow: 0 0 25px 4px rgba(220,38,38,0.2),
                        inset 0 0 30px rgba(220,38,38,0.08);
          }
        }

        /* ── Rift glow ──────────────────────────────────────── */
        @keyframes riftGlow {
          0%, 100% { opacity: 0.3; filter: blur(0px); }
          50%      { opacity: 0.8; filter: blur(1px); }
        }

        /* ── Bulb glow ──────────────────────────────────────── */
        @keyframes bulbGlow {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 6px var(--bulb)); }
          50%      { filter: brightness(1.5) drop-shadow(0 0 14px var(--bulb)); }
        }

        /* ════════════════════════════════════════════════════
           TIMELINE LAYOUT
           ════════════════════════════════════════════════════ */
        .tl-timeline {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 3rem 1.5rem 2rem;
        }

        .tl-timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom,
            transparent 0%,
            rgba(220,38,38,0.12) 5%,
            rgba(220,38,38,0.32) 20%,
            rgba(220,38,38,0.32) 80%,
            rgba(220,38,38,0.12) 95%,
            transparent 100%
          );
          z-index: 0;
        }

        .tl-card-wrap {
          position: relative;
          width: 50%;
          padding-bottom: 2rem;
          box-sizing: border-box;
        }

        .tl-card-wrap.tl-left {
          padding-right: 3.2rem;
        }

        .tl-card-wrap.tl-right {
          margin-left: 50%;
          padding-left: 3.2rem;
        }

        .tl-node {
          position: absolute;
          top: 0.6rem;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #0a0005;
          border: 2px solid rgba(220,38,38,0.45);
          z-index: 2;
          animation: nodePulse 2.8s ease-in-out infinite;
        }

        .tl-left .tl-node { right: -7px; }
        .tl-right .tl-node { left: -7px; }

        .tl-node.tl-node-hl {
          background: rgba(220,38,38,0.25);
          border-color: #dc2626;
        }

        .tl-connector {
          position: absolute;
          top: 1rem;
          height: 1px;
          width: 2.5rem;
          z-index: 1;
        }

        .tl-left .tl-connector {
          right: 7px;
          background: linear-gradient(to left, rgba(220,38,38,0.35), transparent);
        }

        .tl-right .tl-connector {
          left: 7px;
          background: linear-gradient(to right, rgba(220,38,38,0.35), transparent);
        }

        /* ── Card hover ─────────────────────────────────────── */
        .tl-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tl-card:hover {
          transform: translateY(-5px) scale(1.02);
        }

        .tl-card.tl-priority-card {
          animation: priorityBreathe 3s ease-in-out infinite;
        }

        /* ════════════════════════════════════════════════════
           MOBILE
           ════════════════════════════════════════════════════ */
        @media (max-width: 768px) {
          .tl-timeline::before {
            left: 20px;
            transform: none;
          }

          .tl-card-wrap {
            width: 100% !important;
            margin-left: 0 !important;
            padding-left: 52px !important;
            padding-right: 0.5rem !important;
          }

          .tl-node {
            left: 13px !important;
            right: auto !important;
          }

          .tl-connector {
            left: 27px !important;
            right: auto !important;
            width: 25px !important;
            background: linear-gradient(to right, rgba(220,38,38,0.35), transparent) !important;
          }

          .tl-banner-section {
            height: 38vh !important;
            min-height: 260px !important;
          }

          .tl-chapter-heading {
            font-size: clamp(1.6rem, 7vw, 2.4rem) !important;
          }
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          background: "#050005",
          minHeight: "100vh",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ═══ AMBIENT FOG VIDEO (fixed behind everything) ═══ */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.1,
              filter: "saturate(0.25) brightness(0.5)",
            }}
          >
            <source src={fogVideo} type="video/mp4" />
          </video>
        </div>

        {/* ═══ FLOATING PARTICLES ═══════════════════════════ */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: p.left,
                bottom: "-5%",
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,200,200,0.8) 0%, rgba(200,160,160,0.3) 100%)",
                "--p-op": p.opacity,
                animation: `particleFloat ${p.dur}s ${p.delay}s linear infinite`,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════
            HERO — DUAL VIDEO ENTRANCE
           ═══════════════════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            height: "100vh",
            minHeight: 520,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* Storm video (primary) */}
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
              opacity: 0.5,
            }}
          >
            <source src={stormVideo} type="video/mp4" />
          </video>

          {/* Forest video overlay (secondary, blended) */}
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
              opacity: 0.2,
              mixBlendMode: "screen",
            }}
          >
            <source src={fogVideo} type="video/mp4" />
          </video>

          {/* Radial vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              background:
                "radial-gradient(ellipse 50% 50% at 50% 50%, transparent 0%, rgba(5,0,5,0.92) 100%)",
            }}
          />

          {/* Bottom fade into content */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              zIndex: 3,
              background:
                "linear-gradient(to top, #050005 0%, transparent 100%)",
            }}
          />

          {/* Red atmospheric glow */}
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60vw",
              height: "40vh",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(220,38,38,0.06) 0%, transparent 70%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* ── Hero content ──────────────────────────────────── */}
          <div
            style={{
              position: "relative",
              zIndex: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.4rem",
              transform: headerVisible
                ? "translateY(0) scale(1)"
                : "translateY(50px) scale(0.9)",
              opacity: headerVisible ? 1 : 0,
              transition: "all 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Logo */}
            <img
              src={logo}
              alt="Megalio Logo"
              style={{
                width: "clamp(70px, 16vw, 140px)",
                height: "auto",
                filter: "drop-shadow(0 0 50px rgba(220,38,38,0.5))",
                marginBottom: "0.5rem",
              }}
            />

            {/* MEGALIO 2026 title */}
            <img
              src={titleImg}
              alt="Megalio 2026"
              style={{
                width: "clamp(200px, 48vw, 440px)",
                height: "auto",
                filter: "drop-shadow(0 0 25px rgba(220,38,38,0.4))",
                animation: "flicker 5s ease-in-out infinite",
              }}
            />

            {/* THE SCHEDULE heading */}
            <h1
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1.2rem, 3.5vw, 2.4rem)",
                fontWeight: 700,
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.5)",
                margin: "1rem 0 0",
                textShadow: "0 0 35px rgba(220,38,38,0.2)",
              }}
            >
              THE SCHEDULE
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.35em",
                color: "rgba(255,255,255,0.2)",
                margin: 0,
              }}
            >
              THREE DAYS · {totalEvents} EVENTS · THE UPSIDE DOWN
            </p>

            {/* Christmas lights strip */}
            <div
              style={{
                display: "flex",
                gap: "clamp(14px, 3.5vw, 32px)",
                marginTop: "1.4rem",
                position: "relative",
              }}
            >
              {/* wire */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "-10%",
                  right: "-10%",
                  height: 1,
                  background: "rgba(255,255,255,0.04)",
                }}
              />
              {LIGHT_COLORS.map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 7,
                    height: 11,
                    borderRadius: "0 0 50% 50%",
                    background: c,
                    "--bulb": c,
                    animation: `bulbGlow ${1.5 + (i % 3) * 0.4}s ${
                      i * 0.2
                    }s ease-in-out infinite`,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -5,
                      left: "50%",
                      width: 1,
                      height: 5,
                      background: "rgba(255,255,255,0.12)",
                      transform: "translateX(-50%)",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Date strip */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "0.4rem 1.4rem",
                marginTop: "1rem",
                border: "1px solid rgba(220,38,38,0.12)",
                borderRadius: 999,
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(10px)",
                fontSize: "0.56rem",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.3)",
                fontFamily: "'Courier New', monospace",
              }}
            >
              <span>MARCH 13–15, 2026</span>
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#dc2626",
                  display: "inline-block",
                }}
              />
              <span style={{ color: "#dc2626" }}>{totalEvents} EVENTS</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <div
              style={{
                width: 18,
                height: 28,
                borderRadius: 10,
                border: "1.5px solid rgba(255,255,255,0.12)",
                display: "flex",
                justifyContent: "center",
                paddingTop: 5,
              }}
            >
              <div
                style={{
                  width: 3,
                  height: 6,
                  borderRadius: 2,
                  background: "rgba(220,38,38,0.6)",
                  animation: "scrollDot 1.8s ease-in-out infinite",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "0.4rem",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.12)",
                fontFamily: "'Courier New', monospace",
              }}
            >
              SCROLL
            </span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            DAY SECTIONS — CINEMATIC SCROLL-THROUGH
           ═══════════════════════════════════════════════════ */}
        {timelineData.map((day, dayIdx) => {
          const chapter = CHAPTERS[dayIdx] || {
            num: String(dayIdx + 1),
            title: "THE UNKNOWN",
            quote: "...",
          };

          return (
            <React.Fragment key={dayIdx}>
              {/* ══════ DAY BANNER ═══════════════════════════════ */}
              <div
                className="tl-banner tl-banner-section"
                style={{
                  position: "relative",
                  zIndex: 2,
                  height: "50vh",
                  minHeight: 360,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Background image with parallax */}
                <img
                  src={DAY_BANNERS[dayIdx]}
                  alt=""
                  className="tl-banner-img"
                  style={{
                    position: "absolute",
                    inset: "-40px",
                    width: "calc(100% + 80px)",
                    height: "calc(100% + 80px)",
                    objectFit: "cover",
                    zIndex: 0,
                    filter: "brightness(0.3) saturate(0.6)",
                  }}
                />

                {/* Color tint overlay per day */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    background: DAY_TINTS[dayIdx],
                  }}
                />

                {/* Scanline texture */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
                    pointerEvents: "none",
                  }}
                />

                {/* Top fade from previous content */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "35%",
                    zIndex: 2,
                    background:
                      "linear-gradient(to bottom, #050005 0%, transparent 100%)",
                  }}
                />

                {/* Bottom fade into timeline */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "40%",
                    zIndex: 2,
                    background:
                      "linear-gradient(to top, #050005 0%, transparent 100%)",
                  }}
                />

                {/* Left/right vignette */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    background:
                      "linear-gradient(90deg, rgba(5,0,5,0.5) 0%, transparent 20%, transparent 80%, rgba(5,0,5,0.5) 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* ── Chapter content ────────────────────────────── */}
                <div
                  className="tl-chapter-content"
                  style={{
                    position: "relative",
                    zIndex: 3,
                    textAlign: "center",
                    padding: "0 1.5rem",
                  }}
                >
                  {/* Chapter label */}
                  <div
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.55rem",
                      letterSpacing: "0.5em",
                      color: "rgba(220,38,38,0.55)",
                      marginBottom: "0.7rem",
                    }}
                  >
                    ── CHAPTER {chapter.num} ──
                  </div>

                  {/* Chapter title */}
                  <h2
                    className="tl-chapter-heading"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "clamp(2rem, 6vw, 4.2rem)",
                      fontWeight: 900,
                      letterSpacing: "0.08em",
                      color: "#fff",
                      margin: 0,
                      lineHeight: 1.1,
                      textShadow:
                        "0 0 60px rgba(220,38,38,0.3), 0 4px 25px rgba(0,0,0,0.6)",
                    }}
                  >
                    {chapter.title}
                  </h2>

                  {/* Quote */}
                  <div
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.68rem",
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.2)",
                      marginTop: "0.9rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    "{chapter.quote}"
                  </div>

                  {/* Day · Date · Events info strip */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.7rem",
                      marginTop: "1.3rem",
                      padding: "0.35rem 1.3rem",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 999,
                      background: "rgba(0,0,0,0.35)",
                      backdropFilter: "blur(8px)",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "#fff",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {day.day.toUpperCase()}
                    </span>
                    <span
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: "rgba(220,38,38,0.45)",
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.58rem",
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {day.date.toUpperCase()}
                    </span>
                    <span
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: "rgba(220,38,38,0.45)",
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.58rem",
                        color: "rgba(220,38,38,0.45)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {day.events.length} EVENTS
                    </span>
                  </div>
                </div>
              </div>

              {/* ══════ VERTICAL TIMELINE ════════════════════════ */}
              <div
                className="tl-timeline"
                style={{ position: "relative", zIndex: 2 }}
              >
                {day.events.map((ev, i) => {
                  const cat = getCategory(ev.title);
                  const isLeft = i % 2 === 0;
                  const isPriority = !!ev.highlight;

                  return (
                    <div
                      key={`${dayIdx}-${i}`}
                      className={`tl-card-wrap ${isLeft ? "tl-left" : "tl-right"}`}
                      data-idx={i}
                    >
                      {/* Node on the line */}
                      <div
                        className={`tl-node ${isPriority ? "tl-node-hl" : ""}`}
                        style={{ animationDelay: `${i * 0.3}s` }}
                      />

                      {/* Connector */}
                      <div className="tl-connector" />

                      {/* ── Event Card ────────────────────────────── */}
                      <div
                        className={`tl-card ${
                          isPriority ? "tl-priority-card" : ""
                        }`}
                        style={{
                          background: isPriority
                            ? "linear-gradient(145deg, rgba(220,38,38,0.08) 0%, rgba(40,0,20,0.14) 50%, rgba(5,0,5,0.4) 100%)"
                            : "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(20,5,15,0.06) 50%, rgba(5,0,5,0.3) 100%)",
                          border: `1px solid ${
                            isPriority
                              ? "rgba(220,38,38,0.28)"
                              : "rgba(255,255,255,0.05)"
                          }`,
                          borderRadius: 16,
                          padding: "1.3rem 1.4rem",
                          backdropFilter: "blur(12px)",
                          position: "relative",
                          overflow: "hidden",
                          cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `${cat.color}55`;
                          e.currentTarget.style.boxShadow = `0 10px 40px ${cat.color}12, 0 0 30px ${cat.color}08`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = isPriority
                            ? "rgba(220,38,38,0.28)"
                            : "rgba(255,255,255,0.05)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        {/* Subtle glow circle */}
                        <div
                          style={{
                            position: "absolute",
                            top: -25,
                            right: -25,
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            background: `radial-gradient(circle, ${cat.color}0a 0%, transparent 70%)`,
                            pointerEvents: "none",
                          }}
                        />

                        {/* Time + Category row */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "0.75rem",
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          {/* Time pill */}
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.06)",
                              borderRadius: 16,
                              padding: "0.18rem 0.65rem",
                              fontSize: "0.6rem",
                              color: "rgba(255,255,255,0.5)",
                              fontFamily: "'Courier New', monospace",
                              letterSpacing: "0.08em",
                            }}
                          >
                            <span style={{ fontSize: "0.65rem" }}>⏱</span>
                            {ev.time}
                          </div>

                          {/* Category badge */}
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: "0.48rem",
                              letterSpacing: "0.18em",
                              color: cat.color,
                              fontFamily: "'Courier New', monospace",
                              fontWeight: 700,
                            }}
                          >
                            <span style={{ fontSize: "0.6rem" }}>
                              {cat.icon}
                            </span>
                            {cat.label}
                          </div>
                        </div>

                        {/* Title */}
                        <h3
                          style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: "1.05rem",
                            fontWeight: 700,
                            color: "#fff",
                            margin: "0 0 0.45rem",
                            lineHeight: 1.3,
                            letterSpacing: "0.03em",
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          {ev.title}
                        </h3>

                        {/* Location */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: "0.6rem",
                            color: "rgba(255,255,255,0.35)",
                            fontFamily: "'Courier New', monospace",
                            letterSpacing: "0.08em",
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          <span
                            style={{ color: cat.color, fontSize: "0.7rem" }}
                          >
                            ⌖
                          </span>
                          {ev.location}
                        </div>

                        {/* Priority badge */}
                        {isPriority && (
                          <div
                            style={{
                              marginTop: "0.7rem",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              background: "rgba(220,38,38,0.06)",
                              border: "1px solid rgba(220,38,38,0.28)",
                              borderRadius: 16,
                              padding: "0.15rem 0.6rem",
                              fontSize: "0.46rem",
                              letterSpacing: "0.2em",
                              color: "#dc2626",
                              fontWeight: 700,
                              fontFamily: "'Courier New', monospace",
                              position: "relative",
                              zIndex: 1,
                            }}
                          >
                            <span
                              style={{
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                background: "#dc2626",
                                boxShadow: "0 0 8px rgba(220,38,38,0.5)",
                                display: "inline-block",
                              }}
                            />
                            HIGHLIGHT
                          </div>
                        )}

                        {/* Bottom accent line */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: "10%",
                            right: "10%",
                            height: 1,
                            background: `linear-gradient(90deg, transparent, ${cat.color}22, transparent)`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ══════ RIFT DIVIDER (between days) ══════════════ */}
              {dayIdx < timelineData.length - 1 && (
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "3.5rem 1.5rem",
                  }}
                >
                  {/* Horizontal rift line */}
                  <div
                    className="tl-rift"
                    style={{
                      width: "clamp(120px, 50%, 420px)",
                      height: 1,
                      background:
                        "linear-gradient(90deg, transparent, rgba(220,38,38,0.4), rgba(124,58,237,0.25), rgba(220,38,38,0.4), transparent)",
                      position: "relative",
                    }}
                  >
                    {/* Center rift orb */}
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "rgba(220,38,38,0.5)",
                        boxShadow:
                          "0 0 25px rgba(220,38,38,0.4), 0 0 50px rgba(124,58,237,0.15)",
                        animation: "riftGlow 2.5s ease-in-out infinite",
                      }}
                    />

                    {/* Outer ring */}
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        border: "1px solid rgba(220,38,38,0.15)",
                        animation:
                          "riftGlow 2.5s 0.5s ease-in-out infinite",
                      }}
                    />
                  </div>

                  {/* Label */}
                  <div
                    style={{
                      marginTop: "1.2rem",
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.42rem",
                      letterSpacing: "0.45em",
                      color: "rgba(255,255,255,0.1)",
                    }}
                  >
                    ENTERING NEXT CHAPTER
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* ═══════════════════════════════════════════════════
            BOTTOM ATMOSPHERE
           ═══════════════════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "5rem 1.5rem 3rem",
          }}
        >
          {/* Vecna silhouette */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <img
              src={vecna}
              alt=""
              style={{
                width: "clamp(60px, 12vw, 120px)",
                height: "auto",
                opacity: 0.07,
                filter: "grayscale(1) brightness(2)",
              }}
            />
          </div>

          {/* Christmas lights closing detail */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(12px, 3vw, 30px)",
              marginBottom: "1.8rem",
            }}
          >
            {LIGHT_COLORS.slice()
              .reverse()
              .map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 5,
                    height: 8,
                    borderRadius: "0 0 50% 50%",
                    background: c,
                    "--bulb": c,
                    animation: `bulbGlow ${1.8 + (i % 3) * 0.3}s ${
                      i * 0.25
                    }s ease-in-out infinite`,
                  }}
                />
              ))}
          </div>

          <div
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.68rem",
              letterSpacing: "0.35em",
              color: "rgba(255,255,255,0.1)",
              marginBottom: "0.4rem",
            }}
          >
            MEGALIO 2026 — THE UPSIDE DOWN AWAITS
          </div>

          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.5rem",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.06)",
            }}
          >
            "One summer can change everything." — Stranger Things
          </div>
        </section>
      </div>
    </>
  );
};

export default Timeline;

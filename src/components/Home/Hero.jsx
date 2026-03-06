import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import fogVideo from "../../assets/hero-bg-fog.mp4";
import stormVideo from "../../assets/hero-bg-storm.mp4";
import vecna from "../../assets/vecna_tsp.png";

gsap.registerPlugin(ScrollTrigger);

/* ── letter splitter ── */
const splitText = (text) =>
  text.split("").map((char, i) => (
    <span
      key={`${char}-${i}`}
      className="letter inline-block will-change-transform"
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

/* ── 10 dust particles (seeded) ── */
const PARTICLES = Array.from({ length: 10 }, (_, i) => {
  const s1 = (i * 137.508) % 1;
  const s2 = (i * 97.3) % 1;
  const s3 = (i * 53.7) % 1;
  return {
    id: i,
    left: `${(s1 * 90 + 5).toFixed(2)}%`,
    bottom: `${(s2 * 50).toFixed(2)}%`,
    size: (s3 * 2 + 1).toFixed(2),
    duration: (s1 * 12 + 10).toFixed(2),
    delay: (s2 * 8).toFixed(2),
    opacity: (s3 * 0.18 + 0.06).toFixed(2),
  };
});

const Hero = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null); // fog video wrapper (parallax)
  const stormRef = useRef(null); // storm video element
  const fogRef = useRef(null);
  const lightningRef = useRef(null);
  const shadowRef = useRef(null);
  const tearRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const cardRef = useRef(null);
  const btnRef = useRef(null);
  const vecnaRef = useRef(null);
  const particlesRef = useRef([]);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    // Defer heavy videos so main thread doesn't choke on load
    const timer = setTimeout(() => setShowVideo(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    /* ── 1. Scroll parallax bg ── */
    gsap.to(bgRef.current, {
      yPercent: -16,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    /* ── 1b. Storm video slower playback ── */
    if (stormRef.current) stormRef.current.playbackRate = 0.7;

    /* ── 2. Single slow fog drift ── */
    gsap.to(fogRef.current, {
      x: "-8%",
      duration: 28,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    /* ── 3. Heading letter stagger ── */
    gsap.from(line1Ref.current.querySelectorAll(".letter"), {
      opacity: 0,
      y: 50,
      rotateX: -40,
      stagger: 0.05,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.4,
    });
    gsap.from(line2Ref.current.querySelectorAll(".letter"), {
      opacity: 0,
      y: 50,
      rotateX: -40,
      stagger: 0.05,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.8,
    });

    /* ── 4. Card reveal ── */
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 30,
      duration: 1.0,
      ease: "power3.out",
      delay: 1.5,
    });

    /* ── 4b. Vecna rises from below — cinematic entrance ── */
    gsap.from(vecnaRef.current, {
      y: 200,
      opacity: 0,
      duration: 2.6,
      ease: "power3.out",
      delay: 0.2,
    });

    /* ── 5. Heading glow breathe (very subtle) ── */
    gsap.to(line1Ref.current, {
      textShadow: "0 0 40px rgba(220,20,60,0.45)",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.8,
    });

    /* ── 6. Random lightning flicker ── */
    const doLightning = () => {
      const tl = gsap.timeline({
        onComplete: () =>
          gsap.delayedCall(Math.random() * 12 + 6, doLightning),
      });
      tl.to(lightningRef.current, { opacity: 0.055, duration: 0.04 })
        .to(lightningRef.current, { opacity: 0, duration: 0.08 })
        .to(lightningRef.current, { opacity: 0.035, duration: 0.04 })
        .to(lightningRef.current, { opacity: 0, duration: 0.14 });
    };
    gsap.delayedCall(4, doLightning);

    /* ── 7. Shadow silhouette — psychological tension ── */
    const doShadow = () => {
      gsap
        .timeline({
          onComplete: () =>
            gsap.delayedCall(Math.random() * 20 + 20, doShadow),
        })
        .to(shadowRef.current, {
          opacity: 0.07,
          duration: 1.2,
          ease: "power2.in",
        })
        .to(shadowRef.current, {
          opacity: 0,
          duration: 1.8,
          ease: "power2.out",
          delay: 0.8,
        });
    };
    gsap.delayedCall(8, doShadow);

    /* ── 8. Dimension tear breathe ── */
    gsap.to(tearRef.current, {
      filter: "blur(1.5px) brightness(1.3)",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    /* ── 9. Dust particles ── */
    particlesRef.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 0, opacity: parseFloat(el.dataset.opacity) },
        {
          y: `-${Math.random() * 180 + 80}px`,
          opacity: 0,
          duration: parseFloat(el.dataset.duration),
          delay: parseFloat(el.dataset.delay),
          repeat: -1,
          ease: "none",
          repeatDelay: Math.random() * 6 + 2,
        },
      );
    });
  }, { scope: sectionRef });

  useEffect(() => {
    /* ── 10. Mouse parallax (desktop only) ── */
    const onMouseMove = (e) => {
      if (window.innerWidth < 768) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      // bg video wrapper moves slowest, fog haze moves more — creates Z-depth
      gsap.to(bgRef.current, {
        x: dx * -7,
        y: dy * -4,
        duration: 2.0,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(fogRef.current, {
        x: dx * -13,
        y: dy * -7,
        duration: 2.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes scanMove {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(110vh); }
        }
        .hero-scan { animation: scanMove 14s linear infinite; }

        @keyframes borderPulse {
          0%,100% { box-shadow: 0 0 18px rgba(139,0,0,0.32); }
          50%      { box-shadow: 0 0 36px rgba(220,20,60,0.55); }
        }
        .btn-pulse:hover { animation: borderPulse 1.6s ease-in-out infinite; }

        @keyframes tearShimmer {
          0%,100% { opacity: 0.55; }
          50%      { opacity: 0.85; }
        }
        .tear-line { animation: tearShimmer 3.5s ease-in-out infinite; }

        @keyframes speakPulse {
          0%,100% { opacity: 0.92; }
          50%      { opacity: 1; }
        }
        .speak-bubble { animation: speakPulse 5s ease-in-out infinite; }

        @keyframes tentacleDash {
          0%   { stroke-dashoffset: 600; opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 0.7; }
          100% { stroke-dashoffset: 0;   opacity: 0; }
        }
        .tentacle-path {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: tentacleDash 3.2s ease-in-out infinite;
        }
        .tentacle-path:nth-child(2) { animation-delay: 0.9s; }
        .tentacle-path:nth-child(3) { animation-delay: 1.8s; }
        .tentacle-path:nth-child(4) { animation-delay: 2.5s; }

        @keyframes tentacleGlow {
          0%,100% { filter: drop-shadow(0 0 3px rgba(180,0,20,0.4)); }
          50%      { filter: drop-shadow(0 0 9px rgba(220,20,60,0.75)); }
        }
        .tentacle-svg { animation: tentacleGlow 3s ease-in-out infinite; }

        @keyframes vecnaFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        .vecna-img { animation: vecnaFloat 8s ease-in-out infinite; }

        @keyframes accentPulse {
          0%,100% { opacity: 0.45; }
          50%      { opacity: 0.85; }
        }
        .accent-bar { animation: accentPulse 4s ease-in-out infinite; }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden flex items-center"
        style={{ minHeight: "100svh", background: "#050505" }}
      >
        {/* ░ L1 · Dark forest fog VIDEO — main background ░ */}
        <div
          ref={bgRef}
          className="absolute pointer-events-none"
          style={{ inset: "-10%", willChange: "transform" }}
        >
          {showVideo && (
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.75) contrast(1.1) saturate(0.9)",
              }}
            >
              <source src={fogVideo} type="video/mp4" />
            </video>
          )}
        </div>

        {/* ░ L1b · Storm night forest VIDEO — blended overlay (hidden on mobile) ░ */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{ mixBlendMode: "overlay", opacity: 0.22, zIndex: 1 }}
        >
          {showVideo && (
            <video
              ref={stormRef}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.5) contrast(1.2)",
              }}
            >
              <source src={stormVideo} type="video/mp4" />
            </video>
          )}
        </div>

        {/* ░ L2 · Heavy dark overlay — kills the red blanket ░ */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(0,0,0,0.55)" }}
        />

        {/* ░ L3 · Localized red light source — bottom-center only ░ */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 35% at 50% 100%, rgba(120,0,0,0.38) 0%, transparent 70%)",
          }}
        />

        {/* ░ L4 · Drifting fog haze ░ */}
        <div
          ref={fogRef}
          className="absolute pointer-events-none"
          style={{
            inset: "-25%",
            background:
              "radial-gradient(ellipse 90% 45% at 50% 75%, rgba(40,0,0,0.32) 0%, transparent 65%)",
            willChange: "transform",
          }}
        />

        {/* ░ L5 · Edge vignette ░ */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.82) 100%)",
          }}
        />

        {/* ░ L6 · Shadow silhouette — humanoid, right-center tree area ░ */}
        <div
          ref={shadowRef}
          className="absolute pointer-events-none"
          style={{
            right: "18%",
            top: "15%",
            width: "80px",
            height: "260px",
            opacity: 0,
            background:
              "radial-gradient(ellipse 60% 100% at 50% 40%, rgba(0,0,0,0.95) 0%, transparent 100%)",
            filter: "blur(6px)",
            transform: "scaleX(0.45)",
          }}
        />

        {/* ░ L7 · Dimension tear — right side ░ */}
        <div
          ref={tearRef}
          className="absolute pointer-events-none"
          style={{
            right: "8%",
            top: "10%",
            bottom: "10%",
            width: "2px",
            filter: "blur(0.5px)",
            zIndex: 2,
          }}
        >
          {/* main crack line */}
          <div
            className="tear-line absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(180,20,20,0.7) 15%, rgba(220,60,60,0.9) 38%, rgba(180,20,20,0.6) 62%, rgba(220,40,40,0.8) 78%, transparent 100%)",
              width: "1.5px",
            }}
          />
          {/* glow halo */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "24px",
              left: "-11px",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(139,0,0,0.12) 20%, rgba(180,0,0,0.18) 50%, rgba(139,0,0,0.10) 80%, transparent 100%)",
              filter: "blur(4px)",
            }}
          />
          {/* micro branch cracks */}
          {[18, 38, 56, 74].map((pct, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${pct}%`,
                left: i % 2 === 0 ? "-10px" : "1.5px",
                width: "10px",
                height: "1px",
                background: "rgba(200,30,30,0.55)",
                transform: `rotate(${i % 2 === 0 ? -30 : 28}deg)`,
                transformOrigin: i % 2 === 0 ? "right center" : "left center",
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>

        {/* ░ L8 · Lightning flash ░ */}
        <div
          ref={lightningRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "rgba(220,20,60,1)",
            opacity: 0,
            mixBlendMode: "screen",
          }}
        />

        {/* ░ L9 · Scanline ░ */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 3 }}
        >
          <div
            className="hero-scan"
            style={{
              position: "absolute",
              height: "2px",
              width: "100%",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(180,20,20,0.05) 40%, rgba(180,20,20,0.09) 50%, rgba(180,20,20,0.05) 60%, transparent 100%)",
            }}
          />
        </div>

        {/* ░ L10 · Dust particles ░ */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 3 }}
        >
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              ref={(el) => (particlesRef.current[p.id] = el)}
              data-duration={p.duration}
              data-delay={p.delay}
              data-opacity={p.opacity}
              className="absolute rounded-full"
              style={{
                left: p.left,
                bottom: p.bottom,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: `rgba(200,180,160,${p.opacity})`,
                boxShadow: `0 0 ${parseFloat(p.size) * 3}px rgba(200,160,140,0.3)`,
              }}
            />
          ))}
        </div>

        {/* ░ L11 · Bottom fade ░ */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "220px",
            background:
              "linear-gradient(to bottom, transparent 0%, #050505 100%)",
            zIndex: 4,
          }}
        />

        {/* ░ L12.5 · Vecna — desktop (right side, full height) ░ */}
        <div
          className="absolute right-0 top-0 h-full pointer-events-none hidden md:block"
          style={{ zIndex: 5, width: "44%" }}
        >
          <img
            ref={vecnaRef}
            src={vecna}
            alt=""
            className="vecna-img"
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              height: "100%",
              width: "auto",
              objectFit: "contain",
              objectPosition: "bottom right",
            }}
          />
        </div>

        {/* ░ L12.6 · SVG Tentacle connections ░ */}
        <svg
          className="tentacle-svg absolute inset-0 pointer-events-none hidden md:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            zIndex: 6,
            width: "100%",
            height: "100%",
            overflow: "visible",
          }}
        >
          {/* Main thick tentacle — bubble right edge → Vecna face */}
          <path
            className="tentacle-path"
            d="M 41 52 C 50 50 56 44 63 40 C 68 37 70 35 72 33"
            fill="none"
            stroke="rgba(180,10,30,0.65)"
            strokeWidth="0.55"
            strokeLinecap="round"
          />
          {/* Upper reaching tendril */}
          <path
            className="tentacle-path"
            d="M 41 50 C 50 46 55 40 62 37 C 66 35 69 32 71 30"
            fill="none"
            stroke="rgba(200,0,20,0.45)"
            strokeWidth="0.35"
            strokeLinecap="round"
          />
          {/* Lower coiling tendril */}
          <path
            className="tentacle-path"
            d="M 41 54 C 52 56 58 52 64 47 C 68 43 70 40 73 37"
            fill="none"
            stroke="rgba(160,0,20,0.4)"
            strokeWidth="0.3"
            strokeLinecap="round"
          />
          {/* Extra curl — most organic */}
          <path
            className="tentacle-path"
            d="M 42 51 C 48 55 55 58 60 53 C 64 49 66 42 70 36"
            fill="none"
            stroke="rgba(140,0,20,0.3)"
            strokeWidth="0.25"
            strokeLinecap="round"
          />
        </svg>

        {/* ░ L12 · CINEMATIC CONTENT ░ */}
        <div
          className="relative w-full flex flex-col md:block"
          style={{ zIndex: 6, minHeight: "100svh" }}
        >
          {/* ── text block — top on mobile, centered-left on desktop ── */}
          <div className="flex-1 md:absolute md:inset-0 md:flex md:items-center">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-20 pt-28 pb-6 md:py-0">
              <div className="md:max-w-[52%]">
                {/* scene label */}
                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "1px",
                      background: "rgba(200,20,30,0.45)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "1rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      fontWeight: "bolder",
                      color: "rgba(180,60,60,0.6)",
                    }}
                  >
                    Megaleio&nbsp;·&nbsp;2026
                  </span>
                </div>

                {/* Heading */}
                <h1
                  className="leading-none select-none"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                    fontWeight: 700,
                    letterSpacing: "5px",
                    marginBottom: "36px",
                  }}
                >
                  <span
                    ref={line1Ref}
                    className="text-glow-red block"
                    style={{
                      width: "100%",
                    }}
                  >
                    {splitText("ENTER")}
                    <br />
                    {splitText("THE")}
                  </span>
                  <span
                    ref={line2Ref}
                    className="block mt-1"
                    style={{
                      color: "#f0f0f0",
                      textShadow: "0 2px 40px rgba(0,0,0,0.98)",
                    }}
                  >
                    {splitText("UNKNOWN")}
                  </span>
                </h1>

                {/* ── cinematic description ── */}
                <div
                  ref={cardRef}
                  className="glass-card shadow-2xl p-6 md:p-8 rounded-3xl"
                  style={{ position: "relative" }}
                >


                  <p
                    className="leading-loose"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "clamp(0.78rem, 1.15vw, 1rem)",
                      color: "rgba(210,190,190,0.75)",
                      letterSpacing: "0.06em",
                      margin: 0,
                      textShadow: "0 1px 12px rgba(0,0,0,0.9)",
                    }}
                  >
                    A national-level immersive experience where mystery meets
                    innovation. Step beyond reality &mdash; explore hidden
                    dimensions, and uncover secrets that blur the line between
                    science and the supernatural.
                  </p>
                </div>

                {/* ── date ── */}
                <div
                  style={{
                    marginTop: "32px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "full",
                      height: "1px",
                      background: "rgba(180,20,20,0.45)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "1rem",
                      letterSpacing: "0.3em",
                      fontWeight: "bolder",
                      textTransform: "uppercase",
                      color: "rgba(160,60,60,0.5)",
                    }}
                  >
                    March&nbsp;13–15,&nbsp;2026
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* end text block */}

          {/* ── Vecna — mobile in-flow bottom block ── */}
          <div
            className="block md:hidden w-full pointer-events-none"
            style={{
              height: "60svh",
              position: "relative",
              flexShrink: 0,
              marginLeft: "-1.5rem",
              marginRight: "-1.5rem",
              width: "calc(100% + 3rem)",
            }}
          >
            <img
              src={vecna}
              alt=""
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                height: "100%",
                width: "132%",
                objectFit: "contain",
                objectPosition: "center bottom",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

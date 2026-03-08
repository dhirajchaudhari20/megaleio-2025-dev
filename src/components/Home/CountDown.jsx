import React, { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useScrollReveal } from "../../hook/useScrollReveal";
import bgImage from "../../assets/display/bg1.webp";
import countdownVideo from "../../assets/countdown-bg.mp4";

const Countdown = () => {
  const targetDate = new Date("March 13, 2026 00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      ),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const boxesRef = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // 1. Flicker animation for the title
    const flickerTl = gsap.timeline({ repeat: -1 });
    flickerTl
      .to(titleRef.current, { opacity: 0.7, duration: 0.1, ease: "power1.inOut" })
      .to(titleRef.current, { opacity: 1, duration: 0.05 })
      .to(titleRef.current, { opacity: 0.8, duration: 0.15 })
      .to(titleRef.current, { opacity: 1, duration: 0.1 })
      .to({}, { duration: Math.random() * 2 + 1 }); // Random delay between flickers

    // 2. Initial reveal
    gsap.from(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });

    gsap.from(boxesRef.current, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });
  }, { scope: sectionRef.current });

  useScrollReveal(boxesRef.current, { stagger: 0.1, y: 30 });

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 text-center bg-transparent overflow-hidden min-h-[70vh] flex items-center justify-center perspective-section"
    >
      {/* 🎬 Cinematic Background Overlay — ensuring clouds bleed through 🎬 */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* 🌫️ Bottom & Top Fades */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-2 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050505)" }} />
      <div className="absolute top-0 left-0 right-0 h-32 z-2 pointer-events-none"
        style={{ background: "linear-gradient(to top, transparent, #050505)" }} />

      <div className="relative z-10 px-6 max-w-7xl mx-auto">
        {/* thin top separator */}
        <div className="mx-auto mb-10 w-32 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(200,20,30,0.8), transparent)" }} />

        <h1
          ref={titleRef}
          className="stranger-title mb-8 uppercase select-none leading-tight"
          style={{
            fontSize: "clamp(2rem, 6.5vw, 4.8rem)",
            color: "#ff1111"
          }}
        >
          Countdown to Megaleio
        </h1>

        <p className="mb-14 tracking-[0.4em] uppercase" style={{ fontSize: "0.75rem", color: "rgba(220,100,100,0.75)", fontFamily: "'Courier New', monospace" }}>
          Get ready for the ultimate tech fest
        </p>

        <div className="flex justify-center gap-5 md:gap-10 flex-wrap perspective-[1000px]">
          {["days", "hours", "minutes", "seconds"].map((unit, index) => (
            <div
              key={index}
              ref={el => boxesRef.current[index] = el}
              style={{
                position: "relative",
                background: "linear-gradient(145deg, rgba(25,2,2,0.92), rgba(5,0,0,0.98))",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(220,20,60,0.35)",
                borderBottom: "6px solid rgba(110,0,0,0.9)", // Thick 3D extrusion base
                borderRadius: "10px",
                padding: "24px 28px 18px",
                minWidth: "115px",
                boxShadow: "0 25px 50px rgba(0,0,0,0.95), inset 0 2px 20px rgba(220,20,60,0.18), inset 0 -4px 10px rgba(0,0,0,0.8)",
                transformStyle: "preserve-3d", // For scroll reveal depth
              }}
            >
              {/* top accent line glowing */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: "linear-gradient(to right, transparent, rgba(255,40,40,0.8), transparent)",
                boxShadow: "0 2px 10px rgba(255,0,0,0.6)"
              }} />
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(2.5rem, 6vw, 3.8rem)",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  color: "#fffafa",
                  lineHeight: 1,
                  textShadow: "0 0 10px #ff0000, 0 0 25px #cc0000, 0 0 45px #880000", // Intense neon glow
                }}
              >
                {String(timeLeft[unit]).padStart(2, "0")}
              </div>
              <div style={{
                marginTop: "8px",
                fontFamily: "'Courier New', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(180,80,80,0.5)",
              }}>
                {unit}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 w-24 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(180,20,20,0.6), transparent)" }} />
      </div>
    </section>
  );
};

export default Countdown;

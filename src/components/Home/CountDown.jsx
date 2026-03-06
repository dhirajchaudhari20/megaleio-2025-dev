import React, { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import bgImage from "../../assets/display/bg1.png";

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
      delay: 0.5,
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 text-center bg-cover bg-center overflow-hidden min-h-[70vh] flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* 🎬 YouTube Background Video */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-[115%] h-[115%] -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/iCsKdoouatE?autoplay=1&mute=1&loop=1&playlist=iCsKdoouatE&start=41&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          title="Stranger Things BG"
        ></iframe>
      </div>

      {/* 🎭 Cinematic Overlays */}
      <div className="absolute inset-0 bg-black/60 z-1" />
      <div
        className="absolute inset-0 z-1"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(5,0,0,0.85) 100%)",
          boxShadow: "inset 0 0 150px rgba(180,0,0,0.15)"
        }}
      />

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
          className="font-extrabold mb-4 tracking-[0.25em] uppercase select-none"
          style={{
            fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
            fontSize: "clamp(1.5rem, 5vw, 3.8rem)",
            color: "#DC143C",
            textShadow: "0 0 50px rgba(220,20,60,0.5), 0 0 100px rgba(180,0,20,0.3)",
          }}
        >
          Countdown to Megaleio 2026
        </h1>

        <p className="mb-12 tracking-[0.3em] uppercase" style={{ fontSize: "0.68rem", color: "rgba(200,140,140,0.55)", fontFamily: "'Courier New', monospace" }}>
          Get ready for the ultimate tech fest
        </p>

        <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
          {["days", "hours", "minutes", "seconds"].map((unit, index) => (
            <div
              key={index}
              ref={el => boxesRef.current[index] = el}
              style={{
                position: "relative",
                background: "rgba(10,2,2,0.85)",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
                border: "1px solid rgba(220,20,60,0.2)",
                borderTop: "1px solid rgba(220,20,60,0.5)",
                padding: "24px 32px 20px",
                minWidth: "110px",
                boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
              }}
            >
              {/* top accent line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: "linear-gradient(to right, transparent, rgba(200,20,30,0.6), transparent)",
              }} />
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "#e8e8e8",
                  lineHeight: 1,
                  textShadow: "0 0 18px rgba(220,20,40,0.25)",
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

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative py-24 text-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />
      {/* Bottom fade into surrounding sections */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050505)" }} />
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, transparent, #050505)" }} />

      <div className="relative z-10 px-6">
        {/* thin top separator */}
        <div className="mx-auto mb-8 w-24 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(180,20,20,0.6), transparent)" }} />

        <h1
          className="font-extrabold mb-3 tracking-[0.22em] uppercase"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(1.3rem, 4vw, 3rem)",
            color: "#c8181e",
            textShadow: "0 0 40px rgba(180,0,20,0.4)",
          }}
        >
          Countdown to Megaleio 2026
        </h1>

        <p className="mb-12 tracking-[0.3em] uppercase" style={{ fontSize: "0.68rem", color: "rgba(200,140,140,0.55)", fontFamily: "'Courier New', monospace" }}>
          Get ready for the ultimate tech fest
        </p>

        <div className="flex justify-center gap-3 md:gap-6 flex-wrap">
          {["days", "hours", "minutes", "seconds"].map((unit, index) => (
            <div key={index} style={{
              position: "relative",
              background: "rgba(6,2,2,0.82)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(140,20,20,0.28)",
              borderTop: "1px solid rgba(200,30,30,0.45)",
              padding: "18px 28px 16px",
              minWidth: "96px",
            }}>
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

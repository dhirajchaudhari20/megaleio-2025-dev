import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { eventImages } from "../../data/EventImages";
import { useNavigate } from "react-router-dom";
import { useReveal } from "../../hook/reveal";
import { useGSAP } from "@gsap/react";
import { useMagnetic } from "../../hook/useMagnetic";

gsap.registerPlugin(ScrollTrigger);

export default function EventsGallery() {
  const sectionRef = useRef(null);
  const colsRef = useRef([]);
  const btnRef = useRef(null);
  const navigate = useNavigate();

  useMagnetic(btnRef, 0.35);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=" + section.offsetHeight * 2,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      colsRef.current.forEach((col, i) => {
        const direction = i % 2 === 0 ? -1 : 1;

        const containerHeight =
          section.querySelector(".frame").offsetHeight;

        const colHeight = col.scrollHeight;
        const moveAmount = colHeight - containerHeight;

        if (direction === 1) {
          gsap.set(col, { y: -moveAmount });
        } else {
          gsap.set(col, { y: 0 });
        }

        tl.to(
          col,
          {
            y: direction === 1 ? 0 : -moveAmount,
            ease: "none",
          },
          0
        );
      });
    }, { scope: sectionRef.current });
  }, []);

  const columns = 4;
  const itemsPerColumn = eventImages.length / columns;

  const splitImages = [];

  for (let i = 0; i < columns; i++) {
    const start = i * itemsPerColumn;
    const end = start + itemsPerColumn;

    let columnImages = eventImages.slice(start, end);

    if (i % 2 !== 0) {
      columnImages = columnImages.reverse();
    }

    splitImages.push(columnImages);
  }

  useReveal(".reveal");

  return (
    <section ref={sectionRef} className="py-20 bg-transparent relative perspective-section">
      <div className="reveal max-w-[1400px] mx-auto px-6">
        <div className="frame relative h-[650px] overflow-hidden rounded-[2.5rem] bg-black/40 p-6 isolate border border-white/5 backdrop-blur-sm">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 h-full">
            {splitImages.map((col, i) => (
              <div
                key={i}
                ref={(el) => (colsRef.current[i] = el)}
                className="flex flex-col gap-6"
              >
                {col.map((img, index) => (
                  <div key={index} className="rounded-xl overflow-hidden">
                    <img
                      src={img}
                      alt=""
                      className="w-full h-[220px] md:h-[280px] lg:h-[320px] object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
            <div className="glass-card p-10 md:p-16 rounded-[2rem] flex flex-col items-center pointer-events-auto">
              <h2 className="text-glow-red text-4xl md:text-7xl font-bold text-center leading-tight">
                Explore Our <br /> <span className="text-white">Event Highlights</span>
              </h2>

              <button
                ref={btnRef}
                onClick={() => navigate("/event")}
                className="btn-premium group mt-10 text-white px-10 py-5 rounded-2xl pointer-events-auto transition-all duration-500 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <span className="relative z-10 font-bold tracking-[0.2em] uppercase text-sm">
                    View All Events
                  </span>
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
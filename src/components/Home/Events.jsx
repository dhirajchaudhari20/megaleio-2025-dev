import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { eventImages } from "../../data/EventImages";
import { useNavigate } from "react-router-dom";
import { useReveal } from "../../hook/reveal";

gsap.registerPlugin(ScrollTrigger);

export default function EventsGallery() {
  const sectionRef = useRef(null);
  const colsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
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
    }, sectionRef);

    return () => ctx.revert();
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
    <section ref={sectionRef} className="py-32 bg-black">
      <div className="reveal max-w-[1400px] mx-auto px-6">

        <div className="frame relative h-[600px] overflow-hidden rounded-3xl bg-[#111] p-6 isolate">

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
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <h2 className="text-white text-4xl md:text-6xl font-bold text-center">
              Explore Our <br /> Event Highlights
            </h2>

            <button
              onClick={() => navigate("/event")}
              className="group relative mt-8 bg-red-600 text-white px-8 py-4 rounded-xl pointer-events-auto transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(255,0,0,0.3)]"
            >
              <span className="relative z-10 font-medium tracking-wide">
                View All Events
              </span>

              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>

              <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
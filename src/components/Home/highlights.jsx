import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import "./carousel.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import img1 from "../../assets/glimpse/1.jpeg";
import img2 from "../../assets/glimpse/2.jpeg";
import img3 from "../../assets/glimpse/3.jpeg";
import img4 from "../../assets/glimpse/4.jpeg";
import img5 from "../../assets/glimpse/5.jpeg";
import img6 from "../../assets/glimpse/6.jpeg";


gsap.registerPlugin(ScrollTrigger);

const images = [img1, img2, img3, img4, img5, img6];

/* ── seeded particles ── */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${((i * 137.508) % 88 + 4).toFixed(2)}%`,
  top: `${((i * 93.71) % 78 + 8).toFixed(2)}%`,
  size: `${((i * 17.33) % 3 + 1.5).toFixed(2)}px`,
  dur: `${((i * 47.2) % 8 + 6).toFixed(2)}s`,
  delay: `${((i * 29.17) % 6).toFixed(2)}s`,
  hue: i % 3 === 0 ? "220,20,60" : i % 3 === 1 ? "180,60,80" : "255,80,40",
}));

const ImageCarousel = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const eyebrowRef = useRef(null);
  const rulerRef = useRef(null);
  const swiperWrapRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* ── 1. Section entrance timeline ── */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 78%",
        once: true,
      },
      defaults: { ease: "expo.out" },
    });

    /* eyebrow fade up */
    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 18, letterSpacing: "0.6em" },
      { opacity: 1, y: 0, letterSpacing: "0.35em", duration: 1 },
    );

    /* line 1 — slides in from left with clip */
    tl.fromTo(line1Ref.current,
      { opacity: 0, x: -60, skewX: -4 },
      { opacity: 1, x: 0, skewX: 0, duration: 1.1 },
      "-=0.5"
    );

    /* line 2 — slides in from right */
    tl.fromTo(line2Ref.current,
      { opacity: 0, x: 60, skewX: 4 },
      { opacity: 1, x: 0, skewX: 0, duration: 1.1 },
      "-=0.85"
    );

    /* ruler expands */
    tl.fromTo(rulerRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
      "-=0.6"
    );

    /* swiper slides up */
    tl.fromTo(swiperWrapRef.current,
      { opacity: 0, y: 55 },
      { opacity: 1, y: 0, duration: 1.1 },
      "-=0.7"
    );

    /* ── 2. Glitch loop on title ── */
    const glitch = () => {
      const el = titleRef.current;
      if (!el) return;
      const glitchTl = gsap.timeline({
        onComplete: () => gsap.delayedCall(gsap.utils.random(4, 9), glitch),
      });
      glitchTl
        .to(el, { x: -4, skewX: 3, duration: 0.06, ease: "none" })
        .to(el, { x: 5, skewX: -4, duration: 0.05, ease: "none" })
        .to(el, { x: -3, skewX: 2, duration: 0.05, ease: "none" })
        .to(el, { x: 0, skewX: 0, duration: 0.07, ease: "none" });
    };
    gsap.delayedCall(2.5, glitch);

    /* ── 3. Parallax atmosphere on scroll ── */
    gsap.to(".st-bg-glow-top", {
      y: -60,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

  }, { scope: sectionRef.current });

  return (
    <section ref={sectionRef} className="st-section">

      {/* ── BG layers ── */}
      <div className="st-bg-base" />
      <div className="st-bg-glow-top" />
      <div className="st-bg-glow-bottom" />
      <div className="st-bg-noise" />
      <div className="st-bg-scanlines" />
      <div className="st-bg-vignette" />

      {/* ── particles ── */}
      <div className="st-particles" aria-hidden="true">
        {PARTICLES.map(p => (
          <span key={p.id} className="st-particle"
            style={{
              left: p.left, top: p.top,
              width: p.size, height: p.size,
              animationDuration: p.dur,
              animationDelay: `-${p.delay}`,
              background: `rgba(${p.hue},0.9)`,
              boxShadow: `0 0 6px 2px rgba(${p.hue},0.55)`,
            }}
          />
        ))}
      </div>

      {/* ── TITLE ── */}
      <div className="st-title-block mb-10">
        <div ref={titleRef} className="st-heading-wrap mb-4">
          <h2 className="st-heading">
            <span ref={line1Ref} className="text-glow-red block text-4xl md:text-6xl font-bold uppercase tracking-[0.2em] mb-2">
              GLIMPSES&nbsp;OF
            </span>
            <span ref={line2Ref} className="text-glow-white block text-2xl md:text-4xl font-extralight uppercase tracking-[0.4em]">
              MEGALEIO&nbsp;<em className="not-italic font-bold">2025</em>
            </span>
          </h2>
        </div>
        <div ref={rulerRef} className="mx-auto w-32 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-60" />
      </div>

      {/* ── CAROUSEL ── */}
      <div ref={swiperWrapRef} className="st-carousel-wrap">
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={1.2}
          breakpoints={{ 640: { slidesPerView: 1.6 }, 1024: { slidesPerView: 3 } }}
          loop
          speed={900}
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          coverflowEffect={{ rotate: 6, stretch: 0, depth: 280, modifier: 1.2, slideShadows: true }}
          navigation={{ nextEl: ".st-next", prevEl: ".st-prev" }}
          pagination={{ el: ".st-dots", clickable: true }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="st-swiper"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i} className="st-slide">
              <div className="st-card">
                <img src={src} alt={`Megaleio 2025 — ${i + 1}`} />
                <div className="st-card-overlay" />
                <div className="st-card-frame" />
                <span className="st-card-num">0{i + 1}</span>
              </div>
            </SwiperSlide>
          ))}

          {/* controls */}
          <div className="st-controls">
            <button className="st-prev st-ctrl-btn" aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="st-dots" />
            <button className="st-next st-ctrl-btn" aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </Swiper>
      </div>

    </section>
  );
};

export default ImageCarousel;

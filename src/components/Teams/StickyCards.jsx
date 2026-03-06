import React, { useEffect, useRef, useState } from "react";
import teamData from "../../data/teamData";
import { FaChevronLeft, FaChevronRight, FaLinkedin } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fogVideo from "../../assets/hero-bg-fog.mp4";

gsap.registerPlugin(ScrollTrigger);

const StickyCards = () => {
  const sectionRef = useRef(null);
  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const touchStartXRef = useRef(0);

  const roleAccent = (role) => {
    if (/president|vice/i.test(role)) return "rgba(220, 20, 60, 0.65)";
    if (/secretary/i.test(role)) return "rgba(180, 20, 60, 0.55)";
    if (/treasurer/i.test(role)) return "rgba(180, 120, 20, 0.55)";
    if (/advisor/i.test(role)) return "rgba(120, 20, 180, 0.55)";
    return "rgba(220, 20, 60, 0.45)";
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = section.querySelectorAll(".team-desktop-card");
      if (!cards.length) return;

      const totalCards = cards.length;
      const segmentSize = 1 / totalCards;
      const cardOffset = 6;
      const cardScaleStep = 0.07;

      cards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50 + i * cardOffset,
          scale: 1 - i * cardScaleStep,
          transformPerspective: 1100,
        });
      });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${window.innerHeight * 8}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const activeCard = Math.min(
            Math.floor(progress / segmentSize),
            totalCards - 1,
          );

          setActiveDesktopIndex(activeCard);

          const segProgress =
            (progress - activeCard * segmentSize) / segmentSize;

          cards.forEach((card, i) => {
            if (i < activeCard) {
              gsap.set(card, {
                yPercent: -255,
                rotationX: 35,
                opacity: 0.3,
              });
            } else if (i === activeCard) {
              gsap.set(card, {
                yPercent: gsap.utils.interpolate(-50, -210, segProgress),
                rotationX: gsap.utils.interpolate(0, 35, segProgress),
                scale: 1,
                opacity: 1,
              });
            } else {
              const behindIndex = i - activeCard;
              const currentYOffset = (behindIndex - segProgress) * cardOffset;
              const currentScale =
                1 - (behindIndex - segProgress) * cardScaleStep;

              gsap.set(card, {
                yPercent: -50 + currentYOffset,
                rotationX: 0,
                scale: currentScale,
                opacity: 1,
              });
            }
          });
        },
      });

      return () => {
        trigger.kill();
      };
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const canTilt =
      window.matchMedia("(min-width: 1024px)").matches &&
      window.matchMedia("(hover: hover)").matches;

    if (!canTilt) return;

    const cards = Array.from(document.querySelectorAll(".tilt-card"));
    const cleanupFns = [];

    cards.forEach((card) => {
      const media = card.querySelector(".tilt-media");
      if (!media) return;

      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 10;
        const rotateX = (0.5 - py) * 8;
        media.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
      };

      const onLeave = () => {
        media.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanupFns.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanupFns.forEach((fn) => fn());
  }, []);

  const prevMobile = () => {
    setMobileIndex((prev) => (prev - 1 + teamData.length) % teamData.length);
  };

  const nextMobile = () => {
    setMobileIndex((prev) => (prev + 1) % teamData.length);
  };

  const onTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartXRef.current;
    if (diff > 45) prevMobile();
    if (diff < -45) nextMobile();
  };

  return (
    <>
      <style>{`
        .tilt-media {
          transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }
      `}</style>

      <section className="relative min-h-[72svh] md:min-h-[86svh] flex items-center justify-center overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        >
          <source src={fogVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black" />

        <div className="relative z-10 px-6 text-center max-w-4xl">
          <p className="text-red-400/70 tracking-[0.38em] text-[0.62rem] uppercase mb-5">
            Megaleio 2026 · Core Team
          </p>
          <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-[0.1em]">
            MEET THE TEAM
          </h1>
          <p className="text-gray-300 mt-6 md:mt-8 max-w-3xl mx-auto leading-relaxed">
            The force behind every decision, event, and execution. Scroll down to
            discover each core member.
          </p>
          <div className="mt-10 inline-flex items-center gap-2 text-red-300/75 text-xs uppercase tracking-[0.24em]">
            <span className="w-8 h-px bg-red-400/60" />
            Scroll to reveal
            <span className="w-8 h-px bg-red-400/60" />
          </div>
        </div>
      </section>

      <section
        ref={sectionRef}
        className="hidden md:block sticky-cards relative w-full h-[100svh] bg-black overflow-hidden perspective-[850px]"
      >
        <div className="absolute top-1/2 -translate-y-1/2 right-10 z-[60] w-24">
          <p className="text-red-300 text-xs tracking-[0.22em] uppercase text-right mb-3">
            {String(activeDesktopIndex + 1).padStart(2, "0")} / {String(teamData.length).padStart(2, "0")}
          </p>
          <div className="w-full h-[3px] bg-red-900/45 overflow-hidden">
            <div
              className="h-full bg-red-500 transition-all duration-300"
              style={{ width: `${((activeDesktopIndex + 1) / teamData.length) * 100}%` }}
            />
          </div>
          <p className="text-[0.58rem] mt-3 text-right uppercase tracking-[0.22em] text-gray-400">
            {teamData[activeDesktopIndex]?.role}
          </p>
        </div>

        {teamData.map((member, index) => (
          <div
            key={member.id}
            className="team-desktop-card absolute top-1/2 left-1/2 w-[68%] h-[62%] flex gap-6 p-9 rounded-2xl text-white border"
            style={{
              zIndex: teamData.length - index,
              borderColor: roleAccent(member.role),
              background:
                "linear-gradient(135deg, rgba(80,0,20,0.42) 0%, rgba(7,7,7,0.92) 45%, rgba(45,0,18,0.55) 100%)",
              boxShadow: `0 0 45px ${roleAccent(member.role)}`,
            }}
          >
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="uppercase text-[0.68rem] tracking-[0.28em]" style={{ color: roleAccent(member.role) }}>
                  {member.role}
                </p>
                <h2 className="text-3xl xl:text-4xl font-extrabold uppercase mt-3 leading-tight">
                  {member.name}
                </h2>
              </div>

              <p className="text-gray-300 text-sm xl:text-base leading-relaxed max-w-[95%]">
                {member.description}
              </p>

              {member.linkedin && member.linkedin !== "#" ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-red-400 text-lg hover:text-red-300 transition"
                >
                  <FaLinkedin />
                  <span className="uppercase tracking-[0.22em] text-[0.62rem]">LinkedIn</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-gray-500 text-lg cursor-not-allowed">
                  <FaLinkedin />
                  <span className="uppercase tracking-[0.22em] text-[0.62rem]">LinkedIn N/A</span>
                </span>
              )}
            </div>

            <div className="tilt-card flex-1 rounded-xl overflow-hidden border border-red-500/35">
              <div className="tilt-media w-full h-full">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="md:hidden relative bg-black py-12 overflow-hidden">
        <div className="max-w-xl mx-auto px-5">
          <div className="flex items-center justify-between mb-5">
            <p className="text-red-300 text-[0.62rem] tracking-[0.28em] uppercase">
              Core Team
            </p>
            <p className="text-gray-400 text-[0.62rem] tracking-[0.22em] uppercase">
              {String(mobileIndex + 1).padStart(2, "0")} / {String(teamData.length).padStart(2, "0")}
            </p>
          </div>

          <div
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
            >
              {teamData.map((member) => (
                <article key={member.id} className="w-full shrink-0 px-1">
                  <div
                    className="rounded-2xl overflow-hidden border p-5"
                    style={{
                      borderColor: roleAccent(member.role),
                      background:
                        "linear-gradient(150deg, rgba(80,0,20,0.35) 0%, rgba(8,8,8,0.95) 48%, rgba(50,0,15,0.5) 100%)",
                    }}
                  >
                    <div className="h-[300px] rounded-xl overflow-hidden border border-red-500/30 mb-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <p className="uppercase text-[0.62rem] tracking-[0.26em]" style={{ color: roleAccent(member.role) }}>
                      {member.role}
                    </p>
                    <h3 className="text-2xl font-extrabold uppercase text-white mt-2">
                      {member.name}
                    </h3>
                    <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                      {member.description}
                    </p>

                    {member.linkedin && member.linkedin !== "#" ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-red-400"
                      >
                        <FaLinkedin />
                        <span className="uppercase tracking-[0.22em] text-[0.62rem]">LinkedIn</span>
                      </a>
                    ) : (
                      <span className="mt-4 inline-flex items-center gap-2 text-gray-500 cursor-not-allowed">
                        <FaLinkedin />
                        <span className="uppercase tracking-[0.22em] text-[0.62rem]">LinkedIn N/A</span>
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevMobile}
              className="w-10 h-10 border border-red-400/40 text-red-300 flex items-center justify-center"
              aria-label="Previous member"
            >
              <FaChevronLeft />
            </button>

            <div className="flex items-center gap-2">
              {teamData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setMobileIndex(index)}
                  className={`h-1.5 transition-all ${index === mobileIndex
                      ? "w-7 bg-red-400"
                      : "w-3 bg-red-900/70"
                    }`}
                  aria-label={`Go to member ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextMobile}
              className="w-10 h-10 border border-red-400/40 text-red-300 flex items-center justify-center"
              aria-label="Next member"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default StickyCards;

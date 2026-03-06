import React, { useEffect, useState } from "react";
import { eventsGridData } from "../../data/eventsGridData";
import { useReveal } from "../../hook/reveal";
import bg from "../../assets/display/bg2.webp";
import stormVideo from "../../assets/hero-bg-storm.mp4";
import fogVideo from "../../assets/hero-bg-fog.mp4";

const EventsGrid = () => {
  useReveal(".reveal");

  const [search, setSearch] = useState("");
  const [activeEvent, setActiveEvent] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  const filteredEvents = eventsGridData.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase()),
  );

  const featuredEvents = eventsGridData.slice(0, 4);

  const openSpotlight = (event) => setActiveEvent(event);
  const closeSpotlight = () => setActiveEvent(null);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll(".event-stagger"));
    cards.forEach((card, index) => {
      card.style.setProperty("--stagger-delay", `${index * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -60px 0px" },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredEvents.length]);

  useEffect(() => {
    const canUseMagnetic =
      window.matchMedia("(min-width: 1024px)").matches &&
      window.matchMedia("(hover: hover)").matches;

    if (!canUseMagnetic) return;

    const cards = Array.from(document.querySelectorAll(".magnetic-card"));
    const cleanups = [];

    cards.forEach((card) => {
      const layer = card.querySelector(".tilt-layer");
      if (!layer) return;

      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        const rotateY = (px - 0.5) * 12;
        const rotateX = (0.5 - py) * 10;
        const glowX = px * 100;
        const glowY = py * 100;

        layer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        layer.style.setProperty("--glow-x", `${glowX}%`);
        layer.style.setProperty("--glow-y", `${glowY}%`);
      };

      const onLeave = () => {
        layer.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
        layer.style.setProperty("--glow-x", `50%`);
        layer.style.setProperty("--glow-y", `50%`);
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [filteredEvents.length]);

  const stats = [
    { label: "Total Events", value: eventsGridData.length },
    {
      label: "Tech + Coding",
      value: eventsGridData.filter((event) =>
        /ai|quiz|blind|project|workshop|line|drone|maze|soccer/i.test(event.title),
      ).length,
    },
    {
      label: "Gaming + Sports",
      value: eventsGridData.filter((event) =>
        /bgmi|football|power|arm/i.test(event.title),
      ).length,
    },
    {
      label: "Design + Build",
      value: eventsGridData.filter((event) =>
        /bridge|business|idea|junkyard/i.test(event.title),
      ).length,
    },
  ];

  return (
    <section className="relative bg-black overflow-hidden">
      <style>{`
        @keyframes gridPulse {
          0%,100% { box-shadow: 0 0 0 rgba(220,20,60,0); }
          50% { box-shadow: 0 0 30px rgba(220,20,60,0.22); }
        }
        @keyframes cardReveal {
          0% {
            opacity: 0;
            transform: translateY(26px) scale(0.97);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        @keyframes modalIn {
          0% { opacity: 0; transform: translateY(26px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .event-card-hover:hover {
          animation: gridPulse 1.6s ease-in-out infinite;
        }
        .tilt-layer {
          --glow-x: 50%;
          --glow-y: 50%;
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }
        .tilt-layer::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(255,255,255,0.2), transparent 40%);
          opacity: 0;
          transition: opacity 220ms ease;
        }
        .magnetic-card:hover .tilt-layer::after {
          opacity: 0.25;
        }
        .event-stagger {
          opacity: 0;
          transform: translateY(26px) scale(0.97);
          filter: blur(4px);
          will-change: transform, opacity, filter;
        }
        .event-stagger.in-view {
          animation: cardReveal 560ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--stagger-delay, 0ms);
        }
        .spotlight-enter {
          animation: modalIn 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10">
        <div className="relative min-h-[70svh] md:min-h-[86svh] overflow-hidden flex items-center justify-center">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            <source src={stormVideo} type="video/mp4" />
          </video>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          >
            <source src={fogVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black" />

          <div className="relative max-w-5xl mx-auto px-6 text-center reveal">
            <p className="text-red-500/70 tracking-[0.45em] text-[0.62rem] uppercase mb-5">
              Megaleio 2026 · Event Arena
            </p>
            <h1 className="text-4xl md:text-7xl font-extrabold text-red-500 tracking-[0.12em] drop-shadow-[0_0_35px_rgba(220,20,60,0.55)]">
              THIS YEAR'S EVENTS
            </h1>
            <p className="text-gray-300 mt-8 max-w-3xl mx-auto leading-relaxed">
              Experience coding battles, robotics challenges, esports, workshops,
              and innovation showcases — all in one intense festival environment.
            </p>
            <a
              href="#events-grid"
              className="inline-block mt-10 px-8 py-3 border border-red-500/60 text-red-300 tracking-[0.22em] text-xs uppercase hover:bg-red-500/20 transition"
            >
              Explore Events
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 -mt-10 md:-mt-14 relative z-20 reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-black/70 border border-red-500/25 backdrop-blur-sm p-4 md:p-5"
              >
                <p className="text-red-400 text-2xl md:text-4xl font-bold leading-none">
                  {item.value}
                </p>
                <p className="text-[0.62rem] md:text-xs uppercase tracking-[0.22em] text-gray-400 mt-2">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-20 md:pt-24 reveal">
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-2xl md:text-3xl text-white tracking-[0.12em] font-bold">
              Featured Highlights
            </h2>
            <span className="text-[0.62rem] uppercase tracking-[0.24em] text-red-400/70">
              Top picks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredEvents.map((event, index) => (
              <article
                key={index}
                onClick={() => openSpotlight(event)}
                className="event-stagger magnetic-card event-card-hover group relative h-[365px] overflow-hidden border border-red-500/20 bg-black/60 cursor-pointer transition-all duration-400 hover:-translate-y-1 hover:border-red-400/45"
              >
                <div className="tilt-layer">
                  <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-95" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.08)_48%,transparent_100%)]" />
                  <div className="relative z-10 h-full flex items-end p-4">
                    <div>
                      <p className="text-[0.6rem] tracking-[0.28em] text-red-300/80 uppercase mb-2">Event</p>
                      <h3 className="text-white text-lg font-bold leading-tight">{event.title}</h3>
                      <p className="text-[0.58rem] mt-2 tracking-[0.22em] uppercase text-red-300/70">Click to open</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div id="events-grid" className="max-w-7xl mx-auto px-6 pt-22 md:pt-24 pb-24 md:pb-32">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-5xl font-extrabold text-red-500 tracking-[0.14em] drop-shadow-[0_0_18px_rgba(220,20,60,0.65)]">
              ALL EVENTS
            </h2>
            <p className="text-gray-300 mt-5 max-w-3xl mx-auto">
              Search and discover every competition, workshop, and challenge from this year’s lineup.
            </p>
          </div>

          <div className="flex justify-center mb-14 reveal">
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-xl px-6 py-3 border border-red-500/40 bg-black/75 text-gray-100 outline-none focus:border-red-400 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredEvents.map((event, index) => (
              <div
                key={index}
                onClick={() => openSpotlight(event)}
                className="reveal event-stagger magnetic-card event-card-hover relative group overflow-hidden border border-red-500/25 w-full max-w-[380px] mx-auto cursor-pointer transition-all duration-400 hover:-translate-y-1 hover:border-red-400/50 rounded-2xl"
              >
                <div className="relative h-[500px]">
                  <div className="tilt-layer">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-black/70 group-hover:bg-black/62 transition-colors duration-300" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_20%_20%,rgba(220,20,60,0.22),transparent_42%)]" />

                    <div className="relative z-10 flex flex-col justify-between h-full p-7 text-center">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-wider mb-5">
                          {event.title.toUpperCase()}
                        </h3>
                        {event.description && (
                          <p className="text-gray-200 text-[15px] md:text-base leading-relaxed">
                            {event.description}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 mt-8">
                        <a
                          href={event.registerLink}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full py-3 text-sm font-bold tracking-[0.14em] bg-red-700/85 text-white border border-red-400/45 hover:bg-red-600 transition"
                        >
                          REGISTER NOW
                        </a>
                        {/* <a
                          href={event.detailsLink}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full py-3 text-sm font-bold tracking-[0.14em] bg-black/70 text-yellow-300 border border-yellow-400/45 hover:bg-black/55 transition"
                        >
                          VIEW DETAILS
                        </a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {activeEvent && (
          <div
            className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
            onClick={closeSpotlight}
          >
            <div
              className="spotlight-enter relative w-full max-w-5xl overflow-hidden border border-red-500/35 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 z-20 w-9 h-9 border border-red-400/50 bg-black/70 text-red-300 hover:bg-red-700/35 transition"
                onClick={closeSpotlight}
                aria-label="Close event spotlight"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] min-h-[70svh] md:min-h-[520px]">
                <div className="relative">
                  <img
                    src={activeEvent.image}
                    alt={activeEvent.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/70" />
                  <div className="absolute left-4 bottom-4 border border-red-400/40 bg-black/65 px-3 py-2">
                    <p className="text-[0.58rem] text-red-300 tracking-[0.24em] uppercase">Event Spotlight</p>
                  </div>
                </div>

                <div className="relative p-6 md:p-9 flex flex-col justify-between bg-black/85">
                  <div>
                    <p className="text-[0.58rem] tracking-[0.3em] uppercase text-red-300/75 mb-3">Megaleio 2026</p>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-[0.06em] mb-5">
                      {activeEvent.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {activeEvent.description}
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={activeEvent.registerLink}
                      className="py-3 text-center text-sm font-bold tracking-[0.14em] bg-red-700/90 text-white border border-red-400/50 hover:bg-red-600 transition"
                    >
                      REGISTER NOW
                    </a>
                    <a
                      href={activeEvent.detailsLink}
                      className="py-3 text-center text-sm font-bold tracking-[0.14em] bg-black text-yellow-300 border border-yellow-400/50 hover:bg-zinc-900 transition"
                    >
                      VIEW DETAILS
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsGrid;

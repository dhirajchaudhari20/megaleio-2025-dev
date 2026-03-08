import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import logo from "../assets/images/logo.webp";
import title from "../assets/img1.webp";
import { NavLink, useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const navLeft = ["Home", "Event", "Schedule"];
const navRight = ["MegaHack", "Team", "Contact Us"];

const navRoutes = {
  Home: "/",
  Event: "/event",
  Schedule: "/schedule",
  MegaHack: "/megahack",
  Team: "/team",
  "Contact Us": "/contactUs",
};

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const capsuleRef = useRef(null);
  const chipRef = useRef(null);
  const [showVideo, setShowVideo] = useState(true);
  const [open, setOpen] = useState(false);

  /* â”€â”€ Logo / title scroll-in animation (unchanged logic) â”€â”€ */
  useGSAP(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf([".nav-logo", ".nav-title"]);
    gsap.set([".nav-logo", ".nav-title"], { clearProps: "all" });

    if (!isHome) return;

    requestAnimationFrame(() => {
      if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.from(".nav-logo", {
        x: 0,
        y: window.innerHeight * 0.45,
        scale: window.innerWidth / 200,
        scrollTrigger: {
          trigger: ".nav-logo",
          start: "center 50%",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      });
      gsap.from(".nav-title", {
        y: window.innerHeight * 0.7,
        scale: window.innerWidth / 400,
        opacity: 0,
        scrollTrigger: {
          trigger: ".nav-logo",
          start: "center 50%",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(".nav-logo", {
        x: 0,
        y: window.innerHeight * 0.4,
        scale: window.innerWidth / 70,
        scrollTrigger: {
          trigger: ".nav-logo",
          start: "center 40%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.from(".nav-title", {
        y: window.innerHeight * 0.65,
        scale: window.innerWidth / 250,
        opacity: 0,
        scrollTrigger: {
          trigger: ".nav-logo",
          start: "center 40%",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      });
    });
  }, { scope: capsuleRef.current, dependencies: [isHome] });

  /* ── Capsule → Circle morph on scroll (GSAP) ── */
  useEffect(() => {
    if (!capsuleRef.current || !chipRef.current) return;

    // ❗ Run only on mobile
    if (window.innerWidth >= 768) return;

    gsap.set(chipRef.current, {
      xPercent: -50,
      y: -120,
      opacity: 0,
      scale: 0.6,
    });

    let scrolled = false;

    const onScroll = () => {
      const shouldCollapse = window.scrollY > 30;
      if (shouldCollapse === scrolled) return;
      scrolled = shouldCollapse;

      if (shouldCollapse) {
        gsap.timeline().to(capsuleRef.current, {
          scaleX: 0.12,
          scaleY: 0.7,
          opacity: 0,
          duration: 0.38,
          ease: "power2.in",
        });

        gsap.to(chipRef.current, {
          xPercent: -50,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.52,
          ease: "back.out(1.6)",
          delay: 0.18,
        });
      } else {
        gsap.to(chipRef.current, {
          xPercent: -50,
          y: -120,
          opacity: 0,
          scale: 0.6,
          duration: 0.34,
          ease: "power2.in",
        });

        gsap
          .timeline({ delay: 0.14 })
          .set(capsuleRef.current, { scaleX: 0.12, scaleY: 0.7, opacity: 0 })
          .to(capsuleRef.current, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            duration: 0.48,
            ease: "back.out(1.3)",
          });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }) =>
    `relative tracking-[0.18em] uppercase transition-all duration-300
     after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-red-700
     after:transition-all after:duration-300
     ${isActive
      ? "text-red-500 after:w-full"
      : "text-[#c0a0a0] hover:text-red-400 after:w-0 hover:after:w-full"
    }`;

  const MagneticLink = ({ children, to }) => {
    const x = useSpring(0, { stiffness: 150, damping: 15 });
    const y = useSpring(0, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.5);
      y.set((e.clientY - centerY) * 0.5);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        style={{ x, y }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <NavLink to={to} className={linkClass}>
          {children}
        </NavLink>
      </motion.div>
    );
  };

  return (
    <>
      {/* ░░ SCROLLED LOGO CIRCLE — morphs from collapsed capsule ░░ */}
      <div
        ref={chipRef}
        className="hidden"
        style={{
          position: "fixed",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 51,
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "rgba(5,5,5,0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:
            "0 0 0 1px rgba(220,20,60,0.35), 0 8px 32px rgba(0,0,0,0.7), 0 0 20px rgba(180,0,20,0.18)",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          cursor: "pointer",
          fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
        }}
      >
        <img src={logo} alt="logo" style={{ height: "32px", width: "auto" }} />
        <img
          src={title}
          alt="Megalio 2026"
          style={{ height: "14px", width: "auto", opacity: 0.85 }}
        />
      </div>

      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{
          paddingTop: "12px",
          fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
          fontSize: "0.84rem",
        }}
      >
        {/* â–‘â–‘ FLOATING CAPSULE â–‘â–‘ */}
        <div
          ref={capsuleRef}
          className="relative w-[84%] max-w-5xl rounded-full"
          style={{
            background: "rgba(5,5,5,0.52)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow:
              "0 4px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(220,20,60,0.18), inset 0 1px 0 rgba(255,255,255,0.04)",
            transformOrigin: "center center",
          }}
        >
          {/* â”€â”€ subtle inner top-edge highlight â”€â”€ */}
          <div
            className="absolute top-0 left-8 right-8 h-px rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(220,20,60,0.4), transparent)",
            }}
          />

          {/* â”€â”€ DESKTOP LAYOUT â”€â”€ */}
          <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center px-5 py-1">
            {/* LEFT LINKS */}
            <ul className="flex items-center gap-6 justify-start">
              {navLeft.map((nav, i) => (
                <li key={i}>
                  <MagneticLink to={navRoutes[nav]}>
                    {nav}
                  </MagneticLink>
                </li>
              ))}
            </ul>

            {/* CENTER — Logo + Title (GSAP targets: #logo, #title) */}
            <div
              className="flex flex-col items-center px-5 py-0.5 gap-0.5"
            >
              <div className="nav-logo">
                <img src={logo} alt="logo" className="h-10 md:h-12 w-auto" />
              </div>
              <div className="nav-title flex items-center justify-center">
                <img
                  src={title}
                  alt="Megalio 2026"
                  className="h-8 md:h-10 w-auto"
                />
              </div>
            </div>

            {/* RIGHT LINKS */}
            <ul className="flex items-center gap-6 justify-end">
              {navRight.map((nav, i) => (
                <li key={i}>
                  <MagneticLink to={navRoutes[nav]}>
                    {nav}
                  </MagneticLink>
                </li>
              ))}
            </ul>
          </div>

          {/* â”€â”€ MOBILE LAYOUT â”€â”€ */}
          <div className="relative flex md:hidden items-center justify-center px-4 py-1.5">
            {/* Logo + title — vertical stack for better centering */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="nav-logo">
                <img src={logo} alt="logo" className="h-10 w-auto" />
              </div>
              <div className="nav-title">
                <img src={title} alt="Megalio 2026" className="h-8 w-auto" />
              </div>
            </div>

            {/* Hamburger — pinned to right */}
            <button
              onClick={() => setOpen(!open)}
              className="absolute right-4 flex flex-col gap-1.5 p-2 group"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 w-6 bg-red-600 shadow-[0_0_8px_rgba(220,20,60,0.8)] transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-red-600 shadow-[0_0_8px_rgba(220,20,60,0.8)] transition-all duration-300 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-red-600 shadow-[0_0_8px_rgba(220,20,60,0.8)] transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>

          {/* â”€â”€ MOBILE DROPDOWN â”€â”€ */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-96 pb-5" : "max-h-0"}`}
          >
            <ul className="flex flex-col items-center gap-5 pt-2">
              {[...navLeft, ...navRight].map((nav, i) => (
                <li key={i}>
                  <NavLink
                    to={navRoutes[nav]}
                    className={linkClass}
                    onClick={() => setOpen(false)}
                  >
                    {nav}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* â”€â”€ subtle inner bottom-edge shadow â”€â”€ */}
          <div
            className="absolute bottom-0 left-8 right-8 h-px rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(0,0,0,0.6), transparent)",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;

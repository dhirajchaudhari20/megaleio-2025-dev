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
  const [open, setOpen] = useState(false);

  /* ── Logo / title scroll-in animation ── */
  useGSAP(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf([".nav-logo", ".nav-title", ".mobile-nav-logo", ".mobile-nav-title", capsuleRef.current]);
    gsap.set([".nav-logo", ".nav-title", ".mobile-nav-logo", ".mobile-nav-title", capsuleRef.current], { clearProps: "all" });

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
      gsap.from(".mobile-nav-logo", {
        y: window.innerHeight * 0.35,
        scale: window.innerWidth / 150,
        scrollTrigger: {
          trigger: ".mobile-nav-logo",
          start: "center 40%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.from(".mobile-nav-title", {
        y: window.innerHeight * 0.45,
        scale: window.innerWidth / 250,
        opacity: 0,
        scrollTrigger: {
          trigger: ".mobile-nav-logo",
          start: "center 40%",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      });

      // Animate Capsule Appearance to prevent empty pill effect at start of scroll
      gsap.fromTo(capsuleRef.current,
        {
          backgroundColor: "rgba(5,5,5,0)",
          boxShadow: "none",
          border: "none",
          backdropFilter: "blur(0px)",
          webkitBackdropFilter: "blur(0px)"
        },
        {
          backgroundColor: "rgba(5,5,5,0.72)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(220,20,60,0.18), inset 0 1px 0 rgba(255,255,255,0.04)",
          backdropFilter: "blur(18px)",
          webkitBackdropFilter: "blur(18px)",
          scrollTrigger: {
            trigger: ".mobile-nav-logo",
            start: "center 40%",
            scrub: 1,
            invalidateOnRefresh: true,
          }
        }
      );
    });

  }, { scope: capsuleRef.current, dependencies: [isHome] });

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
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{
          paddingTop: "12px",
          fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
          fontSize: "0.84rem",
        }}
      >
        {/* ░░ FLOATING CAPSULE ░░ */}
        <div
          ref={capsuleRef}
          className={`relative w-[92%] md:w-[84%] max-w-5xl transition-all duration-500 ease-in-out ${open ? "rounded-3xl bg-[rgba(10,5,5,0.95)]" : "rounded-full"
            }`}
          style={{
            background: "rgba(5,5,5,0.72)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow:
              "0 4px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(220,20,60,0.18), inset 0 1px 0 rgba(255,255,255,0.04)",
            transformOrigin: "center center",
          }}
        >
          {/* Subtle inner top-edge highlight */}
          <div
            className="absolute top-0 left-8 right-8 h-px rounded-full pointer-events-none transition-all duration-500"
            style={{
              background: open
                ? "transparent"
                : "linear-gradient(to right, transparent, rgba(220,20,60,0.4), transparent)",
            }}
          />

          {/* ── DESKTOP LAYOUT ── */}
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

            {/* CENTER — Logo + Title */}
            <div className="flex flex-col items-center px-5 py-0.5 gap-0.5 pointer-events-none">
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

          {/* ── MOBILE LAYOUT ── */}
          <div className="relative flex md:hidden items-center justify-center px-4 py-2 h-[68px]">
            {/* Logo + title — vertical stack for better centering */}
            <NavLink
              to="/"
              className="flex flex-col items-center gap-1 z-50 px-2"
              onClick={() => setOpen(false)}
            >
              <div className="mobile-nav-logo">
                <img src={logo} alt="logo" className="h-9 w-auto drop-shadow-lg" />
              </div>
              <div className="mobile-nav-title">
                <img src={title} alt="Megalio 2026" className="h-5 w-auto drop-shadow-md" />
              </div>
            </NavLink>

            {/* Hamburger — pinned to right */}
            <button
              onClick={() => setOpen(!open)}
              className="absolute right-4 flex flex-col gap-1.5 p-3 group rounded-full border border-red-900/40 bg-black/40 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-50 transition-colors hover:bg-black/60"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-[2px] w-5 bg-red-500 shadow-[0_0_8px_rgba(220,20,60,0.8)] transition-all duration-300 ${open ? "rotate-45 translate-y-[8px]" : ""
                  }`}
              />
              <span
                className={`block h-[2px] w-5 bg-red-500 shadow-[0_0_8px_rgba(220,20,60,0.8)] transition-all duration-300 ${open ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`block h-[2px] w-5 bg-red-500 shadow-[0_0_8px_rgba(220,20,60,0.8)] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[8px]" : ""
                  }`}
              />
            </button>
          </div>

          {/* ── MOBILE DROPDOWN ── */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-[500px] opacity-100 pb-7 pt-2" : "max-h-0 opacity-0 py-0"
              }`}
          >
            <ul className="flex flex-col items-center justify-center gap-6 w-full mt-2">
              {[...navLeft, ...navRight].map((nav, i) => (
                <li key={i} className="w-full text-center">
                  <NavLink
                    to={navRoutes[nav]}
                    className={({ isActive }) =>
                      `block w-full text-[1.05rem] tracking-[0.2em] uppercase transition-all duration-300 py-1 ${isActive
                        ? "text-red-500 drop-shadow-[0_0_8px_rgba(220,20,60,0.8)]"
                        : "text-[#d0b0b0] hover:text-white"
                      }`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {nav}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Subtle inner bottom-edge shadow */}
          <div
            className="absolute bottom-0 left-8 right-8 h-px rounded-full pointer-events-none transition-all duration-500"
            style={{
              background: open
                ? "transparent"
                : "linear-gradient(to right, transparent, rgba(0,0,0,0.6), transparent)",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;

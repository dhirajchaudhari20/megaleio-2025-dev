import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import titleImg from '../../assets/title/trinity_new_logo.jpg';
import nexacraftImg from '../../assets/title/nexacraft.png';

const Video = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Cinematic fade-in for the sponsors over the video
    gsap.from(".video-sponsor", {
      opacity: 0,
      y: -20,
      duration: 1.5,
      stagger: 0.3,
      ease: "power3.out",
      delay: 2.5 // Wait for the preloader to finish its 3D intro
    });
  }, { scope: containerRef });

  return (
    <div className="relative" ref={containerRef}>
      <div className="bg-black w-full h-[60svh] md:h-screen sticky top-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/stranger-things-clouds-opt.webm" type="video/webm" />
          <source src="/video/stranger-things-clouds-opt.mp4" type="video/mp4" />
        </video>

        {/* Sponsor Overlays (Floating near the top edges) */}
        <div className="absolute top-24 md:top-32 left-0 w-full px-6 md:px-16 flex justify-between items-start pointer-events-none z-20">

          {/* Title Sponsor - Top Left */}
          <a href="https://www.trinitystudyabroad.com/" target="_blank" rel="noopener noreferrer" className="video-sponsor pointer-events-auto group flex flex-col items-start justify-center cursor-pointer">
            <span className="text-[0.6rem] md:text-[0.8rem] tracking-[0.25em] text-red-500/90 mb-3 font-bold uppercase font-cinzel group-hover:text-red-400 transition-colors drop-shadow-[0_0_8px_rgba(220,20,60,0.8)]">Title Sponsor</span>
            <div className="relative">
              <div className="absolute inset-[-15px] bg-red-600/20 blur-2xl rounded-full group-hover:bg-red-500/40 transition-all duration-500 opacity-80 group-hover:opacity-100"></div>
              <img src={titleImg} alt="Trinity" className="h-[45px] md:h-[70px] xl:h-[85px] w-auto rounded object-contain border border-red-900/40 shadow-[0_0_15px_rgba(220,20,60,0.4)] group-hover:border-red-500/60 group-hover:shadow-[0_0_25px_rgba(220,20,60,0.6)] filter brightness-[1.15] contrast-[1.1] transition-all duration-300 transform group-hover:scale-105" />
            </div>
          </a>

          {/* Co Sponsor - Top Right */}
          <a href="https://nexacraft.com/" target="_blank" rel="noopener noreferrer" className="video-sponsor pointer-events-auto group flex flex-col items-end justify-center cursor-pointer">
            <span className="text-[0.6rem] md:text-[0.8rem] tracking-[0.25em] text-red-500/90 mb-3 font-bold uppercase font-cinzel group-hover:text-red-400 transition-colors drop-shadow-[0_0_8px_rgba(220,20,60,0.8)]">Co-Sponsor</span>
            <div className="relative">
              <div className="absolute inset-[-15px] bg-red-600/10 blur-2xl rounded-full group-hover:bg-red-500/30 transition-all duration-500 opacity-80 group-hover:opacity-100"></div>
              <img src={nexacraftImg} alt="Nexacraft" className="h-[32px] md:h-[50px] xl:h-[65px] w-auto object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] brightness-[1.2] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] transition-all duration-300 transform group-hover:scale-105" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};


export default Video;

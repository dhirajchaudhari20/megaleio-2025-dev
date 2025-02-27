import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Particles from "react-tsparticles";

const Hero = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <div className="relative bg-[#1D1C1B] w-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <Particles
        className="absolute inset-0 z-0"
        options={{
          fullScreen: { enable: false },
          background: { color: "#1D1C1B" },
          particles: {
            number: { value: 50 },
            size: { value: 3 },
            move: { enable: true, speed: 2 },
            color: { value: "#00ff00" },
            links: { enable: true, color: "#00ff00", distance: 150 },
          },
        }}
      />

      {/* Video Background */}
      <div className="w-full absolute inset-0 flex blur-[2px]">
        <video
          className="w-full h-full object-cover"
          src="/back-loader.mp4" // Make sure this video exists in your public folder
          muted
          autoPlay
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D1C1B]/90 to-transparent z-0"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1000"
            className="drop-shadow-[0_0_20px_rgba(255,255,255,1)]"
          >
            <img
              loading="lazy"
              decoding="async"
              className="w-full max-w-[450px] mx-auto"
              src="/megaleio-logo.webp"
              alt="Megaleio logo"
            />
          </div>
          <h1
            className="text-4xl md:text-6xl mt-6 font-[Minecraft] text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            Welcome to <span className="text-[#00ff00]">MEGALEIO 2025</span>
          </h1>
          <p
            className="mt-4 text-lg md:text-xl text-gray-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Where Innovation Meets Creativity
          </p>
          <button
            className="mt-6 px-8 py-3 bg-[#00ff00] text-black font-bold text-lg rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

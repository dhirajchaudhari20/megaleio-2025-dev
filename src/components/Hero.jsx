import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Particles from "react-tsparticles";
import { motion } from "framer-motion";

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
            number: { value: 60, density: { enable: true, area: 800 } },
            size: { value: 3 },
            move: { enable: true, speed: 1.5 },
            color: { value: "#00ff00" },
            links: { enable: true, color: "#00ff00", distance: 150 },
          },
        }}
      />

      {/* Video Background with Fallback Poster */}
      <div className="absolute inset-0 flex">
        <video
          className="w-full h-full object-cover"
          src="/back-loader.mp4"
          poster="/back-loader-poster.jpg" // Fallback image if video lags
          muted
          autoPlay
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D1C1B]/80 to-transparent z-10"></div>
      </div>

      {/* Content with Advanced Animations */}
      <motion.div 
        className="relative z-20 container mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Tagline Above Logo */}
        <motion.div 
          data-aos="fade-down"
          data-aos-duration="1000"
          className="text-lg md:text-2xl text-[#00ff00] mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        > 

        .
        </motion.div>

        {/* Main Logo */}
        <motion.div 
          data-aos="zoom-in" 
          data-aos-duration="1000"
          className="drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            loading="lazy"
            decoding="async"
            className="w-full max-w-[450px] mx-auto"
            src="/megaleio-logo.webp"
            alt="Megaleio logo"
          />
        </motion.div>
{/* Headline */}
<motion.h1 
  className="text-3xl md:text-6xl mt-2 font-[Minecraft] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]"
  data-aos="fade-up"
  data-aos-duration="1000"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5, duration: 1 }}
>
  Welcome to <span className="text-[#00ff00]">MEGALEIO 2025</span>
</motion.h1>
        {/* Subtitle */}
        <motion.p 
          className="mt-4 text-lg md:text-xl text-gray-300"
          data-aos="fade-up"
          data-aos-delay="200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          Where Innovation Meets Creativity
        </motion.p>


      </motion.div>
    </div>
  );
};

export default Hero;

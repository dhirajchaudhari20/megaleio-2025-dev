import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="relative bg-[#1D1C1B] w-screen h-screen flex items-center justify-center">
      <div className="w-full absolute inset-0 flex blur-sm">
        <video 
          className="w-full h-full object-cover" 
          src="/video.mp4" // Make sure this video exists in your public folder
          muted 
          autoPlay 
          loop 
          playsInline 
        />
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div data-aos="flip-up" data-aos-duration="1000">
            <img 
              loading="lazy" 
              decoding="async" 
              className="w-full max-w-[450px] mx-auto drop-shadow-[0_0_10px_rgba(255,255,255,1)]" 
              src="/megaleio-logo.webp" 
              alt="Megaleio logo" 
            />
          </div>
          <h1 
            className="text-3xl md:text-5xl mt-8 font-[Minecraft] text-white"
            data-aos="flip-up" 
            data-aos-duration="1000"
          >
            Welcome to MEGALEIO 2025
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;

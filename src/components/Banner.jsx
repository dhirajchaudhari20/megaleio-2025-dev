import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Banner = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 50
    });
  }, []);

  return (
    <div className="w-full bg-black">
      <div className="container mx-auto">
        <div className="flex max-md:flex-col w-full items-center md:items-start justify-center">
          <div className="flex max-md:flex-col md:items-center md:flex-row-reverse w-full bg-black">
            {/* Image Section */}
            <div className="relative md:w-1/2" data-aos="fade-up" data-aos-duration="1000">
              <div className="absolute w-full bottom-0 h-18 bg-gradient-to-t md:top-0 md:bottom-auto md:w-36 md:h-full from-black to-transparent left-0 md:bg-gradient-to-r" />
              <img 
                src="/megaleio-banner.png"
                className="block w-full h-full object-cover"
                alt="Megaleio 2025 banner"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 md:max-w-prose flex flex-col items-center justify-center p-8 max-md:pt-0 md:mr-10 text-white" 
                 data-aos="fade-up" 
                 data-aos-duration="1200">
              <h2 className="font-[Minecraft] text-3xl md:text-4xl leading-none text-center md:text-left">
                <span className="block text-5xl md:text-6xl pt-1 text-[#5FFF00]">MEGALEIO 2025</span>
                National Level Intercollegiate Technical Event
              </h2>
              
              <p className="mt-4 text-base font-[Minecraft-light]">
                🚀 Join us for the ultimate tech showdown with a <strong className="text-[#5FFF00]">₹3 LAKH</strong> prize pool!<br />
                📅 <strong className="text-[#5FFF00]">7th & 8th March 2025</strong> | 📍 <strong className="text-[#5FFF00]">St. John College of Engineering & Management, Palghar</strong>
              </p>
              
              <p className="mt-4 text-base font-[Minecraft-light]">
                🏆 <strong className="text-[#5FFF00]">Competitions:</strong> Drone Dexterity, MegaHack 5.0, Robo Soccer, Business Plan & more!
              </p>
              
              <a 
                href="/register" 
                className="inline-block mt-6 px-8 py-3 bg-green-600 text-black font-[Minecraft-light] hover:bg-green-800 transition-color"
              >
                REGISTER NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

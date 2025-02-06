import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Location = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
    });
  }, []);

  return (
    <div className="relative w-full flex justify-center bg-gray-dark pt-2 md:pt-2 text-white text-center z-30 bg-[#262423] overflow-y-hidden">
      <div className="w-full flex justify-center overflow-visible px-6">
        <div className="relative w-full max-w-6xl bg-black/40 px-6 pt-16 md:pt-18 md:px-16">
          <h2 className="text-4xl md:text-6xl font-[Minecraft] text-green-500 mb-4" 
              data-aos="fade-down">
            Megaleio 2025
          </h2>
          <div className="font-[Minecraft-light] text-xl mt-4" 
               data-aos="fade-up" data-aos-delay="100">
            Next Stop : ?
          </div>
          <div className="font-[Minecraft-light] text-base md:text-xl mt-4 text-yellow-400" 
               data-aos="fade-up" data-aos-delay="200">
            Where Innovation Meets Imagination
          </div>
          <p className="font-[Minecraft-light] text-base md:text-xl mt-4 text-yellow-400" 
             data-aos="fade-up" data-aos-delay="300">
            Spawning Creativity at St. John College of Engineering and Management!<br />
            Mark your coordinates and join the tech fest extravaganza.
          </p>

          {/* Maps Section */}
          <div className="mt-4 relative">
            {/* Title with mobile characters */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <img 
                src="/Golem.png"
                className="md:hidden w-12 h-auto -mt-8"
                data-aos="fade-right"
                alt="Minecraft Golem walking" 
              />
              <h3 className="text-3xl font-[Minecraft] text-green-400"
                  data-aos="fade-up">
                Where to Spawn?
              </h3>
              <img 
                src="/Zombies.png"
                className="md:hidden w-12 h-auto -mt-8"
                data-aos="fade-left"
                alt="Two Minecraft Zombies walking" 
              />
            </div>

            <div className="relative border-4 border-[#5FFF00] rounded-lg overflow-hidden shadow-[0_0_15px_#5FFF00] max-w-4xl mx-auto"
                 data-aos="zoom-in" data-aos-delay="400">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3756.1546209538187!2d72.78093297499423!3d19.70604018163261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be71c92fbd91e67%3A0x2a3ce68676417a45!2sSt.%20John%20College%20of%20Engineering%20and%20Management!5e0!3m2!1sen!2sin!4v1738062378682!5m2!1sen!2sin"
                className="w-full h-[300px] md:h-[350px]"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div className="mt-8 mb-8" data-aos="fade-up" data-aos-delay="500">
              <a
                href="https://maps.app.goo.gl/UzMw1GQD1pLsPUp36"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-8 py-3 bg-green-600 text-black font-[Minecraft-light] hover:bg-green-800 transition-color"
              >
                LOCATE US ON GOOGLE MAPS
              </a>
            </div>
          </div>

          {/* Desktop Characters */}
          <div className="hidden md:block absolute w-full left-1/2 -translate-x-1/2 bottom-34">
            <img 
              src="/Golem.png"
              className="absolute -bottom-12 left-0 w-auto h-[350px] translate-x-[-70%]"
              data-aos="fade-right"
              data-aos-duration="1200"
              data-aos-offset="300"
              alt="Minecraft Golem walking" 
            />
            <img 
              src="/Zombies.png"
              className="absolute -bottom-12 right-0 w-auto h-[350px] translate-x-[70%]"
              data-aos="fade-left"
              data-aos-duration="1200"
              data-aos-offset="300"
              alt="Two Minecraft Zombies walking" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;

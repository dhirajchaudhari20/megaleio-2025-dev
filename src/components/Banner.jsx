import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 50,
    });
  }, []);

  return (
    <div className="w-full bg-black flex justify-center items-center py-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Image Section */}
          <div
            className="relative w-full md:w-3/4 lg:w-2/3"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="absolute w-full bottom-0 h-18 bg-gradient-to-t from-black to-transparent left-0" />
            <img
              src="/megaleio-banner.png"
              className="block w-full h-auto object-cover"
              alt="Megaleio 2025 banner"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Content Section */}
          <div
            className="mt-8 max-w-2xl text-white"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <h2 className="font-[Minecraft] text-4xl md:text-5xl leading-none">
              <span className="block text-5xl md:text-6xl pt-1 text-[#5FFF00] drop-shadow-md">
                MEGALEIO 2025
              </span>
              <span className="text-lg md:text-xl block text-gray-300">
                National Level Technical Event
              </span>
            </h2>

            <p className="mt-4 text-lg font-[Minecraft-light] leading-relaxed">
              🚀 Join us for the ultimate tech showdown with a{" "}
              <strong className="text-[#5FFF00]">₹3 LAKH</strong> prize pool!
              <br />
              📅 <strong className="text-[#5FFF00]">7th & 8th March 2025</strong>{" "}
              | 📍{" "}
              <strong className="text-[#5FFF00]">
                St. John College of Engineering & Management, Palghar
              </strong>
            </p>

            <p className="mt-4 text-lg font-[Minecraft-light]">
              🏆 <strong className="text-[#5FFF00]">Competitions:</strong> Drone
              Dexterity, MegaHack 5.0, Robo Soccer, Business Plan & more!
            </p>

            <a
              href="https://linktr.ee/Megaleio_2025"
              className="inline-block mt-6 px-10 py-4 bg-[#5FFF00] text-black font-[Minecraft-light] text-lg border-4 border-black hover:bg-green-800 transition-all duration-300 pixel-btn"
            >
              REGISTER NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

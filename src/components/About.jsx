import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 1000 });
  }, []);

  return (
    <div className="perspective-section">
      {/* Top Thematic Border */}
      <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#dc143c]/60 to-transparent"></div>

      {/* Main Container with Stranger Things Theme */}
      <div className="bg-transparent text-[#e8e8e8] font-['Cinzel'] min-h-screen flex flex-col items-center justify-center px-4 relative">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] -z-1" />

        {/* Content Wrapper */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-6xl px-6 py-10">

          {/* Thematic Image Section */}
          <div className="relative md:w-1/2 border-4 border-[#dc143c]/60 shadow-2xl shadow-[#dc143c]/20 rounded-lg overflow-hidden group">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src="/About.jpg"
              alt="Megaleio Adventure"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
          </div>

          {/* Text Section */}
          <div
            className="md:w-1/2 flex flex-col items-center text-center px-4"
            data-aos="fade-up"
          >
            <h2 className="text-4xl md:text-5xl text-[#dc143c] text-glow-red mb-8 font-bold tracking-widest leading-tight">
              WHERE INNOVATION MEETS ADVENTURE!
            </h2>

            <p className="
              bg-black/40 
              border border-[#dc143c]/30 
              px-8 py-6 
              rounded-2xl 
              text-[#e0e0e0] 
              backdrop-blur-md
              shadow-2xl shadow-[#dc143c]/10 
              text-lg leading-relaxed max-w-2xl font-['Courier_New'] tracking-wide
            ">
              Megaleio is a National Level Technical Event that unites brilliant minds across the country to showcase their
              skills, explore the latest trends in technology, and engage with industry experts.
            </p>

            {/* Thematic Button */}
            <a
              href="/events"
              className="
                inline-block 
                mt-8 
                bg-[#dc143c] 
                text-white 
                px-10 py-4 
                text-xl 
                font-bold
                tracking-[0.2em]
                border-2 
                border-transparent
                rounded-full 
                shadow-[0_0_20px_rgba(220,20,60,0.4)]
                hover:shadow-[0_0_35px_rgba(220,20,60,0.6)]
                hover:bg-red-700
                scale-100 hover:scale-105 active:scale-95
                transition-all duration-300
              "
            >
              VIEW ALL EVENTS
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Thematic Border */}
      <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#dc143c]/60 to-transparent"></div>

      {/* Custom CSS for Pixel Effects */}
      <style jsx>{`
        .pixel-border {
          border-width: 4px;
        }
        .pixel-button {
          transition: transform 0.2s ease;
        }
        .pixel-button:hover {
          transform: scale(1.1);
        }
        .pixel-border-top {
          border-bottom: 4px solid #166534;
        }
        .pixel-border-bottom {
          border-top: 4px solid #166534;
        }
      `}</style>
    </div>
  );
};

export default About;

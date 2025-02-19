import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 1000 });
  }, []);

  return (
    <>
      {/* Top Pixelated Border */}
      <div className="h-6 w-full bg-green-600 pixel-border-top"></div>

      {/* Main Container with Minecraft Theme */}
      <div className="bg-[#0F0F0F] text-white font-[Minecraft] min-h-screen flex flex-col items-center justify-center px-4">

        {/* Content Wrapper */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-6xl px-6 py-10">
          
          {/* Minecraft-Themed Image */}
          <div className="relative md:w-1/2 border-4 border-green-500 pixel-border shadow-xl shadow-green-600 rounded-lg">
            <img 
              className="w-full h-full object-cover rounded-md" 
              src="/About.jpg" 
              alt="Minecraft Character Adventure"
              loading="lazy"
            />
          </div>

          {/* Text Section */}
          <div 
            className="md:w-1/2 flex flex-col items-center text-center px-4"
            data-aos="fade-up"
          >
            <h2 className="text-5xl text-green-400 drop-shadow-[2px_2px_0px_rgba(0,255,0,0.8)] mb-6">
              WHERE INNOVATION MEETS ADVENTURE!
            </h2>

            <p className="
              bg-[#1A1A1A] 
              border border-green-500 
              px-6 py-4 
              rounded-xl 
              text-green-300 
              text-shadow-[2px_2px_0px_#000]
              shadow-lg shadow-green-500 
              text-lg leading-relaxed max-w-2xl
            ">
              Megaleio is a National Level Technical Event that unites brilliant minds across the country to showcase their 
              skills, explore the latest trends in technology, and engage with industry experts.
            </p>

            {/* Pixel-Themed Button */}
            <a 
              href="/events"
              className="
                inline-block 
                mt-6 
                bg-green-600 
                text-black 
                px-8 py-4 
                text-xl 
                border-4 
                border-green-400 
                rounded-lg 
                shadow-md 
                shadow-green-400 
                hover:bg-green-800 
                hover:border-green-600 
                transition-all 
                pixel-button
              "
            >
              VIEW ALL EVENTS
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Pixelated Border */}
      <div className="h-6 w-full bg-green-600 pixel-border-bottom"></div>

      {/* Custom CSS for Pixel Effects */}
      <style jsx>{`
        .pixel-border {
          border-image: url('/pixel-border.png') 10 round;
        }
        .pixel-button {
          transition: transform 0.2s ease;
        }
        .pixel-button:hover {
          transform: scale(1.1);
        }
        .pixel-border-top {
          background-image: url('/grass-border.png');
          background-repeat: repeat-x;
        }
        .pixel-border-bottom {
          background-image: url('/dirt-border.png');
          background-repeat: repeat-x;
        }
      `}</style>
    </>
  );
};

export default About;

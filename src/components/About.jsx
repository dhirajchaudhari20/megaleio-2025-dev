import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 1000 });
  }, []);

  return (
    <>
      {/* Top Green Border */}
      <div className="h-4 w-full bg-green-600 shadow-lg shadow-green-400" />

      <div className="overflow-hidden bg-[#121212] text-white font-[Minecraft]">
        {/* Section Container */}
        <div className="relative flex flex-col md:flex-row min-h-screen items-center justify-center">
          
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 p-5">
            <div className="aspect-square border-[5px] border-green-500 rounded-lg shadow-lg shadow-green-500">
              <img 
                className="w-full h-full object-cover rounded-md" 
                src="/About.jpg" 
                alt="Minecraft character"
                loading="lazy"
              />
            </div>
          </div>

          {/* Content Section */}
          <div 
            className="md:w-1/2 flex flex-col items-center text-center py-10 px-6 md:px-12 lg:px-20" 
            data-aos="fade-up"
          >
            <h2 className="text-4xl lg:text-5xl text-green-400 drop-shadow-[2px_2px_2px_rgba(0,255,0,0.8)] mb-6">
              WHERE INNOVATION MEETS ADVENTURE!
            </h2>

            <p className="
              text-green-300 
              text-shadow-[2px_2px_0px_#000]
              bg-[#1a1a1a]
              border border-green-500 
              p-6 
              rounded-xl 
              leading-relaxed 
              tracking-wide 
              shadow-lg 
              shadow-green-600 
              text-sm 
              md:text-lg
              max-w-2xl
            ">
              Megaleio is a National Level Technical Event that unites brilliant minds across the country to showcase their 
              skills, explore the latest trends in technology, and engage with industry experts.
            </p>

            {/* Button */}
            <a 
              href="/events"
              className="
                inline-block 
                mt-6 
                bg-green-600 
                text-black 
                px-6 py-3 
                text-xl 
                border-2 
                border-green-400 
                rounded-lg 
                shadow-md 
                shadow-green-400 
                hover:bg-green-800 
                hover:border-green-600 
                transition-all 
              "
            >
              VIEW ALL EVENTS
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Green Border */}
      <div className="h-4 w-full bg-green-600 shadow-lg shadow-green-400" />
    </>
  );
};

export default About;

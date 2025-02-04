import { useEffect } from 'react';
import AOS from 'aos';

const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="h-14 w-full bg-green-500" /> {/* Green bar */}
      <div className="overflow-hidden bg-gray-dark text-white">
        <div className="relative max-md:border-b-0 bg-[#262423]">
          <div className="relative flex flex-col z-0 md:flex-row gap-0 md:gap-10 h-fit min-h-screen" id="about">
            <div className="relative max-md:px-5 md:w-1/2">
              <div className="aspect-square">
                <img 
                  className="block w-full h-full object-cover"
                  src="/About.jpg"
                  alt="Minecraft character" 
                  loading="lazy"
                />
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col items-center justify-center py-10 px-5 lg:py-20 lg:px-20" 
                 data-aos="fade-up" 
                 data-aos-duration="1000">
              <h2 className="text-5xl lg:text-6xl text-center text-green-500 mb-8 font-[Minecraft] text-shadow-[20px_20px_10px_#000]">
                Where Innovation Meets Adventure!
              </h2>
              <p className="
                font-[Minecraft-light] 
                text-[#5FFF00] 
                text-shadow-[2px_2px_0px_#000]
                bg-[#1a1a1a] 
                p-5 
                rounded-lg 
                max-w-[90%] 
                w-fit 
                leading-relaxed 
                tracking-wide 
                text-justify 
                shadow-[0px_0px_10px_#5FFF00] 
                my-2 
                mx-auto
                text-sm
                md:text-xl
              ">
                Megaleio is a National Level Technical Event that unites brilliant minds across the country to showcase their 
                skills, explore the latest trends in technology, and engage with industry experts.
              </p>
              <a 
                href="/events" 
                className="
                  inline-block 
                  bg-green-600 
                  text-[#1a1a1a]
                  px-3
                  py-3 
                  mt-5 
                  hover:bg-green-800 
                  transition-colors 
                  font-[Minecraft-light]
                  text-lg
                "
              >
                VIEW ALL EVENTS
              </a>
            </div>
          </div>
        </div>
      </div>
	  <div className="h-14 w-full bg-green-500" />
    </>
  );
};

export default About;

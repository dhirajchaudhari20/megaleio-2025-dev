import { useState, useRef, useMemo, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const galleryData = [
	{
	  title: "Welcome!",
	  subtitle: "Grab your orb and meet your guides!",
	  image: "https://i.ibb.co/9x7KPdD/Whats-App-Image-2025-02-03-at-10-04-46-PM-2.jpg"
	},
  
	{
	  title: "Teamwork in Action",
	  subtitle: "Moments of collaboration and success.",
	  image: "https://i.ibb.co/7tQq83sR/Whats-App-Image-2025-02-03-at-10-03-34-PM.jpg",
	},
	{
	  title: "Brilliant Minds at Work",
	  subtitle: "Exploring ideas that transform the future.",
	  image: "https://i.ibb.co/BHKdvk6n/Whats-App-Image-2025-02-03-at-10-03-35-PM-1.jpg",
	},
	{
	  title: "Mega Hack 4.0 Glimpses",
	  subtitle: "Innovation takes center stage.",
	  image: "https://i.ibb.co/9kN9Nqy1/Whats-App-Image-2025-02-03-at-10-03-35-PM.jpg",
	},
	{
	  title: "Innovation in Progress",
	  subtitle: "Capturing the essence of creativity and teamwork.",
	  image: "https://i.ibb.co/Wv3JWCdM/Whats-App-Image-2025-02-03-at-10-03-36-PM.jpg",
	},
  
	{
	  title: "Innovation in Progress",
	  subtitle: "Capturing the essence of creativity and teamwork.",
	  image: "  https://i.ibb.co/wN3XqkX8/IMG-6611.jpg",
	},
  
	{
	  title: "Innovation in Progress",
	  subtitle: "Capturing the essence of creativity and teamwork.",
	  image: "  https://i.ibb.co/1YHGjbSR/IMG-9843.jpg",
	},
  
];

export default function Gallery() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const galleryRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-in-out',
    });

    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % galleryData.length);
    }, 3000);

    // Preload images
    Promise.all(
      galleryData.map(item => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = item.image;
          img.onload = resolve;
          img.onerror = resolve; // Handle failed loads gracefully
        });
      })
    ).then(() => setIsLoading(false));

    return () => clearInterval(interval);
  }, []);

  const visibleSlides = useMemo(() => {
    const slides = [];
    const prev = activeSlide - 1 >= 0 ? activeSlide - 1 : galleryData.length - 1;
    const next = activeSlide + 1 < galleryData.length ? activeSlide + 1 : 0;

    slides.push(
      { ...galleryData[prev], index: prev },
      { ...galleryData[activeSlide], index: activeSlide },
      { ...galleryData[next], index: next }
    );

    return slides;
  }, [activeSlide]);

  const getSlideClassName = (idx) => {
    const baseClasses = "absolute transition-all duration-700 ease-in-out transform";
    const positions = {
      0: "translate-x-[-120%] scale-75 opacity-50", // Previous slide
      1: "translate-x-0 scale-100 opacity-100 z-20", // Active slide
      2: "translate-x-[120%] scale-75 opacity-50"    // Next slide
    };
    return `${baseClasses} ${positions[idx]}`;
  };

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">
      <div className="text-white font-[Minecraft]">Loading gallery...</div>
    </div>;
  }

  return (
    <section className="relative bg-black">
      <h2 className="text-4xl md:text-6xl font-[Minecraft] text-center text-green-500 drop-shadow-lg mb-12" 
          data-aos="zoom-in">
        GLIMPSES OF MEGA HACK 4.0
      </h2>

      <div className="w-full flex flex-wrap justify-center">
        <div className="relative w-full max-w-[1200px] h-[300px] sm:h-[400px] md:h-[530px] overflow-hidden">
          <div className="absolute w-full h-full flex justify-center items-center perspective-[1000px]">
            {visibleSlides.map((slide, idx) => (
              <button
                key={slide.index}
                onClick={() => setActiveSlide(slide.index)}
                className={getSlideClassName(idx)}
              >
                <div className={`relative overflow-hidden rounded-lg transition-all duration-700 ${
                  idx === 1 
                    ? 'w-[280px] sm:w-[500px] md:w-[795px]' 
                    : 'w-[230px] sm:w-[400px] md:w-[600px]'
                } h-[280px] sm:h-[400px] md:h-[530px]`}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex w-full justify-center mt-8 items-center gap-4">
          <button
            onClick={() => setActiveSlide(current => (current === 0 ? galleryData.length - 1 : current - 1))}
            className="px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors"
          >
            ←
          </button>

          <div className="flex gap-2">
            {galleryData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSlide === index ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveSlide(current => (current === galleryData.length - 1 ? 0 : current + 1))}
            className="px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors"
          >
            →
          </button>
        </div>
      </div>
	  <div className="h-14 w-full bg-green-500" />
    </section>
  );
}
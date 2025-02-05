import { useState, useRef, useMemo, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

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



  // Add other images here...
]

export default function Gallery() {
  const [activeSlide, setActiveSlide] = useState(0)
  const galleryRef = useRef(null)

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 900,
      easing: 'ease-in-out',
    })

    // Auto slide every 3 seconds
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % galleryData.length)
    }, 3000)

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [])

  // Get visible slides (active + adjacent)
  const visibleSlides = useMemo(() => {
    const slides = []
    const prev = activeSlide - 1 >= 0 ? activeSlide - 1 : galleryData.length - 1
    const next = activeSlide + 1 < galleryData.length ? activeSlide + 1 : 0

    slides.push(
      { ...galleryData[prev], index: prev },
      { ...galleryData[activeSlide], index: activeSlide },
      { ...galleryData[next], index: next }
    )

    return slides
  }, [activeSlide])

  const handleSlideClick = (index) => setActiveSlide(index)
  const handlePrevious = () => setActiveSlide(current => (current === 0 ? galleryData.length - 1 : current - 1))
  const handleNext = () => setActiveSlide(current => (current === galleryData.length - 1 ? 0 : current + 1))

  return (
    <div className="relative w-full pt-5 md:pt-20 z-20 bg-[#262423]" data-aos="fade-up">
      {/* Title */}
      <h2
  className="text-4xl md:text-6xl font-[Minecraft-bold] text-center text-green-500 drop-shadow-lg mb-12" 
  data-aos="zoom-in" 
  data-aos-duration="1200"
>
  GLIMPSES OF MEGALEIO 2024
</h2>


      <div className="w-full flex flex-wrap justify-center">
        {/* Gallery Container */}
        <div className="relative w-full max-w-[1200px] h-[300px] sm:h-[400px] md:h-[530px] overflow-hidden">
          <div className="absolute w-full h-full flex justify-center items-center">
            {visibleSlides.map((slide, idx) => (
              <button
                key={slide.index}
                onClick={() => handleSlideClick(slide.index)}
                className={`absolute transition-all duration-500 ease-out
                  ${idx === 0 ? '-translate-x-[120%] scale-75 opacity-50' : ''}
                  ${idx === 1 ? 'translate-x-0 scale-100 z-20' : ''}
                  ${idx === 2 ? 'translate-x-[120%] scale-75 opacity-50' : ''}
                `}
              >
                <div className={`relative overflow-hidden rounded-lg
                  ${idx === 1 
                    ? 'w-[300px] sm:w-[500px] md:w-[795px]' 
                    : 'w-[250px] sm:w-[400px] md:w-[600px]'}
                  h-[300px] sm:h-[400px] md:h-[530px] 
                  transition-all duration-300`} data-aos="zoom-in-up">
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

        {/* Navigation Controls */}
        <div className="flex w-full justify-center my-4 md:my-8 items-center gap-2 md:gap-4">
          <button
            onClick={handlePrevious}
            className="px-4 py-2 md:px-6 md:py-3 bg-black/50 backdrop-blur-sm text-white rounded-lg 
                     hover:bg-black/70 transition-colors text-sm md:text-base"
            aria-label="Previous slide"
            data-aos="fade-right"
          >
            ←
          </button>

          <div className="flex gap-1 md:gap-2">
            {galleryData.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideClick(index)}
                className={`w-2 h-2 md:w-3 md:h-3 transition-all duration-300 ${
                  activeSlide === index 
                    ? 'bg-white' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-4 py-2 md:px-6 md:py-3 bg-black/50 backdrop-blur-sm text-white
			rounded-lg 
                     hover:bg-black/70 transition-colors text-sm md:text-base"
            aria-label="Next slide"
            data-aos="fade-left"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

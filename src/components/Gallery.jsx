import { useState, useRef, useMemo, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
const galleryData = [
  {
    title: "Welcome!",
    subtitle: "Grab your orb and meet your guides!",
    image: "https://i.ibb.co/9HGhD3dQ/IMG-9006.jpg"
  },
  {
    title: "Teamwork in Action",
    subtitle: "Moments of collaboration and success.",
    image: "https://i.ibb.co/XrDztvbc/IMG-9008.jpg",
  },
  {
    title: "Brilliant Minds at Work",
    subtitle: "Exploring ideas that transform the future.",
    image: "https://i.ibb.co/YK2t5TG/6-S9-A4650-Copy.jpg",
  },
  {
    title: "Mega Hack 4.0 Glimpses",
    subtitle: "Innovation takes center stage.",
    image: "https://i.ibb.co/DHV19LtT/IMG-9048.jpg",
  },
  {
    title: "Innovation in Progress",
    subtitle: "Capturing the essence of creativity and teamwork.",
    image: "https://i.ibb.co/Q75KNKQ1/IMG-9249.jpg",
  },
  {
    title: "Innovation in Progress",
    subtitle: "Capturing the essence of creativity and teamwork.",
    image: "https://i.ibb.co/pBvk0mk9/IMG-9014.jpg",
  },
];

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
    <section className="relative bg-[#ede5e2] py-6 md:py-8 mt-8 md:mt-">
      {/* Top Edge */}
      <div className="absolute z-50 -top-10 w-full h-18 bg-repeat-x" style={{ backgroundImage: 'url(/edge-white-top.png)', backgroundSize: 'auto 100%' }} />

      <div className="relative w-full pt-4 md:pt-12 z-20 bg-[#ede5e2]" data-aos="fade-up">
        {/* Title */}
        <h2
          className="text-3xl md:text-5xl font-[Minecraft-bold] text-center text-green-500 drop-shadow-xl mb-8" 
          data-aos="zoom-in" 
          data-aos-duration="1200"
        >
          GLIMPSES OF MEGALEIO 2024
        </h2>

        <div className="w-full flex flex-wrap justify-center">
          {/* Gallery Container */}
          <div className="relative w-full max-w-[1200px] h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden">
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
                      ? 'w-[250px] sm:w-[400px] md:w-[600px]' 
                      : 'w-[200px] sm:w-[300px] md:w-[450px]'}
                    h-[250px] sm:h-[350px] md:h-[450px] 
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
          <div className="flex w-full justify-center mt-4 mb-2 items-center gap-2 md:gap-4">
            <button
              onClick={handlePrevious}
              className="px-4 py-2 md:px-6 md:py-3 bg-[#262423] backdrop-blur-sm text-white rounded-lg 
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
                      ? 'bg-[#262423]' 
                      : 'bg-[#767271] hover:bg-[#767271]/40'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="px-4 py-2 md:px-6 md:py-3 bg-[#262423] backdrop-blur-sm text-white
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

      {/* Bottom Edge */}
      <div className="absolute z-50 w-full h-18 bg-repeat-x" style={{ backgroundImage: 'url(/edge-white-bottom.png)', backgroundSize: 'auto 100%' }} />
    </section>
  )
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from 'aos';
import '../index.css'

const events = [
  {
    id: 1,
    title: "Hackathon",
    description: "Compete in a 24-hour code fest to build game-changing solutions!",
    image: "/src/images/megahack.webp",
  },
  {
    id: 2,
    title: "Drone Dexterity",
    description: "Prove your drone-flying skills in a high-speed obstacle course!",
    image: "/src/images/laser-tag.webp",
  },
  {
    id: 3,
    title: "Robo Soccer",
    description: "Program and control robots in an exciting soccer tournament. May the best bot win!",
    image: "/src/images/robo-soccer.webp",
  },
  {
    id: 4,
    title: "Business Pitch",
    description: "Present your innovative business ideas and get feedback from industry experts!",
    image: "/src/images/business-plan.webp",
  },
  {
    id: 5,
    title: "Technical Paper",
    description: "Share your research and technical insights with the academic community!",
    image: "/src/images/coderelay.webp",
  },
];

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getRotation = (index) => {
    const totalItems = events.length;
    const angleIncrement = 360 / totalItems;
    return (index - currentIndex) * angleIncrement;
  };

  const getPosition = (index) => {
    const rotation = getRotation(index);
    const radian = (rotation * Math.PI) / 180;
    const radius = 150;
    return {
      x: Math.sin(radian) * radius,
      y: -Math.cos(radian) * radius
    };
  };

  const getScale = (index) => {
    const distance = Math.abs(index - currentIndex);
    return 1 - distance * 0.15;
  };

  const getOpacity = (index) => {
    const distance = Math.abs(index - currentIndex);
    return 1 - distance * 0.3;
  };

  // Only show current, next, and previous thumbnails
  const isVisible = (index) => {
    const total = events.length;
    const offset = (index - currentIndex + total) % total;
    return offset === 0 || offset === 1 || offset === total - 1;
  };

  return (
    <div className="w-screen min-h-screen bg-black/90 text-white overflow-hidden pt-20" id="events">
      <div className="relative w-full">
        <h2 className="text-4xl md:text-6xl font-[Minecraft] text-center text-[#5FFF00] mb-12"
            data-aos="fade-down">
          EVENTS
        </h2>

        {/* Main Container */}
        <div className="relative h-[600px] flex lg:flex-row flex-col items-center justify-center px-4 md:px-12 lg:px-24">
          
          {/* Left Thumbnails (Desktop) */}
          <div className="hidden lg:flex flex-col items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 w-[120px] h-full">
            {events.map((event, index) => {
              if (!isVisible(index)) return null;
              const position = getPosition(index);
              return (
                <motion.div
                  key={event.id}
                  className="absolute cursor-pointer"
                  animate={{
                    x: position.x,
                    y: position.y,
                    scale: getScale(index),
                    rotateZ: getRotation(index),
                    opacity: getOpacity(index),
                  }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  style={{ zIndex: events.length - Math.abs(currentIndex - index) }}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div
                    className={`w-16 h-16 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 ${
                      index === currentIndex ? "border-[#5FFF00]" : "border-gray-600"
                    }`}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Main Content (Centered) */}
          <div className="w-full h-full flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="bg-black/50 backdrop-blur border-2 border-[#5FFF00] rounded-lg p-6 shadow-[0_0_15px_#5FFF00] flex flex-col items-center"
              >
                <div className="mb-4 rounded-lg overflow-hidden flex justify-center">
                  <img
                    src={events[currentIndex].image}
                    alt={events[currentIndex].title}
                    className="w-full h-[300px] md:h-[400px] lg:h-[600px] object-cover"
                  />
                </div>
                <h2 className="text-3xl font-[Minecraft] text-[#5FFF00] mb-4">
                  {events[currentIndex].title}
                </h2>
                <p className="text-gray-300 mb-6 font-[Minecraft-light]">
                  {events[currentIndex].description}
                </p>
                <div className="flex gap-6 mt-4 justify-center">
                  <button className="text-xl px-8 py-3 font-[Minecraft] bg-[#5FFF00] text-black hover:bg-[#4CD900] transition-colors">
                    Register
                  </button>
                  <button className="text-xl px-8 py-3 font-[Minecraft] border-2 border-[#5FFF00] text-[#5FFF00] hover:bg-[#5FFF00] hover:text-black transition-colors">
                    Learn More
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Buttons (Desktop) */}
          <div className="hidden lg:flex flex-col gap-4 absolute right-0 top-1/2 -translate-y-1/2">
            <button
              className="text-[#5FFF00] border-2 border-[#5FFF00] text-xl px-6 py-3 font-[Minecraft] hover:bg-[#4CD900] transition-colors"
              onClick={() => setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)}
            >
              ←
            </button>
            <button
              className="text-[#5FFF00] border-2 border-[#5FFF00] text-xl px-6 py-3 font-[Minecraft] hover:bg-[#4CD900] transition-colors"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % events.length)}
            >
              →
            </button>
          </div>
        </div>

        {/* Mobile Thumbnails (Bottom) */}
        <div className="lg:hidden w-full mt-6 flex items-center justify-center relative">
          {events.map((event, index) => {
            if (!isVisible(index)) return null;
            const position = getPosition(index);
            return (
              <motion.div
                key={event.id}
                className="absolute cursor-pointer"
                animate={{
                  x: position.x,
                  y: position.y,
                  scale: getScale(index),
                  rotateZ: getRotation(index),
                  opacity: getOpacity(index),
                }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                style={{ zIndex: events.length - Math.abs(currentIndex - index) }}
                onClick={() => setCurrentIndex(index)}
              >
                <div
                  className={`w-16 h-16 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 ${
                    index === currentIndex ? "border-[#5FFF00]" : "border-gray-600"
                  }`}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Buttons (Below) */}
        <div className="lg:hidden flex justify-center gap-6 mt-4">
          <button
            className="text-[#5FFF00] border-2 border-[#5FFF00] text-xl px-6 py-3 font-[Minecraft] hover:bg-[#4CD900] transition-colors"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)}
          >
            ←
          </button>
          <button
            className="text-[#5FFF00] border-2 border-[#5FFF00] text-xl px-6 py-3 font-[Minecraft] hover:bg-[#4CD900] transition-colors"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % events.length)}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

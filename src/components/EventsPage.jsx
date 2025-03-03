import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

// DATA FOR EVENTS
const eventsData = [
  {
      id: "techQuiz",
      name: "Tech Quiz", 
      img: "https://i.ibb.co/WWxCbQnp/tech-quiz.jpg",
      desc: "Showcase your tech knowledge in an exciting quiz! Answer questions on various tech topics and compete for the top spot.",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSdBCVmSj2dfL7ZK6Gwvie_IviJG10btsM1DEgZvokZO32Eq3w/viewform?usp=preview",
      rulebook: "/rulebook-megaleio.pdf#techQuiz"
  },
  {
      id: "robomaze",
      name: "Robomaze",
      img: "https://i.ibb.co/5t4wmPN/robomaze.jpg",
      desc: "Navigate through a challenging maze with your robot! Test your robotics skills and see if you can complete the maze in record time.",
      link: "https://docs.google.com/forms/d/e/1FAIpQLScOdrd5hlXPowIhZ5aQDkdkfCdvvlRq4yR_TprB6pja5T1mEg/viewform?usp=preview",
      rulebook: "/rulebook-megaleio.pdf#robomaze"
  },
  {
      id: "roboSoccer",
      name: "Robo Soccer",
      img: "https://i.ibb.co/f6F20L8/Copy-of-Copy-of-MEGALEIO-2024-2.png",
      desc: "Compete in an AI-powered soccer match! Program your robots to play soccer and compete against other teams.",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSc1Wz8Qf175LBVK4_RKFK1Qr5EEidmGwA6uf2n4ZeggidwjZQ/viewform?usp=preview",
      rulebook: "/rulebook-megaleio.pdf#roboSoccer"
  },
  {
      id: "codeRelay",
      name: "Code Relay",
      img: "https://i.ibb.co/Y75qdZcW/Copy-of-Copy-of-MEGALEIO-2024-4.jpg",
      desc: "Team up and write code in a relay format! Collaborate with your team to solve coding challenges in a relay race.",
      link: "https://docs.google.com/forms/d/e/1FAIpQLScWEk1AwwQP8mOR8edd825y-CCNag4y_0EbubfVIA74gj48-g/viewform?usp=preview",
      rulebook: "/rulebook-megaleio.pdf#codeRelay"
  },
  {
      id: "businessPlan",
      name: "Business Plan Presentation",
      img: "business-plan.png",
      desc: "Present your innovative business ideas. Showcase your entrepreneurial skills and compete for the best business plan.",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSePiH569U8j0a-5sACOTQetsIcnqr9xwt2mDYcKwmz_5DNiyg/viewform?usp=preview",
      rulebook: "/rulebook-megaleio.pdf#businessPlan"
  },
  {
      id: "blindC",
      name: "Blind C",
      img: "https://i.ibb.co/Y4YtLXMk/Copy-of-Copy-of-MEGALEIO-2024-1.jpgg",
      desc: "Test your C skills in a blind coding challenge. Compete against others and prove your expertise in C programming without seeing the code.",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSePZ8TvncFpx13M4OjcgRbC1IBF3Kfcct99pmAZYY7cgUYWSw/viewform?usp=preview",
      rulebook: "/rulebook-megaleio.pdf#blindC"
  },
  {
      id: "megaHack",
      name: "MegaHack 5.0",
      img: "https://i.ibb.co/mC7hT09k/megahack.jpg",
      desc: "Showcase your research and innovative ideas. Present your projects and compete for the best presentation.",
      link: "https://megahack.in",
      rulebook: "/rulebook-megaleio.pdf#megaHack"
  },
  {
      id: "bridgeIt",
      name: "Bridge It",
      img: "https://i.ibb.co/ZR26J2JC/bridge-it.jpg",
      desc: "Construct the strongest and most efficient bridge! Test your engineering skills and compete to build the best bridge.",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSeHbWY_ErNq4uCe_NM-o9TTHsQ9GvSmr9eWyJ7pOKBq9L_liQ/viewform?usp=preview",
      rulebook: "/rulebook-megaleio.pdf#bridgeIt"
  },
  {
      id: "powerlifting",
      name: "Powerlifting",
      img: "https://i.ibb.co/VW9kWBFj/Copy-of-Copy-of-MEGALEIO-2024-6.jpg",
      desc: "Showcase your strength in this lifting challenge. Compete against others to lift the heaviest weights.",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSeAlKec-MR3BgCjm9xRA0SYUH3ELOnx5XZ4V1MtiVjGtIufnA/viewform?usp=preview",
      rulebook: "/rulebook-megaleio.pdf#powerlifting"
  },
  {
      id: "civilJunkyard",
      name: "Civil Junkyard",
      img: "https://i.ibb.co/Q7DKhh6x/civil-junkyard.jpg",
      desc: "Create engineering marvels from scrap! Use your creativity and engineering skills to build something amazing from junk.",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSeUx3HKI0EwFoyOUxVjQkAhsJDEZhN7s3O32Lp2PgMsPzTZuQ/viewform?usp=preview",
      rulebook: "/rulebook-megaleio.pdf#civilJunkyard"
  },
  {
      id: "neonCricket",
      name: "Neon Cricket",
      img: "https://i.ibb.co/wNMJrbh5/neon-cricket.jpg",
      desc: "Experience cricket like never before under neon lights! Play cricket in a unique and exciting neon-lit environment.",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSeB43GCtRpfwzDNuphRto90VxUJqzQ6krPiTsvcrQEVzoU0TA/viewform?usp=preview",
      rulebook: "/rulebook-megaleio.pdf#neonCricket"
  },
  {
      id: "clashRoyale",
      name: "Clash Royale",
      img: "https://i.ibb.co/N6j1Mc9C/clash-royale.jpg",
      desc: "Strategize and battle it out in this competitive mobile game. Compete against others in Clash Royale and prove your skills.",
      link: "https://docs.google.com/forms/d/e/1FAIpQLScQii-lqIPkXwRLheBfO5gTNa6eAKyCDI2zTf-6KWFaLp1TrA/viewform?usp=preview",
      rulebook: "/rulebook-megaleio.pdf#clashRoyale"
  },
  {
      id: "bgmi",
      name: "BGMI",
      img: "https://i.ibb.co/QFksvMc7/bgmi.jpg",
      desc: "Compete in the ultimate battle royale experience! Show your skills in BGMI and compete against others to be the last one standing.",
      link: "https://docs.google.com/forms/d/e/1FAIpQLScrgIojItZTFxEcXo3TPvPB7frOFsr6mpiqDZRq6FigyVL9bw/viewform?usp=preview",
      rulebook: "/rulebook-megaleio.pdf#bgmi"
  },
  {
      id: "droneDexterity",
      name: "Drone Dexterity",
      img: "https://i.ibb.co/V0xK06MS/drone.jpg", // Update with actual image URL
      desc: "Navigate through an obstacle course with your drone! Test your piloting skills and compete in this exciting drone racing challenge.",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSd7OkahU6fW9jKxedYe9dxtn6_7lJA2aZQHqFRBtrYu4TAjtw/viewform?usp=preview", // Update with actual form link
      rulebook: "/rulebook-megaleio.pdf#droneDexterity" // Update with actual rulebook link
  }
];

// MAIN COMPONENT
export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [flippedCards, setFlippedCards] = useState(new Set());
  const navigate = useNavigate();

  // Initialize AOS for scroll animations
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out'
    });
  }, []);

  // Filter events based on search term
  const filteredEvents = eventsData.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Flip card handler
  const handleFlip = (eventId) => {
    setFlippedCards(prev => {
      const newFlipped = new Set(prev);
      if (newFlipped.has(eventId)) {
        newFlipped.delete(eventId);
      } else {
        newFlipped.add(eventId);
      }
      return newFlipped;
    });
  };

  return (
    <>
      {/* Main Events Section */}
      <section className="relative font-[Minecraft] min-h-[calc(100vh+150px)] bg-[#1D1C1B] min-w-screen">
        <div>
          <br />
          {/* Page Title */}
          <div className="text-center mb-8 mt-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              This Year's <br />Events
            </h1>
            <div>
              <p className="text-base md:text-lg max-w-2xl mx-auto">
                This year's event will feature a variety of exciting competitions across different domains.
                Join us on 7th &amp; 8th March 2025 to compete and showcase your skills!
              </p>
            </div>
          </div>

          {/* Search Container */}
          <div className="my-5 flex justify-center items-center gap-2 relative">
            <input
              type="text"
              className="w-[250px] p-2.5 pl-10 border-2 border-blue-500 rounded bg-white text-gray-800 text-sm font-[Minecraft]"
              placeholder="Search Events... 🔍"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          

          {/* Events Grid */}
          <div
            id="eventGrid"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center p-5 px-5 md:px-32"
          >
            {filteredEvents.map((event, index) => (
              <div 
                key={event.id}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="relative h-[400px] perspective-1000"
              >
                {/* 3D Container */}
                <div
                  className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                    flippedCards.has(event.id) ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front of Card */}
                  <div className="absolute w-full h-full backface-hidden">
                    <div
                      className="relative h-full border-2 border-blue-500 p-5 rounded-3xl text-center flex flex-col shadow-md overflow-hidden"
                      style={{
                        backgroundImage: `url(${event.img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black/60"></div>

                      {/* Front Content */}
                      <div
                        className={`relative z-10 flex flex-col h-full text-white ${
                          flippedCards.has(event.id) ? 'pointer-events-none' : ''
                        }`}
                      >
                        <h2 className="text-2xl md:text-3xl my-2">
                          {event.name}
                        </h2>
                        <p className="text-sm md:text-base mb-4">
                          {event.desc}
                        </p>
                        <div className="mt-auto">
                          {/* Register Button */}
                          <a
                            href={event.link}
                            className={`w-4/5 mx-auto bg-green-600 border-2 border-green-600 p-2.5 mt-2 text-center text-sm rounded cursor-pointer text-white transition transform duration-200 ease-in-out hover:scale-105 block ${
                              flippedCards.has(event.id) ? 'opacity-50' : ''
                            }`}
                          >
                            REGISTER NOW
                          </a>
                          {/* View Details Button */}
                          <button
                            className={`w-4/5 mx-auto bg-yellow-400 border-2 border-yellow-400 p-2.5 mt-2 text-center text-sm rounded cursor-pointer text-white transition transform duration-200 ease-in-out hover:scale-105 ${
                              flippedCards.has(event.id) ? 'opacity-50' : ''
                            }`}
                            onClick={() => handleFlip(event.id)}
                          >
                            VIEW DETAILS
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="bg-white border-2 border-blue-500 p-5 rounded-3xl text-center flex flex-col shadow-md h-full relative">
                      {/* Close Button */}
                      <button
                        onClick={() => handleFlip(event.id)}
                        className="absolute -top-2 -right-2 text-red-500 text-3xl font-bold w-12 h-12 rounded-full 
                          hover:drop-shadow-[0px_0px_5px_rgba(255,0,0,0.8)] transition-all font-sans 
                          flex justify-center items-center bg-white border-2 border-red-500
                          hover:bg-red-50 z-20"
                      >
                        ×
                      </button>

                      {/* Back Content */}
                      <h2 className="text-2xl md:text-3xl mb-4 text-black">
                        {event.name}
                      </h2>
                      <div className="flex-grow overflow-y-auto px-4">
                        <p className="text-base mb-4 text-gray-700">
                          {event.desc}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          Additional details and rules can be found in the rulebook.
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 mt-auto">
                        {/* Optional Button for Blind C or Code Relay */}
                        {(event.id === "blindC" || event.id === "codeRelay") && (
                          <button
                            onClick={() => navigate('/sjcem-compiler')}
                            className="w-4/5 mx-auto bg-blue-500 border-2 border-blue-500 p-2.5 text-center text-sm rounded cursor-pointer text-white 
                              transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:bg-blue-600"
                          >
                            Open Code Editor
                          </button>
                        )}
                        {/* Rulebook Button */}
                        <button
                          onClick={() => window.open(event.rulebook, '_blank', 'noopener,noreferrer')}
                          className="w-4/5 mx-auto bg-green-600 border-2 border-green-600 p-2.5 text-center text-sm rounded cursor-pointer text-white 
                            transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:bg-green-700"
                        >
                          View Rulebook
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End of 3D Container */}
              </div>
            ))}
          </div>
          <div className="h-10"></div>
        </div>
      </section>
    </>
  );
}

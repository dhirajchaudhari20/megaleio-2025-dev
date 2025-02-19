import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const eventsData = [
	{
		id: "techQuiz",
		name: "Tech Quiz", 
		img: "https://i.ibb.co/zVZh50dD/Copy-of-Copy-of-MEGALEIO-2024-2.jpg",
		desc: "Showcase your tech knowledge in an exciting quiz! Answer questions on various tech topics and compete for the top spot.",
		link: "https://docs.google.com/forms/d/1N55_GjT8JCIKX57dX6nykgBS8Ei10Ib-FWv0l7VPN48/edit",
		rulebook: "https://rulebook.techquiz.com"
	},
	{
		id: "robomaze",
		name: "Robomaze",
		img: "https://i.ibb.co/WvrvghT9/Copy-of-Copy-of-MEGALEIO-2024-3.jpg",
		desc: "Navigate through a challenging maze with your robot! Test your robotics skills and see if you can complete the maze in record time.",
		link: "https://docs.google.com/forms/d/1np6C3Y3c_9SwyFpUa_WcHrQExsau7OrJLPF125T-DrU/edit",
		rulebook: "https://rulebook.robomaze.com"
	},
	{
		id: "roboSoccer",
		name: "Robo Soccer",
		img: "https://i.ibb.co/f6F20L8/Copy-of-Copy-of-MEGALEIO-2024-2.png",
		desc: "Compete in an AI-powered soccer match! Program your robots to play soccer and compete against other teams.",
		link: "https://docs.google.com/forms/d/16gK6SakHvDkb1m8ouQIjsvM7Ln6Ztn0IrtiP6S14vtQ/edit",
		rulebook: "https://rulebook.robosoccer.com"
	},
	{
		id: "codeRelay",
		name: "Code Relay",
		img: "https://i.ibb.co/Y75qdZcW/Copy-of-Copy-of-MEGALEIO-2024-4.jpg",
		desc: "Team up and write code in a relay format! Collaborate with your team to solve coding challenges in a relay race.",
		link: "https://docs.google.com/forms/d/18iUmtSW6bEcoXj9F-Wl-uBkbc9RGgpwyTYO6Fw0gGWc/edit",
		rulebook: "https://rulebook.coderelay.com"
	},
	{
		id: "businessPlan",
		name: "Business Plan",
		img: "business-plan.png",
		desc: "Present your innovative business ideas. Showcase your entrepreneurial skills and compete for the best business plan.",
		link: "https://register.businessplan.com",
		rulebook: "https://rulebook.businessplan.com"
	},
	{
		id: "blindC",
		name: "Blind C",
		img: "https://i.ibb.co/Y4YtLXMk/Copy-of-Copy-of-MEGALEIO-2024-1.jpgg",
		desc: "Test your C skills in a blind coding challenge. Compete against others and prove your expertise in C programming without seeing the code.",
		link: "https://docs.google.com/forms/d/164lPFxGkzW-JJPBBCMHVQauUuZ0_901XFBfqd0ha9EI/edit",
		rulebook: "https://rulebook.blindc.com"
	},
	{
		id: "presentation",
		name: "Presentation",
		img: "presentation.png",
		desc: "Showcase your research and innovative ideas. Present your projects and compete for the best presentation.",
		link: "https://register.presentation.com",
		rulebook: "https://rulebook.presentation.com"
	},
	{
		id: "megaHack",
		name: "MegaHack 5.0",
		img: "https://i.ibb.co/C3fFyFmV/Copy-of-Copy-of-MEGALEIO-2024-11.jpg",
		desc: "Showcase your research and innovative ideas. Present your projects and compete for the best presentation.",
		link: "https://register.presentation.com",
		rulebook: "https://rulebook.presentation.com"
	},
	{
		id: "bridgeIt",
		name: "Bridge It",
		img: "bridge-it.png",
		desc: "Construct the strongest and most efficient bridge! Test your engineering skills and compete to build the best bridge.",
		link: "https://docs.google.com/forms/d/1YRNWNuLLK8xIdHaMJY9b5suWcjBl5jLZE6ejA1m4rX8/edit",
		rulebook: "https://rulebook.bridgeit.com"
	},
	{
		id: "powerlifting",
		name: "Powerlifting",
		img: "https://i.ibb.co/VW9kWBFj/Copy-of-Copy-of-MEGALEIO-2024-6.jpg",
		desc: "Showcase your strength in this lifting challenge. Compete against others to lift the heaviest weights.",
		link: "https://docs.google.com/forms/d/1HxhKEg4oZWyXRV9h9Jr50vpoNENrYRztNfenZuhrztI/edit",
		rulebook: "https://rulebook.powerlifting.com"
	},
	{
		id: "civilJunkyard",
		name: "Civil Junkyard",
		img: "https://i.ibb.co/WNSGc3hW/Copy-of-Copy-of-MEGALEIO-2024-5.jpg",
		desc: "Create engineering marvels from scrap! Use your creativity and engineering skills to build something amazing from junk.",
		link: "https://docs.google.com/forms/d/1rF9Tcfvzfb-93PL9hqczykz5cIDgU2Jmc0Boe_wDMhM/edit",
		rulebook: "https://rulebook.civiljunkyard.com"
	},
	{
		id: "neonCricket",
		name: "Neon Cricket",
		img: "neon-cricket.png",
		desc: "Experience cricket like never before under neon lights! Play cricket in a unique and exciting neon-lit environment.",
		link: "https://docs.google.com/forms/d/1C4mor6QqG9qsockEzL09Bm-bX9n4FgrnMEUI6arGwzc/edit",
		rulebook: "https://rulebook.neoncricket.com"
	},
	{
		id: "armWrestling",
		name: "Arm Wrestling",
		img: "https://i.ibb.co/8gfsyP9Q/Copy-of-Copy-of-MEGALEIO-2024-7.jpg",
		desc: "Test your arm strength in a battle of endurance! Compete against others in an arm wrestling competition.",
		link: "https://register.armwrestling.com",
		rulebook: "https://rulebook.armwrestling.com"
	},
	{
		id: "clashRoyale",
		name: "Clash Royale",
		img: "https://i.ibb.co/d4BzDkfJ/Copy-of-Copy-of-MEGALEIO-2024-10.jpg",
		desc: "Strategize and battle it out in this competitive mobile game. Compete against others in Clash Royale and prove your skills.",
		link: "https://docs.google.com/forms/d/1-1Xv18xCecRYe5e3iScO1ZNJS_DmTOd1l0ttl6XSygM/edit",
		rulebook: "https://rulebook.clashroyale.com"
	},
	{
		id: "bgmi",
		name: "BGMI",
		img: "https://i.ibb.co/60httT3D/Copy-of-Copy-of-MEGALEIO-2024-9.jpg",
		desc: "Compete in the ultimate battle royale experience! Show your skills in BGMI and compete against others to be the last one standing.",
		link: "https://docs.google.com/forms/d/16jIBLNMRYZtx7xkih0C5_hFs6aAXJ9l6CZ1RQEXGow8/edit",
		rulebook: "https://rulebook.bgmi.com"
	}
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [flippedCards, setFlippedCards] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out'
    });
  }, []);

  const filteredEvents = eventsData.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <section className="relative top-20 font-[Minecraft] min-h-[calc(100vh+150px)] bg-[#1D1C1B] min-w-screen">
        <div>
        <br></br>
          <div className="text-center mb-8">
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
          {/* Updated Search Container */}
      <div className="my-5 flex justify-center items-center gap-2">
            <input
              type="text"
              className="w-[250px] p-2.5 border-2 border-blue-500 rounded bg-white text-gray-800 text-sm font-[Minecraft]"
              placeholder="Search Events..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div id="eventGrid" className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center p-5 px-5 md:px-32">
            {filteredEvents.map((event, index) => (
              <div 
                key={event.id}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="relative h-[400px] perspective-1000"
              >
                <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${flippedCards.has(event.id) ? 'rotate-y-180' : ''}`}>
                  {/* Front of card */}
                  <div className="absolute w-full h-full backface-hidden">
                    <div 
                      className="relative h-full border-2 border-blue-500 p-5 rounded-3xl text-center flex flex-col shadow-md overflow-hidden"
                      style={{
                        backgroundImage: `url(${event.img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/60"></div>

                      {/* Content */}
                      <div className={`relative z-10 flex flex-col h-full text-white ${flippedCards.has(event.id) ? 'pointer-events-none' : ''}`}>
                        <h2 className="text-2xl md:text-3xl my-2">{event.name}</h2>
                        <p className="text-sm md:text-base mb-4">{event.desc}</p>
                        <div className="mt-auto">
                          <a
                            href={event.link}
                            className={`w-4/5 mx-auto bg-green-600 border-2 border-green-600 p-2.5 mt-2 text-center text-sm rounded cursor-pointer text-white transition transform duration-200 ease-in-out hover:scale-105 block ${flippedCards.has(event.id) ? 'opacity-50' : ''}`}
                          >
                            REGISTER NOW
                          </a>
                          <button
                            className={`w-4/5 mx-auto bg-yellow-400 border-2 border-yellow-400 p-2.5 mt-2 text-center text-sm rounded cursor-pointer text-white transition transform duration-200 ease-in-out hover:scale-105 ${flippedCards.has(event.id) ? 'opacity-50' : ''}`}
                            onClick={() => handleFlip(event.id)}
                          >
                            VIEW DETAILS
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="bg-white border-2 border-blue-500 p-5 rounded-3xl text-center flex flex-col shadow-md h-full relative">
                      <button 
                        onClick={() => handleFlip(event.id)}
                        className="absolute -top-2 -right-2 text-red-500 text-3xl font-bold w-12 h-12 rounded-full 
                        hover:drop-shadow-[0px_0px_5px_rgba(255,0,0,0.8)] transition-all font-sans 
                        flex justify-center items-center bg-white border-2 border-red-500
                        hover:bg-red-50 z-20"
                      >
                        ×
                      </button>
                      <h2 className="text-2xl md:text-3xl mb-4 text-black">{event.name}</h2>
                      <div className="flex-grow overflow-y-auto px-4">
                        <p className="text-base mb-4 text-gray-700">{event.desc}</p>
                        <p className="text-sm text-gray-500 mb-4">
                          Additional details and rules can be found in the rulebook.
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 mt-auto">
                        {(event.id === "blindC" || event.id === "codeRelay") && (
                          <button
                            onClick={() => navigate('/sjcem-compiler')}
                            className="w-4/5 mx-auto bg-blue-500 border-2 border-blue-500 p-2.5 text-center text-sm rounded cursor-pointer text-white 
                            transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:bg-blue-600"
                          >
                            Open Code Editor
                          </button>
                        )}
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
              </div>
            ))}
          </div>
          <div className="h-10"></div>
        </div>
      </section>
    </>
  );
}
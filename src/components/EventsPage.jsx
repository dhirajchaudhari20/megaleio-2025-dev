import React, { useState, useEffect } from "react";

const eventsData = [
  { 
    id: "blindC", 
    name: "Blind C", 
    img: "https://i.ibb.co/Y4YtLXMk/Copy-of-Copy-of-MEGALEIO-2024-1.jpg", 
    desc: "Test your C skills in a blind coding challenge. Compete against others and prove your expertise in C programming without seeing the code.", 
    link: "https://docs.google.com/forms/d/164lPFxGkzW-JJPBBCMHVQauUuZ0_901XFBfqd0ha9EI/edit", 
    rulebook: "https://rulebook.blindc.com",
    codeEditorLink: "https://www.jdoodle.com/c-online-compiler" // Example C compiler
  },
  { 
    id: "codeRelay", 
    name: "Code Relay", 
    img: "https://i.ibb.co/Y75qdZcW/Copy-of-Copy-of-MEGALEIO-2024-4.jpg", 
    desc: "Team up and write code in a relay format! Collaborate with your team to solve coding challenges in a relay race.", 
    link: "https://docs.google.com/forms/d/18iUmtSW6bEcoXj9F-Wl-uBkbc9RGgpwyTYO6Fw0gGWc/edit", 
    rulebook: "https://rulebook.coderelay.com",
    codeEditorLink: "https://codeshare.io/" // Example real-time collaborative editor
  },
  { 
    id: "bgmi", 
    name: "BGMI", 
    img: "https://i.ibb.co/jkVHQY4/Copy-of-Copy-of-MEGALEIO-2024.jpg", 
    desc: "Compete in an intense battle royale in BGMI and prove your skills as the ultimate gamer!", 
    link: "https://docs.google.com/forms/d/1X6M45yVZ7CGy81TqW2HKTvVE1H60Ag5T5M9ByyfD3iI/edit", 
    rulebook: "https://rulebook.bgmi.com"
  }
];

const EventsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  useEffect(() => {
    const results = eventsData.filter(event =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(results);
  }, [searchQuery]);

  return (
    <div id="events" className="text-white text-center py-16">
      <h2 className="text-4xl md:text-6xl text-blue-500 font-bold uppercase mb-10">Events</h2>
      <input
        type="text"
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full md:w-2/5 p-3 rounded-lg text-black border border-blue-500 focus:outline-none mb-6"
      />

      <div id="eventGrid" className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center p-5 px-5 md:px-32">
        {filteredEvents.map((event, index) => (
          <div 
            key={event.id} 
            data-aos="fade-up"
            data-aos-delay={index * 50}
            className="bg-white border-2 border-blue-500 p-5 rounded-3xl text-center flex flex-col shadow-md text-black" 
            data-event={event.name.toLowerCase()}
          >
            <div className="h-24">
              <img className="w-full h-full rounded-3xl" src={event.img} alt={event.name} />
            </div>
            <h2 className="text-2xl md:text-3xl my-2">{event.name}</h2>
            <p className="text-sm md:text-base mb-4">{event.desc}</p>
            
            {/* Register Button */}
            <a
              href={event.link}
              className="w-4/5 mx-auto bg-green-600 border-2 border-green-600 p-2.5 mt-2 text-center text-sm rounded cursor-pointer text-white transition transform duration-200 ease-in-out hover:bg-green-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now
            </a>

            {/* Open Code Editor Button (Only for Blind C & Code Relay) */}
            {event.codeEditorLink && (
              <a
                href={event.codeEditorLink}
                className="w-4/5 mx-auto bg-blue-600 border-2 border-blue-600 p-2.5 mt-2 text-center text-sm rounded cursor-pointer text-white transition transform duration-200 ease-in-out hover:bg-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Code Editor
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;

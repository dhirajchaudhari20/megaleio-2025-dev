import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "@fontsource/press-start-2p";

const scheduleData = {
	day1: [
	  { 
		time: "10:00 - 10:30",
		date: "2025-03-07", 
		room: "Auditorium", 
		title: "INAUGURATION"
	  },
	  { 
		time: "10:30 - 23:59",
		date: "2025-03-07", 
		room: "4th Floor Labs", 
		title: "MEGAHACK 5.0"
	  },
	  { 
		time: "10:30 - 18:00",
		date: "2025-03-07", 
		room: "Auditorium", 
		title: "BRIDGE IT"
	  },
	  { 
		time: "10:30 - 18:00",
		date: "2025-03-07", 
		room: "HMS Hall", 
		title: "TECH QUIZ"
	  },
	  { 
		time: "10:30 - 18:00",
		date: "2025-03-07", 
		room: "Classroom", 
		title: "BUSINESS PLAN PRESENTATION"
	  },
	  { 
		time: "10:30 - 18:00",
		date: "2025-03-07", 
		room: "Labs First Floor", 
		title: "CODE RELAY"
	  },
	  { 
		time: "10:30 AM - 11:30 AM",
		date: "2025-03-07", 
		room: "Gaming Area", 
		title: "CLASH ROYALE"
	  },
	  { 
		time: "10:30 AM - 12:00 PM",
		date: "2025-03-07", 
		room: "Gaming Area", 
		title: "NEON CRICKET"
	  },
	  { 
		time: "10:30 AM - 1:00 PM",
		date: "2025-03-07", 
		room: "Gaming Area", 
		title: "BGMI"
	  },
	  { 
		time: "11:00 AM - 12:00 PM",
		date: "2025-03-07", 
		room: "Open Ground", 
		title: "POWER LIFTING/ARM WRESTLING"
	  }
	],
	day2: [
	  { 
		time: "00:00 - 12:00",
		date: "2025-03-08", 
		room: "4th Floor Labs", 
		title: "MEGAHACK 5.0"
	  },
	  { 
		time: "10:30 - 18:00",
		date: "2025-03-08", 
		room: "Civil Department", 
		title: "BRIDGE IT"
	  },
	  { 
		time: "10:30 - 12:30",
		date: "2025-03-08", 
		room: "Big Ground", 
		title: "DRONE DEXTERITY"
	  },
	  { 
		time: "10:30 - 12:30",
		date: "2025-03-08", 
		room: "Quadrangle A", 
		title: "ROBOMAZE"
	  },
	  { 
		time: "10:30 - 12:30",
		date: "2025-03-08", 
		room: "Quadrangle A", 
		title: "ROBO SOCCER"
	  },
	  { 
		time: "10:30 - 12:30",
		date: "2025-03-08", 
		room: "Labs First Floor", 
		title: "BLIND C"
	  },
	  { 
		time: "10:30 - 12:30",
		date: "2025-03-08", 
		room: "Auditorium", 
		title: "CIVIL JUNKYARD"
	  },
	  { 
		time: "9:30 AM - 10:30 AM",
		date: "2025-03-08", 
		room: "Gaming Area", 
		title: "CLASH ROYALE"
	  },
	  { 
		time: "9:30 AM - 11:00 AM",
		date: "2025-03-08", 
		room: "Gaming Area", 
		title: "NEON CRICKET"
	  },
	  { 
		time: "9:30 AM - 12:00 PM",
		date: "2025-03-08", 
		room: "Gaming Area", 
		title: "BGMI"
	  }
	]
  };
  

const getTimeInMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const isEventOngoing = (event) => {
  const now = new Date();
  const eventDate = new Date(event.date);
  
  if (eventDate.toDateString() !== now.toDateString()) return false;
  
  const currentTime = getTimeInMinutes(`${now.getHours()}:${now.getMinutes()}`);
  const [startTime, endTime] = event.time.split(' - ').map(t => getTimeInMinutes(t));
  
  return currentTime >= startTime && currentTime <= endTime;
};

const isEventUpcoming = (event) => {
  const now = new Date();
  const eventDate = new Date(event.date);
  
  if (eventDate < now) return false;
  
  if (eventDate.toDateString() === now.toDateString()) {
    const currentTime = getTimeInMinutes(`${now.getHours()}:${now.getMinutes()}`);
    const [startTime] = event.time.split(' - ').map(t => getTimeInMinutes(t));
    return currentTime < startTime;
  }
  
  return true;
};

const EventCard = ({ event }) => (
  <motion.div
    className="w-full md:w-3/4 bg-gray-900 border-green-400 border-4 p-10 rounded-lg mb-8 
    shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out
    hover:bg-green-700 hover:text-black mx-auto flex flex-col justify-center items-center"
    data-aos="zoom-in-up"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 25 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="text-sm md:text-lg text-yellow-400 font-bold text-center mb-2">{event.time}</div>
    <div className="text-sm text-gray-300 text-center mb-4">Room: {event.room}</div>
    <div className="text-2xl md:text-4xl mt-2 font-bold text-center text-green-400">{event.title}</div>
  </motion.div>
);

export default function Schedule() {
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const updateEvents = () => {
      const allEvents = [...scheduleData.day1, ...scheduleData.day2];
      setOngoingEvents(allEvents.filter(isEventOngoing));
      setUpcomingEvents(allEvents.filter(isEventUpcoming).slice(0, 3)); // Show next 3 upcoming events
    };

    updateEvents();
    const interval = setInterval(updateEvents, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen w-screen px-6 md:px-48 pt-24 text-green-300 font-['Press_Start_2P'] bg-[image:url('/back.gif')] bg-cover bg-center flex flex-col justify-center items-center relative overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="container max-w-screen-xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl mb-12 tracking-widest animate-pulse pb-4 text-center">
        SCHEDULE
        </h1>

        <div className="flex flex-col items-center space-y-12 w-full">
          {/* Ongoing Events Section */}
          {ongoingEvents.length > 0 && (
            <div className="w-full">
              <h2 className="text-3xl bg-green-700 p-4 rounded-md shadow-md inline-block text-center w-full">
                ONGOING EVENTS
              </h2>
              {ongoingEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          )}

          {/* Upcoming Events Section */}
          {upcomingEvents.length > 0 && (
            <div className="w-full">
              <h2 className="text-3xl bg-green-700 p-4 rounded-md shadow-md inline-block text-center w-full">
                UPCOMING EVENTS
              </h2>
              {upcomingEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          )}

          {/* Day 1 and Day 2 sections */}
          {["day1", "day2"].map((category) => (
            <div key={category} className="w-full">
              <h2 className="text-3xl bg-green-700 p-4 rounded-md shadow-md inline-block text-center w-full">
                {category.toUpperCase()} EVENTS
              </h2>
              {scheduleData[category].map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll End Animation */}
      <motion.div 
        className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
	  <div className="bottom-0 w-full h-20"></div>
    </section>
  );
}
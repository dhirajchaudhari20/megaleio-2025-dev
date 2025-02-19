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
      room: "Lab 3 & Lab 4", 
      title: "MEGAHACK"
    },
    { 
      time: "10:30 - 18:00",
      date: "2025-03-07", 
      room: "Civil Department", 
      title: "BRIDGE IT"
    },
    { 
      time: "11:00 - 12:00",
      date: "2025-03-07", 
      room: "Open Ground", 
      title: "LASER TAG"
    }
  ],
  day2: [
    { 
      time: "00:00 - 12:00",
      date: "2025-03-08", 
      room: "Lab 3 & Lab 4", 
      title: "MEGAHACK"
    },
    { 
      time: "10:00 - 18:00",
      date: "2025-03-08", 
      room: "Civil Department", 
      title: "BRIDGE IT"
    },
    { 
      time: "10:00 - 11:00",
      date: "2025-03-08", 
      room: "Mechanical Workshop", 
      title: "ROBO SOCCER"
    },
    { 
      time: "11:00 - 12:00",
      date: "2025-03-08", 
      room: "Lab 1 & Lab 2", 
      title: "CODING CONTEST"
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
    hover:bg-green-700 hover:text-black mx-auto"
    data-aos="zoom-in-up"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 25 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="text-lg text-yellow-400 font-bold text-center">{event.time}</div>
    <div className="text-sm text-gray-300 text-center mb-4">Room: {event.room}</div>
    <div className="text-4xl mt-2 font-bold text-center text-green-400">{event.title}</div>
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
          HACKATHON SCHEDULE
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
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "@fontsource/roboto"; // Using a modern sans-serif font for a serious tone

// -- SCHEDULE DATA --
const scheduleData = {

  day1: [
    {
      time: "10:30 AM",
      date: "2025-03-07",
      room: "4th Floor Labs",
      title: "MEGAHACK 5.0"
    },
    {
      time: "10:30 AM",
      date: "2025-03-07",
      room: "Small Ground",
      title: "DRONE DEXTERITY"
    },
    {
      time: "10:30 AM",
      date: "2025-03-07",
      room: "Quadrangle",
      title: "ROBOMAZE"
    },
    {
      time: "10:30 AM",
      date: "2025-03-07",
      room: "Quadrangle",
      title: "ROBO SOCCER"
    },
    {
      time: "10:30 AM",
      date: "2025-03-07",
      room: "Auditorium",
      title: "BRIDGE IT"
    },
    {
      time: "10:30 AM",
      date: "2025-03-07",
      room: "Labs First Floor",
      title: "BLIND C"
    },
    {
      time: "10:30 AM",
      date: "2025-03-07",
      room: "HMS Hall",
      title: "TECH QUIZ"
    },
    {
      time: "10:30 AM",
      date: "2025-03-07",
      room: "Classroom",
      title: "BPP"
    },
    {
      time: "10:30 AM",
      date: "2025-03-07",
      room: "Labs First Floor",
      title: "CODE RELAY"
    },
    {
      time: "10:30 AM",
      date: "2025-03-07",
      room: "Road",
      title: "CIVIL JUNKYARD"
    }
  ],
  day2: [
    {
      time: "10:30 AM",
      date: "2025-03-08",
      room: "Gaming Area",
      title: "CLASH ROYALE"
    },
    {
      time: "10:30 AM",
      date: "2025-03-08",
      room: "Gaming Area",
      title: "NEON CRICKET"
    },
    {
      time: "10:30 AM",
      date: "2025-03-08",
      room: "Gaming Area",
      title: "BGMI"
    },
    {
      time: "10:30 AM",
      date: "2025-03-08",
      room: "Open Ground",
      title: "POWER LIFTING/ARM WRESTLING"
    }
  ]
};

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
   
>>>>>>> 3a47504f52362455d703232d0fdd9e0faa54fec8

// -- HELPER FUNCTIONS --
const getTimeInMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

const isEventOngoing = (event) => {
  const now = new Date();
  const eventDate = new Date(event.date);

  // If not today, not ongoing
  if (eventDate.toDateString() !== now.toDateString()) return false;

  const currentTime = getTimeInMinutes(`${now.getHours()}:${now.getMinutes()}`);
  if (event.time.includes("-")) {
    const [startTime, endTime] = event.time.split(" - ").map(t => getTimeInMinutes(t));
    return currentTime >= startTime && currentTime <= endTime;
  } else {
    const singleTime = getTimeInMinutes(event.time.replace(" AM", "").replace(" PM", ""));
    return currentTime === singleTime;
  }
};

const isEventUpcoming = (event) => {
  const now = new Date();
  const eventDate = new Date(event.date);
  const todayStart = new Date().setHours(0, 0, 0, 0);
  
  if (eventDate < todayStart) return false;
  
  if (eventDate.toDateString() === new Date().toDateString()) {
    const currentTime = getTimeInMinutes(`${now.getHours()}:${now.getMinutes()}`);
    if (event.time.includes("-")) {
      const [startTime] = event.time.split(" - ").map(t => getTimeInMinutes(t));
      return currentTime < startTime;
    } else {
      const singleTime = getTimeInMinutes(event.time.replace(" AM", "").replace(" PM", ""));
      return currentTime < singleTime;
    }
  }
  
  return true;
};

// -- EVENT CARD COMPONENT (Serious Tone) --
const EventCard = ({ event }) => (
  <motion.div
    className="
      w-full md:w-3/4
      bg-[#1f1f1f]
      text-gray-200
      border border-gray-700
      p-6
      mb-8
      shadow-md
      hover:scale-105
      transition-transform
      duration-300
      ease-in-out
      mx-auto
      flex
      flex-col
      justify-center
      items-center
      tracking-normal
      font-sans
    "
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
<<<<<<< HEAD
    <div className="text-sm md:text-lg text-gray-400 mb-2">
      {event.time}
    </div>
    <div className="text-xs md:text-sm text-gray-500 mb-2">
      Room: {event.room}
    </div>
    <div className="text-xl md:text-2xl mt-2 text-center">
      {event.title}
    </div>
=======
    <div className="text-sm md:text-lg text-yellow-400 font-bold text-center mb-2">{event.time}</div>
    <div className="text-sm text-gray-300 text-center mb-4">Venue: {event.room}</div>
    <div className="text-2xl md:text-4xl mt-2 font-bold text-center text-green-400">{event.title}</div>
>>>>>>> 3a47504f52362455d703232d0fdd9e0faa54fec8
  </motion.div>
);

// -- MAIN COMPONENT WITH RESPONSIVE GIF BACKGROUND --
export default function SeriousSchedule() {
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const updateEvents = () => {
      const allEvents = [...scheduleData.day1, ...scheduleData.day2];
      setOngoingEvents(allEvents.filter(isEventOngoing));
      setUpcomingEvents(allEvents.filter(isEventUpcoming).slice(0, 3));
    };

    updateEvents();
    const interval = setInterval(updateEvents, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="
        min-h-screen
        w-screen
        px-6
        md:px-48
        pt-24
        relative
        overflow-hidden
        flex
        flex-col
        justify-center
        items-center
        bg-no-repeat
        bg-cover
        bg-center
        text-gray-200
      "
      style={{
        backgroundImage: "url('/agenda.gif')"
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/80" />

      <div className="container max-w-screen-xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl mb-8 tracking-wide pb-4 text-gray-300">
          SCHEDULE
        </h1>

        <div className="flex flex-col items-center space-y-12 w-full">
          {/* Ongoing Events Section */}
          {ongoingEvents.length > 0 && (
            <div className="w-full">
              <h2 className="text-2xl md:text-3xl text-gray-300 font-semibold mb-4">
                Ongoing Events
              </h2>
              {ongoingEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          )}

          {/* Upcoming Events Section */}
          {upcomingEvents.length > 0 && (
            <div className="w-full">
              <h2 className="text-2xl md:text-3xl text-gray-300 font-semibold mb-4">
                Upcoming Events
              </h2>
              {upcomingEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          )}

          {/* Day 1 and Day 2 Sections */}
          {["day1", "day2"].map((category) => (
            <div key={category} className="w-full">
              <h2 className="text-2xl md:text-3xl text-gray-300 font-semibold mb-4">
                {category.toUpperCase()} Events
              </h2>
              {scheduleData[category].map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade for visual continuity */}
      <motion.div
        className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="bottom-0 w-full h-20" />
    </section>
  );
}

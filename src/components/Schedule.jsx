import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "@fontsource/press-start-2p"; // Pixelated font for a Minecraft vibe

// -- SCHEDULE DATA --
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

// -- HELPER FUNCTIONS --
// Parses time strings and supports both 24-hour and AM/PM formats.
const parseTime = (timeStr) => {
  timeStr = timeStr.trim();
  const isAMPM = /AM|PM/i.test(timeStr);
  let [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (isAMPM) {
    modifier = modifier.toUpperCase();
    if (modifier === "PM" && hours < 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }
  }
  return hours * 60 + minutes;
};

const getTimeInMinutes = (timeStr) => parseTime(timeStr);

const isEventOngoing = (event) => {
  const now = new Date();
  const eventDate = new Date(event.date);
  if (eventDate.toDateString() !== now.toDateString()) return false;
  
  const currentTime = now.getHours() * 60 + now.getMinutes();
  if (event.time.includes("-")) {
    const [start, end] = event.time.split(" - ").map(t => getTimeInMinutes(t));
    return currentTime >= start && currentTime <= end;
  } else {
    const eventTime = getTimeInMinutes(event.time);
    return currentTime === eventTime;
  }
};

const isEventUpcoming = (event) => {
  const now = new Date();
  const eventDate = new Date(event.date);
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  
  if (eventDate.getTime() < todayStart.getTime()) return false;
  
  if (eventDate.toDateString() === now.toDateString()) {
    const currentTime = now.getHours() * 60 + now.getMinutes();
    if (event.time.includes("-")) {
      const [start] = event.time.split(" - ").map(t => getTimeInMinutes(t));
      return currentTime < start;
    } else {
      const eventTime = getTimeInMinutes(event.time);
      return currentTime < eventTime;
    }
  }
  
  return true;
};

// -- EVENT CARD COMPONENT (Minecraft Theme) --
const EventCard = ({ event }) => (
  <motion.div
    className="
      w-full md:w-3/4
      bg-[#3c3c3c]
      text-[#e2e2e2]
      border border-[#2a2a2a]
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
      tracking-wider
      font-mono
    "
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-sm md:text-lg text-[#aaffaa] font-bold text-center mb-2">
      {event.time}
    </div>
    <div className="text-sm text-[#ffffaa] text-center mb-4">
      Venue: {event.room}
    </div>
    <div className="text-2xl md:text-4xl mt-2 font-bold text-center text-[#55ff55]">
      {event.title}
    </div>
  </motion.div>
);

// -- MAIN COMPONENT WITH MINECRAFT THEME BACKGROUND --
export default function MinecraftSchedule() {
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
        text-[#e2e2e2]
      "
      style={{
        backgroundImage: "url('/minecraft_background.jpg')"
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/80" />

      <div className="container max-w-screen-xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl mb-8 tracking-wide pb-4 text-[#e2e2e2]">
          SCHEDULE
        </h1>

        <div className="flex flex-col items-center space-y-12 w-full">
          {/* Ongoing Events Section */}
          {ongoingEvents.length > 0 && (
            <div className="w-full">
              <h2 className="text-2xl md:text-3xl text-[#e2e2e2] font-semibold mb-4">
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
              <h2 className="text-2xl md:text-3xl text-[#e2e2e2] font-semibold mb-4">
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
              <h2 className="text-2xl md:text-3xl text-[#e2e2e2] font-semibold mb-4">
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

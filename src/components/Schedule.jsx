import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "@fontsource/press-start-2p";

const scheduleData = {
  day1: [
    { time: "10:00 - 10:30", room: "Auditorium", session: "INAUGURATION", speaker: "Event Team" },
    { time: "10:30 - 18:00", room: "Lab 3 & Lab 4", session: "MEGAHACK", speaker: "Hackathon Team" },
    { time: "10:30 - 18:00", room: "Civil Department", session: "BRIDGE IT", speaker: "Civil Team" },
    { time: "11:00 - 12:00", room: "Open Ground", session: "LASER TAG", speaker: "Laser Tag Team" }
  ],
  day2: [
    { time: "10:00 - 18:00", room: "Lab 3 & Lab 4", session: "MEGAHACK", speaker: "Hackathon Team" },
    { time: "10:00 - 18:00", room: "Civil Department", session: "BRIDGE IT", speaker: "Civil Team" },
    { time: "10:00 - 11:00", room: "Mechanical Workshop", session: "ROBO SOCCER", speaker: "Mechanical Team" },
    { time: "11:00 - 12:00", room: "Lab 1 & Lab 2", session: "CODING CONTEST", speaker: "Coding Team" }
  ]
};

export default function Schedule() {
  return (
    <section className="min-h-screen w-full px-12 pt-24 bg-gray-800 text-green-300 font-['Press_Start_2P'] bg-[url('/minecraft-bg.png')] bg-cover flex justify-center items-center">
      <div className="container max-w-5xl mx-auto text-center">
        <h1 className="text-5xl mb-12 tracking-widest animate-pulse border-b-4 border-green-500 pb-4">HACKATHON SCHEDULE</h1>
        
        <div className="relative flex flex-col items-center space-y-12">
          <div className="absolute w-1 bg-green-500 h-full top-0 left-1/2 transform -translate-x-1/2"></div>
          
          {/* Day 1 Schedule */}
          <h2 className="text-3xl underline bg-green-700 p-2 rounded-md shadow-md">Day 1 (March 7, 2025)</h2>
          {scheduleData.day1.map((event, index) => (
            <motion.div
              key={index}
              className="relative w-full md:w-2/3 bg-gray-900 border-green-400 border-4 p-6 rounded-lg mb-6 shadow-lg hover:scale-110 transition-transform hover:bg-green-700 hover:text-black pixelated-border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="text-lg text-yellow-400 font-bold">{event.time}</div>
              <div className="text-sm text-gray-300">Room: {event.room}</div>
              <div className="text-2xl mt-2">{event.session}</div>
              <div className="text-sm text-gray-400">Speaker: {event.speaker}</div>
              <div className="absolute left-1/2 w-6 h-6 bg-green-500 rounded-sm transform -translate-x-1/2 -top-3"></div>
            </motion.div>
          ))}
          
          {/* Day 2 Schedule */}
          <h2 className="text-3xl underline bg-green-700 p-2 rounded-md shadow-md mt-12">Day 2 (March 8, 2025)</h2>
          {scheduleData.day2.map((event, index) => (
            <motion.div
              key={index}
              className="relative w-full md:w-2/3 bg-gray-900 border-green-400 border-4 p-6 rounded-lg mb-6 shadow-lg hover:scale-110 transition-transform hover:bg-green-700 hover:text-black pixelated-border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="text-lg text-yellow-400 font-bold">{event.time}</div>
              <div className="text-sm text-gray-300">Room: {event.room}</div>
              <div className="text-2xl mt-2">{event.session}</div>
              <div className="text-sm text-gray-400">Speaker: {event.speaker}</div>
              <div className="absolute left-1/2 w-6 h-6 bg-green-500 rounded-sm transform -translate-x-1/2 -top-3"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

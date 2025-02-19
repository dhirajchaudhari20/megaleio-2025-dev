import { motion } from "framer-motion";
import "@fontsource/press-start-2p";

const scheduleData = {
  ongoing: [
    { time: "10:30 - 18:00", room: "Lab 3 & Lab 4", session: "MEGAHACK", speaker: "Hackathon Team" }
  ],
  upcoming: [
    { time: "11:00 - 11:30", room: "Auditorium", session: "Unleashing the Power of FlutterFlow", speaker: "Vivek Yadav" }
  ],
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
    <section 
      className="min-h-screen w-screen px-6 md:px-48 pt-24 text-green-300 font-['Press_Start_2P'] bg-[image:url('/public/back.gif')] bg-cover bg-center flex flex-col justify-center items-center relative overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="container max-w-screen-xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl mb-12 tracking-widest animate-pulse pb-4 text-center">
          HACKATHON SCHEDULE
        </h1>

        <div className="flex flex-col items-center space-y-12 w-full">
          {["ongoing", "upcoming", "day1", "day2"].map((category) => (
            <div key={category} className="w-full">
              <h2 className="text-3xl bg-green-700 p-4 rounded-md shadow-md inline-block text-center w-full">
                {category.toUpperCase()} EVENTS
              </h2>
              {scheduleData[category].map((event, index) => (
                <motion.div
                  key={index}
                  className="w-full md:w-3/4 bg-gray-900 border-green-400 border-4 p-10 rounded-lg mb-8 
                  shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out
                  hover:bg-green-700 hover:text-black mx-auto"
                  data-aos="zoom-in-up"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 25 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="text-lg text-yellow-400 font-bold text-center">{event.time}</div>
                  <div className="text-sm text-gray-300 text-center">Room: {event.room}</div>
                  <div className="text-2xl mt-2 font-bold text-center">{event.session}</div>
                  <div className="text-sm text-gray-400 text-center">Speaker: {event.speaker}</div>
                </motion.div>
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
      ></motion.div>
    </section>
  );
}
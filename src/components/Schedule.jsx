import { useState, useEffect } from 'react';

const scheduleData = {
  day1: [
    {
      time: "10:00 - 10:30",
      room: "Auditorium",
      session: "INAUGURATION",
      speaker: "Event Team"
    },
    {
      time: "10:30 - 18:00",
      room: "Lab 3 & Lab 4",
      session: "MEGAHACK",
      speaker: "Hackathon Team"
    },
    {
      time: "10:30 - 18:00",
      room: "Civil Department",
      session: "BRIDGE IT",
      speaker: "Civil Team"
    },
    {
      time: "11:00 - 12:00",
      room: "Open Ground",
      session: "LASER TAG",
      speaker: "Laser Tag Team"
    }
  ],
  day2: [
    {
      time: "10:00 - 18:00",
      room: "Lab 3 & Lab 4",
      session: "MEGAHACK",
      speaker: "Hackathon Team"
    },
    {
      time: "10:00 - 18:00",
      room: "Civil Department",
      session: "BRIDGE IT",
      speaker: "Civil Team"
    },
    {
      time: "10:00 - 11:00",
      room: "Mechanical Workshop",
      session: "ROBO SOCCER",
      speaker: "Mechanical Team"
    },
    {
      time: "11:00 - 12:00",
      room: "Lab 1 & Lab 2",
      session: "CODING CONTEST",
      speaker: "Coding Team"
    }
  ]
};

export default function Schedule() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const nextEventDate = new Date("March 7, 2025 10:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextEventDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative top-20 min-h-screen bg-[#1D1C1B] font-[Minecraft] p-8">
      <div className="min-w-screen mx-auto px-4 md:px-32">
        <h1 className="text-5xl font-bold text-center mb-12">Schedule</h1>

        {/* Countdown Timer */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl mb-4">Event Starts In</h2>
          <div className="flex justify-center gap-4">
            <div className="bg-green-500 p-4 rounded-lg shadow-lg">
              <span className="text-2xl">{timeLeft.days}d</span>
            </div>
            <div className="bg-green-500 p-4 rounded-lg shadow-lg">
              <span className="text-2xl">{timeLeft.hours}h</span>
            </div>
            <div className="bg-green-500 p-4 rounded-lg shadow-lg">
              <span className="text-2xl">{timeLeft.minutes}m</span>
            </div>
            <div className="bg-green-500 p-4 rounded-lg shadow-lg">
              <span className="text-2xl">{timeLeft.seconds}s</span>
            </div>
          </div>
        </div>

        {/* Day 1 Schedule */}
        <div className="mb-12">
          <h2 className="text-3xl mb-6 text-green-500">Day 1 (March 7, 2025)</h2>
          <div className="space-y-4">
            {scheduleData.day1.map((event, index) => (
              <div 
                key={index} 
                className="bg-[#2A2A2A] border-2 border-green-500 text-white p-6 rounded-lg shadow-lg hover:scale-[1.02] transition-transform duration-200"
              >
                <div className="text-xl font-bold mb-2 text-green-500">{event.time}</div>
                <div className="text-gray-400">Room: {event.room}</div>
                <div className="text-lg font-semibold text-white">{event.session}</div>
                <div className="text-gray-400">{event.speaker}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Day 2 Schedule */}
        <div className="mb-20">
          <h2 className="text-3xl mb-6 text-green-500">Day 2 (March 8, 2025)</h2>
          <div className="space-y-4">
            {scheduleData.day2.map((event, index) => (
              <div 
                key={index} 
                className="bg-[#2A2A2A] border-2 border-green-500 text-white p-6 rounded-lg shadow-lg hover:scale-[1.02] transition-transform duration-200"
              >
                <div className="text-xl font-bold mb-2 text-green-500">{event.time}</div>
                <div className="text-gray-400">Room: {event.room}</div>
                <div className="text-lg font-semibold text-white">{event.session}</div>
                <div className="text-gray-400">{event.speaker}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

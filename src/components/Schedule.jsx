import { useState, useEffect } from "react";
import "./minecraft.css"; // Make sure to add custom styles

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
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
    <section className="minecraft-bg min-h-screen p-8 text-white">
      <div className="container mx-auto">
        <h1 className="minecraft-title text-6xl text-center mb-12">Schedule</h1>

        {/* Countdown Timer */}
        <div className="countdown-container">
          <h2 className="text-3xl text-center mb-4">Event Starts In</h2>
          <div className="countdown-grid">
            {["days", "hours", "minutes", "seconds"].map((unit) => (
              <div key={unit} className="countdown-block">
                <span className="countdown-number">{timeLeft[unit]}</span>
                <span className="countdown-label">{unit.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Day 1 Schedule */}
        <div className="schedule-day">
          <h2 className="schedule-title">Day 1 (March 7, 2025)</h2>
          {scheduleData.day1.map((event, index) => (
            <div key={index} className="schedule-card">
              <div className="schedule-time">{event.time}</div>
              <div className="schedule-room">Room: {event.room}</div>
              <div className="schedule-session">{event.session}</div>
              <div className="schedule-speaker">{event.speaker}</div>
            </div>
          ))}
        </div>

        {/* Day 2 Schedule */}
        <div className="schedule-day">
          <h2 className="schedule-title">Day 2 (March 8, 2025)</h2>
          {scheduleData.day2.map((event, index) => (
            <div key={index} className="schedule-card">
              <div className="schedule-time">{event.time}</div>
              <div className="schedule-room">Room: {event.room}</div>
              <div className="schedule-session">{event.session}</div>
              <div className="schedule-speaker">{event.speaker}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import AOS from 'aos';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    AOS.init();
    const targetDate = new Date('2025-03-07T10:00:00'); // Set your event date here

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days: days.toString().padStart(2, '0'),
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#111] py-8 px-4 text-center font-[Minecraft]" data-aos="fade-up" data-aos-duration="1000">
      <h2 className="text-2xl md:text-4xl font-bold text-[#00ff00] drop-shadow-[0_0_2px_#00ff00] tracking-wider">
        Countdown to Megaleio 2025!
      </h2>
      <p className="text-sm md:text-lg mt-2 text-[#ddd]">
        Get ready for the ultimate Minecraft-themed tech fest!
      </p>

      <div className="flex justify-center flex-wrap gap-3 mt-6">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="
            min-w-[75px] md:min-w-[100px]
            border-3 border-[#00ff00]
            p-2.5 md:p-4
            text-center
            shadow-[0_0_4px_#00ff00]
            bg-black
            flex flex-col items-center
          ">
            <span className="text-2xl md:text-4xl font-bold text-[#00ff00] drop-shadow-[0_0_1px_#00ff00]">
              {value}
            </span>
            <div className="text-xs md:text-sm text-[#ddd] mt-1 uppercase">
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;

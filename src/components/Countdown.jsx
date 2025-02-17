import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const CountdownContainer = styled.div`
  background-size: cover;
  background-position: center;
  padding: 2rem 1rem;
  text-align: center;
  animation: ${fadeIn} 2s ease-in-out;
`;

const CountdownTitle = styled.h2`
  font-size: 3rem;
  font-family: 'Minecraft', sans-serif;
  color: #00ff00;
  text-shadow: 2px 2px 4px #000000;
  letter-spacing: 0.1em;
  animation: ${bounce} 2s infinite;
`;

const CountdownSubtitle = styled.p`
  font-size: 1.25rem;
  color: #d3d3d3;
  margin-top: 0.5rem;
`;

const CountdownTimer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const CountdownUnit = styled.div`
  min-width: 75px;
  border: 4px solid #00ff00;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 0 10px #00ff00;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const CountdownValue = styled.span`
  font-size: 3rem;
  font-family: 'Minecraft', sans-serif;
  color: #00ff00;
  text-shadow: 2px 2px 4px #000000;
`;

const CountdownLabel = styled.div`
  font-size: 1rem;
  color: #d3d3d3;
  margin-top: 0.25rem;
  text-transform: uppercase;
`;

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
    <CountdownContainer
    style={{ backgroundImage: 'url(https://64.media.tumblr.com/2281d82f725a860e1351a5d7db9007b5/e02ab34e2c7a472c-dc/s1280x1920/80feb3412a626eaf72b9ee0f1248e8a6ef530fd1.gif)' }}
    data-aos="fade-up"
    data-aos-duration="1000"
  >
    {/* Your content here */}

  
      <CountdownTitle>
        Countdown to Megaleio 2025!
      </CountdownTitle>
      <CountdownSubtitle>
        Get ready for the ultimate Minecraft-themed tech fest!
      </CountdownSubtitle>

      <CountdownTimer>
        {Object.entries(timeLeft).map(([unit, value]) => (
          <CountdownUnit key={unit}>
            <CountdownValue>
              {value}
            </CountdownValue>
            <CountdownLabel>
              {unit}
            </CountdownLabel>
          </CountdownUnit>
        ))}
      </CountdownTimer>
    </CountdownContainer>
  );
};

export default Countdown;
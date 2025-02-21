import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const MinecraftPreloader = ({ onFadeComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Wait for the GIF to fully play (set to 5000ms for example)
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 5000); // Change this if your GIF has a different duration

    // Remove the preloader after fade-out completes (1s fade-out)
    const removalTimer = setTimeout(() => {
      if (onFadeComplete) onFadeComplete();
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(removalTimer);
    };
  }, [onFadeComplete]);

  return (
    <div className={`preloader ${fadeOut ? 'fade-out' : ''}`}>
      <Helmet>
        <style>{`
          .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: url("https://media1.tenor.com/m/Vpp2yLz6CMEAAAAC/minecraft-loading.gif") center center / cover no-repeat;
            z-index: 9999;
            opacity: 1;
            transition: opacity 1s ease-out;
          }
          .fade-out {
            opacity: 0;
          }
        `}</style>
      </Helmet>
    </div>
  );
};

export default MinecraftPreloader;

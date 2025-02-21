import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const MinecraftPreloader = ({ onFadeComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Trigger fade out after 3 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    // Optionally call a callback after fade out completes (e.g., after 4 seconds total)
    const removalTimer = setTimeout(() => {
      if (onFadeComplete) onFadeComplete();
    }, 4000);

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

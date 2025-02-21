import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const MinecraftPreloader = ({ onFadeComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  const handleVideoEnd = () => {
    // When the video finishes, trigger fade-out animation
    setFadeOut(true);
    // After 1 second of fade-out, call the callback to unmount the preloader
    setTimeout(() => {
      if (onFadeComplete) onFadeComplete();
    }, 1000);
  };

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
            overflow: hidden;
            z-index: 9999;
            opacity: 1;
            transition: opacity 1s ease-out;
          }
          .fade-out {
            opacity: 0;
          }
          .preloader video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}</style>
      </Helmet>
      <video 
        autoPlay 
        muted 
        preload="auto"
        onEnded={handleVideoEnd}
      >
        <source src="/preloader.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default MinecraftPreloader;

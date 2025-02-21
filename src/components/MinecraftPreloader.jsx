import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const MinecraftPreloader = ({ contentLoaded, onFadeComplete }) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  useEffect(() => {
    // When both the video has ended and content is loaded, fade out the preloader
    if (videoEnded && contentLoaded) {
      setFadeOut(true);
      setTimeout(() => {
        if (onFadeComplete) onFadeComplete();
      }, 1000);
    }
  }, [videoEnded, contentLoaded, onFadeComplete]);

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
            background: black;
            opacity: 1;
            transition: opacity 1s ease-out;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .fade-out {
            opacity: 0;
          }
          .preloader video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            pointer-events: none;
          }
        `}</style>
      </Helmet>
      <video 
        autoPlay 
        playsInline 
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

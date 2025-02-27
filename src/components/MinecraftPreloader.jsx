import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

const MinecraftPreloader = ({ onFadeComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        if (onFadeComplete) onFadeComplete();
      }, 1000); // Wait for fade-out animation to complete
    }, 3000); // Show video for 3 seconds

    return () => clearTimeout(timer);
  }, [onFadeComplete]);

  return (
    <div className={`preloader ${fadeOut ? "fade-out" : ""}`}>
      <Helmet>
        <style>{`
          .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 1s ease-out;
          }
          .fade-out {
            opacity: 0;
          }
          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}</style>
      </Helmet>

      <video autoPlay muted loop>
        <source src="mainloader.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default MinecraftPreloader;

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

const MinecraftPreloader = ({ onFadeComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Ensure video has loaded before starting animation
    const videoElement = document.getElementById("preloader-video");
    if (videoElement) {
      videoElement.oncanplaythrough = () => {
        setVideoLoaded(true);
      };
    }
  }, []);

  const handleVideoEnd = () => {
    setFadeOut(true); // Start fade-out effect
    setTimeout(() => {
      if (onFadeComplete) onFadeComplete(); // Remove preloader
    }, 1000);
  };

  return (
    <div className={`preloader ${fadeOut ? "fade-out" : ""}`} style={{ display: videoLoaded ? "flex" : "none" }}>
      <Helmet>
        <style>{`
          .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: black;
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
          .preloader video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}</style>
      </Helmet>
      <video
        id="preloader-video"
        autoPlay
        muted
        playsInline
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

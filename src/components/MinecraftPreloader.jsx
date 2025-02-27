import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import LazyLoad from "react-lazyload";

const MinecraftPreloader = ({ onFadeComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const videoElement = document.getElementById("preloader-video");
    if (videoElement) {
      videoElement.onended = () => {
        setShowSpinner(true);
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              setFadeOut(true);
              setTimeout(() => {
                if (onFadeComplete) onFadeComplete();
              }, 800); // Wait for fade-out animation to complete
              return 100;
            }
            return prev + 5;
          });
        }, 60); // Simulates loading progress
      };
    }

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4); // Cycles through 0 to 3
    }, 300); // Updates dots every 300ms

    return () => {
      clearInterval(dotsInterval);
    };
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
            font-family: 'Minecraft';
          }
          .fade-out {
            opacity: 0;
          }
          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .spinner-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }
          .spinner {
            border: 6px solid rgba(0, 255, 0, 0.2);
            border-top: 6px solid #00ff00;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          .progress-text {
            color: #00ff00;
            font-size: 1.5rem;
            text-shadow: 0px 0px 10px #00ff00;
          }
          .progress-dots {
            font-size: 1.5rem;
            color: #00ff00;
            text-shadow: 0px 0px 10px #00ff00;
          }
        `}</style>
      </Helmet>

      <LazyLoad height={"100vh"} offset={100} once>
        {!showSpinner ? (
          <video id="preloader-video" autoPlay muted>
            <source src="mainloader.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="spinner-container">
            <div className="spinner"></div>
            <div className="progress-text">
              Logging into the World{".".repeat(dots)} {progress}%
            </div>
          </div>
        )}
      </LazyLoad>
    </div>
  );
};

export default MinecraftPreloader;

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

const MinecraftPreloader = ({ onFadeComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const videoElement = document.getElementById("preloader-video");
    if (videoElement) {
      videoElement.onended = () => {
        setShowSpinner(true);
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
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
        `}</style>
      </Helmet>

      {!showSpinner ? (
        <video id="preloader-video" autoPlay muted>
          <source src="mainloader.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="spinner-container">
          <div className="spinner"></div>
          <div className="progress-text">Logging into the World... {progress}%</div>
        </div>
      )}
    </div>
  );
};

export default MinecraftPreloader;

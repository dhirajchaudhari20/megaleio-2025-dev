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
      // Once the video ends, switch to spinner & fake progress
      videoElement.onended = () => {
        setShowSpinner(true);
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              setFadeOut(true);
              setTimeout(() => {
                if (onFadeComplete) onFadeComplete();
              }, 800); // Wait for fade-out
              return 100;
            }
            return prev + 5;
          });
        }, 60);
      };
    }

    // Animate the "..." in "Logging into the World..."
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 300);

    return () => {
      clearInterval(dotsInterval);
    };
  }, [onFadeComplete]);

  return (
    <div className={`preloader ${fadeOut ? "fade-out" : ""}`}>
      <Helmet>
        {/* Make sure the viewport is correct for mobile devices */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
          }
          .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 9999;
            overflow: hidden;
            transition: opacity 1s ease-out;
            font-family: 'Minecraft';
          }
          .fade-out {
            opacity: 0;
          }
          /* Video Wrapper: ensures the video can fill the entire container */
          .video-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          video {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            /* Ensures the video covers the entire container */
            min-width: 100%;
            min-height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
          }
          .spinner-container {
            position: relative; /* so it sits above the video */
            z-index: 1;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
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
            text-shadow: 0 0 10px #00ff00;
          }
          /* Responsive adjustments for smaller screens */
          @media (max-width: 600px) {
            .spinner {
              width: 40px;
              height: 40px;
              border-width: 4px;
            }
            .progress-text {
              font-size: 1rem;
            }
          }
        `}</style>
      </Helmet>

      <LazyLoad offset={100} once>
        {/* If not showing spinner, display the full-screen video */}
        {!showSpinner ? (
          <div className="video-wrapper">
            <video
              id="preloader-video"
              autoPlay
              muted
              playsInline  // helps autoplay on iOS
              preload="auto"
            >
              <source src="mainloader.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
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

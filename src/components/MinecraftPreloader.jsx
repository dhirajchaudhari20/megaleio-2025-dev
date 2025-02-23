import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

const MinecraftPreloader = ({ onFadeComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setFadeOut(true);
          setTimeout(() => {
            if (onFadeComplete) onFadeComplete();
          }, 1000);
          return 100;
        }
      });
    }, 30); // Increments progress every 30ms (~3 seconds total)
    return () => clearInterval(timer);
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
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 1s ease-out;
          }
          .fade-out {
            opacity: 0;
          }
          .loading-text {
            color: #fff;
            font-family: 'Minecraft', sans-serif;
            font-size: 2rem;
            margin-bottom: 10px;
            text-shadow: 0 0 10px #00ff00;
          }
          .sub-text {
            color: #fff;
            font-family: 'Minecraft', sans-serif;
            font-size: 1.2rem;
            margin-bottom: 20px;
            text-shadow: 0 0 8px #00ff00;
          }
          .progress-container {
            width: 80%;
            height: 20px;
            background: #333;
            border: 2px solid #00ff00;
            box-shadow: 0 0 10px #00ff00;
          }
          .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #00ff00, #007700);
            width: ${progress}%;
            transition: width 0.3s ease;
          }
          .progress-percent {
            margin-top: 10px;
            color: #fff;
            font-family: 'Minecraft', sans-serif;
            font-size: 1.2rem;
            text-shadow: 0 0 5px #00ff00;
          }
			@media (max-width: 768px) {
				.loading-text {
					text-align: center;
				}
				.sub-text {
					font-size: 1rem;
				}
				.progress-percent {
					font-size: 1rem;
				}
			}
        `}</style>
      </Helmet>
      <div className="loading-text">Welcome to Megaleio Tech Fest 2025</div>
      <div className="sub-text">Loading the experience, please wait...</div>
      <div className="progress-container">
        <div className="progress-bar" />
      </div>
      <div className="progress-percent">{progress}%</div>
    </div>
  );
};

export default MinecraftPreloader;

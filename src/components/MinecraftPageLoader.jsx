import React from "react";
import { Helmet } from "react-helmet";

const MinecraftPageLoader = () => (
  <div className="page-loader">
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>{`
        .page-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Minecraft';
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
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Helmet>
    <div className="spinner"></div>
  </div>
);

export default MinecraftPageLoader;

import React from 'react';
import { Helmet } from 'react-helmet';

const teamMembers = [
  "Steve",
  "Alex",
  "Herobrine",
  "Notch"
];

const TeamCards = () => {
  return (
    <div>
      <Helmet>
        {/* Google Font for a pixelated, Minecraft feel */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" 
          rel="stylesheet" 
        />
        <style>{`
          body {
            margin: 0;
            padding: 20px;
            background-color: #1d1d1d;
            font-family: 'Press Start 2P', cursive;
            color: #fff;
          }
          h1 {
            text-align: center;
            margin-bottom: 40px;
            color: #39ff14;
          }
          .card-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }
          .card {
            background-color: #333;
            border: 4px solid #39ff14;
            padding: 20px;
            width: 220px;
            height: 260px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
            box-shadow: 0 0 0 4px #1d1d1d, 0 4px 0 0 #39ff14;
            transition: transform 0.2s;
          }
          .card:hover {
            transform: scale(1.05);
          }
          .card::before {
            content: "";
            position: absolute;
            top: -8px;
            left: -8px;
            right: -8px;
            bottom: -8px;
            border: 4px dashed #39ff14;
            pointer-events: none;
          }
          .card h3 {
            margin: 0;
            font-size: 16px;
          }
        `}</style>
      </Helmet>
      
      <h1>Minecraft Team Cards</h1>
      <div className="card-container">
        {teamMembers.map((name, index) => (
          <div key={index} className="card">
            <h3>{name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCards;

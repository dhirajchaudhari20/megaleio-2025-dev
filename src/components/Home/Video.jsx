import React from "react";
import cloudsVideo from "../../assets/stranger-things-clouds.mp4";

const Video = () => {
  return (
    <div className="relative">
      <div className="bg-black w-full h-[60svh] md:h-screen sticky top-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={cloudsVideo} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Video;

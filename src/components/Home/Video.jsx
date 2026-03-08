import React from "react";

const Video = () => {
  return (
    <div className="relative">
      <div className="bg-black w-full h-[60svh] md:h-screen sticky top-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/stranger-things-clouds-opt.webm" type="video/webm" />
          <source src="/video/stranger-things-clouds-opt.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Video;

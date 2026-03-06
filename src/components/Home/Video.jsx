import React from "react";
const Video = () => {
  return (
    <div>
      <div className="bg-zinc-800 w-full h-screen  sticky overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dor2qddak/video/upload/v1771482653/bg_r9ig9w.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

export default Video;

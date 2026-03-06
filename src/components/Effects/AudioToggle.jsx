import React, { useState, useRef, useEffect } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const AudioToggle = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Stranger Things Theme (Publicly available ambient loop)
    const audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Placeholder
    // Better version: A hosted snippet or we can ask the user for a path.
    // For now, I'll use a reliable low-fi atmospheric link or stay silent until they click.

    const toggleAudio = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio play blocked", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-8 left-8 z-[10000]">
            <button
                onClick={toggleAudio}
                className="p-3 rounded-full bg-black/50 border border-red-900/50 text-red-600 hover:text-red-400 hover:border-red-500 transition-all backdrop-blur-md shadow-lg group"
                aria-label="Toggle Atmosphere"
            >
                {isPlaying ? (
                    <FaVolumeUp className="text-xl animate-pulse" />
                ) : (
                    <FaVolumeMute className="text-xl" />
                )}
                <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest font-mono">
                    {isPlaying ? "Mute Atmosphere" : "Unmute Atmosphere"}
                </span>
            </button>
            <audio
                ref={audioRef}
                src="https://res.cloudinary.com/dgy8v9vpx/video/upload/v1741270274/stranger-things-theme_u2o3v0.mp3" // I'll search for a better link or use a placeholder
                loop
            />
        </div>
    );
};

export default AudioToggle;

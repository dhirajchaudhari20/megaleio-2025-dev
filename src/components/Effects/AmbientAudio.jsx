import React, { useEffect, useRef, useState } from "react";
// Placeholder audio for atmospheric drone
const DRONE_AUDIO_URL = "https://cdn.pixabay.com/download/audio/2022/10/25/audio_2d8636babe.mp3?filename=dark-ambient-drone-25441.mp3"; // Or any other suitable dark drone

const AmbientAudio = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // We create the audio object
        const audio = new Audio(DRONE_AUDIO_URL);
        audio.loop = true;
        audio.volume = 0.4; // subtle background
        audioRef.current = audio;

        const handleFirstInteraction = () => {
            if (!isPlaying) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(err => {
                    console.warn("Audio autoplay blocked or failed:", err);
                });
            }
            // Remove listeners once interacting
            window.removeEventListener("click", handleFirstInteraction);
            window.removeEventListener("scroll", handleFirstInteraction);
            window.removeEventListener("keydown", handleFirstInteraction);
        };

        window.addEventListener("click", handleFirstInteraction);
        window.addEventListener("scroll", handleFirstInteraction);
        window.addEventListener("keydown", handleFirstInteraction);

        return () => {
            window.removeEventListener("click", handleFirstInteraction);
            window.removeEventListener("scroll", handleFirstInteraction);
            window.removeEventListener("keydown", handleFirstInteraction);
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, [isPlaying]);

    return null; // Invisible component
};

export default AmbientAudio;

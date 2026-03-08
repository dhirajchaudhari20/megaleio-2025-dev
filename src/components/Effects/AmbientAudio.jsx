import React, { useEffect, useRef, useState } from "react";
// Using a reliable non-expiring public URL for testing drone ambient audio
const DRONE_AUDIO_URL = "https://raw.githubusercontent.com/rafaelreis-hotmart/Audio-Sample-files/master/sample.mp3"; // generic sample to bypass 403

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

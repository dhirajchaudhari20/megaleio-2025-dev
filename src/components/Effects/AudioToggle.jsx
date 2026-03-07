import React, { useState, useRef, useEffect } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const AudioToggle = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const playerRef = useRef(null);
    const [isApiReady, setIsApiReady] = useState(false);

    useEffect(() => {
        // Load YouTube IFrame API
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                createPlayer();
            };
        } else {
            createPlayer();
        }

        function createPlayer() {
            playerRef.current = new window.YT.Player('youtube-audio-player', {
                height: '0',
                width: '0',
                videoId: '-RcPZdihrp4',
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    start: 6,
                    loop: 1,
                    playlist: '-RcPZdihrp4'
                },
                events: {
                    onReady: (event) => {
                        setIsApiReady(true);
                        // Interaction listener to bypass browser autoplay blocks
                        const startAudio = () => {
                            if (isPlaying && playerRef.current && typeof playerRef.current.playVideo === 'function') {
                                playerRef.current.playVideo();
                                // Fade in volume
                                playerRef.current.setVolume(0);
                                let vol = 0;
                                const fadeInterval = setInterval(() => {
                                    vol += 10;
                                    if (vol >= 100) {
                                        playerRef.current.setVolume(100);
                                        clearInterval(fadeInterval);
                                    } else {
                                        playerRef.current.setVolume(vol);
                                    }
                                }, 150);
                            }
                            window.removeEventListener('click', startAudio);
                            window.removeEventListener('touchstart', startAudio);
                            window.removeEventListener('scroll', startAudio);
                        };

                        window.addEventListener('click', startAudio);
                        window.addEventListener('touchstart', startAudio);
                        window.addEventListener('scroll', startAudio);
                    },
                }
            });
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [isPlaying]);

    const toggleAudio = () => {
        if (!isApiReady) return;

        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
            playerRef.current.setVolume(100);
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
            <div id="youtube-audio-player" className="hidden" />
        </div>
    );
};

export default AudioToggle;

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollTentacle = () => {
    const pathRef = useRef(null);
    const glowRef = useRef(null);

    useEffect(() => {
        const path = pathRef.current;
        const glow = glowRef.current;
        if (!path || !glow || window.innerWidth < 1024) return; // Only for desktop spacing

        // Calculate total length of the organic path
        const length = path.getTotalLength();

        // Hide the paths initially by pushing the dash offset
        gsap.set([path, glow], {
            strokeDasharray: length,
            strokeDashoffset: length
        });

        // Use ScrollTrigger to draw the line down as the user scrolls the body
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5, // 1.5 second lag for cinematic smoothness
                }
            });

            tl.to([path, glow], {
                strokeDashoffset: 0,
                ease: "none"
            });
        });

        return () => ctx.revert();
    }, []);

    // If mobile, don't show to save processing and clutter
    if (window.innerWidth < 1024) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none flex justify-center w-full h-full overflow-hidden opacity-60 mix-blend-screen">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 1000"
                preserveAspectRatio="none"
                className="h-[300vh] w-[200px]" // Vastly taller than viewport to scroll through
            >
                {/* Core inner hot vein */}
                <path
                    ref={pathRef}
                    d="M 100 0 
                       C 80 100, 130 150, 100 250 
                       C 60 350, 140 450, 90 550 
                       C 40 650, 160 750, 110 850 
                       C 70 950, 100 1000, 100 1000"
                    fill="none"
                    stroke="#ffcccc"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="animate-pulse"
                />

                {/* Thick glowing fleshy outer layer (The Vecna Tentacle) */}
                <path
                    ref={glowRef}
                    d="M 100 0 
                       C 80 100, 130 150, 100 250 
                       C 60 350, 140 450, 90 550 
                       C 40 650, 160 750, 110 850 
                       C 70 950, 100 1000, 100 1000"
                    fill="none"
                    stroke="#dc143c"
                    strokeWidth="8"
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 15px rgba(220, 20, 60, 0.9)) blur(3px)" }}
                />
            </svg>
        </div>
    );
};

export default ScrollTentacle;

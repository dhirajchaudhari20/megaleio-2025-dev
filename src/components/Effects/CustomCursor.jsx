import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const flashlightRef = useRef(null);

    useEffect(() => {
        const onMouseMove = (e) => {
            const { clientX, clientY } = e;

            // Update small cursor point
            gsap.to(cursorRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: "power2.out",
            });

            // Update large flashlight overlay
            gsap.to(flashlightRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.5,
                ease: "power3.out",
            });
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    return (
        <>
            {/* 🌑 Dark Overlay blocker (Global) */}
            <div
                className="fixed inset-0 pointer-events-none z-[9997] bg-black/15"
                style={{ mixBlendMode: 'multiply' }}
            />

            {/* 🔦 Flashlight Effect */}
            <div
                ref={flashlightRef}
                className="fixed top-0 left-0 w-[100vmax] h-[100vmax] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9998]"
                style={{
                    background: "radial-gradient(circle, transparent 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.95) 100%)",
                }}
            />

            {/* 🔴 Small Red Glow Cursor */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[9999]"
                style={{
                    background: "#DC143C",
                    boxShadow: "0 0 15px #DC143C, 0 0 30px #DC143C",
                }}
            />
        </>
    );
};

export default CustomCursor;

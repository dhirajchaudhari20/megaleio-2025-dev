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

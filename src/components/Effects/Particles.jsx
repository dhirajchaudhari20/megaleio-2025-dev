import React, { useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Particles = () => {
    const particleCount = 40;

    const particles = useMemo(() => {
        return Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            size: Math.random() * 4 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            z: Math.random() * 600 - 300,
            opacity: Math.random() * 0.5 + 0.2,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
            color: Math.random() > 0.6 ? "rgba(255, 60, 60, 0.4)" : "rgba(255, 200, 150, 0.3)",
        }));
    }, []);

    useGSAP(() => {
        gsap.to(".upside-down-particle", {
            y: "-130vh",
            x: "random(-100, 100)",
            z: "random(-200, 200)",
            rotation: "random(0, 720)",
            duration: "random(20, 40)",
            repeat: -1,
            ease: "none",
            stagger: {
                amount: 15,
                from: "random",
            },
        });
    });

    return (
        <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden" style={{ perspective: "1500px" }}>
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="upside-down-particle absolute rounded-full blur-[0.5px]"
                    style={{
                        width: p.size,
                        height: p.size * (1 + Math.random()), // Slightly irregular shapes like spores
                        left: p.left,
                        top: "120vh",
                        opacity: p.opacity,
                        backgroundColor: p.color,
                        transform: `translateZ(${p.z}px)`,
                        boxShadow: `0 0 8px ${p.color}`,
                    }}
                />
            ))}
        </div>
    );
};

export default Particles;

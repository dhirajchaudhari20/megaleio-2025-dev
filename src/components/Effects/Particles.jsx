import React, { useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Particles = () => {
    const particleCount = 40;

    const particles = useMemo(() => {
        return Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            size: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
        }));
    }, []);

    useGSAP(() => {
        gsap.to(".upside-down-particle", {
            y: "-100vh",
            x: "random(-20, 20)",
            rotation: "random(0, 360)",
            duration: "random(15, 30)",
            repeat: -1,
            ease: "none",
            stagger: {
                amount: 10,
                from: "random",
            },
        });
    });

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="upside-down-particle absolute rounded-full bg-white/20 blur-[1px]"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: p.left,
                        top: "110vh",
                        opacity: p.opacity,
                        boxShadow: `0 0 5px rgba(255,255,255,0.2)`,
                    }}
                />
            ))}
        </div>
    );
};

export default Particles;

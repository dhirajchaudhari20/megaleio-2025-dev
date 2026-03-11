import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }) => {
    const [phase, setPhase] = useState("booting"); // "booting" | "3d-reveal" | "done"
    const [bootLines, setBootLines] = useState([]);
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const sequence = [
            { text: "HAWKINS NATIONAL LABORATORY BIOS v4.01", delay: 100 },
            { text: "MEMORY CHECK: 64000K OK", delay: 400 },
            { text: "LOADING SYS.DRV...", delay: 800 },
            { text: "CONNECTING TO MAINFRAME [192.168.0.11]...", delay: 1200 },
            { text: "CONNECTION ESTABLISHED.", delay: 1800 },
            { text: "ENTER PASSWORD: _", delay: 2100 },
            { text: "ENTER PASSWORD: E", delay: 2400 },
            { text: "ENTER PASSWORD: EL", delay: 2500 },
            { text: "ENTER PASSWORD: ELE", delay: 2600 },
            { text: "ENTER PASSWORD: ELEV", delay: 2700 },
            { text: "ENTER PASSWORD: ELEVE", delay: 2800 },
            { text: "ENTER PASSWORD: ELEVEN", delay: 2900 },
            { text: "PASSWORD ACCEPTED. INITIATING PROTOCOL MIND_FLAYER", delay: 3400, color: "text-green-500" },
            { text: "WARNING: ACCESS VIOLATION - UNAUTHORIZED ENTITY DETECTED", delay: 4000, error: true },
            { text: "SYSTEM FAILURE. BREACH IMMINENT.", delay: 4200, error: true },
        ];

        const timeouts = sequence.map((item, index) => {
            return setTimeout(() => {
                if (item.text.startsWith("ENTER PASSWORD:")) {
                    // Update the last line instead of adding a new one
                    setBootLines(prev => {
                        const newLines = [...prev];
                        const lastIndex = newLines.length - 1;
                        if (lastIndex >= 0 && newLines[lastIndex].text.startsWith("ENTER PASSWORD:")) {
                            newLines[lastIndex] = item;
                            return newLines;
                        }
                        return [...prev, item];
                    });
                } else {
                    setBootLines(prev => [...prev, item]);
                }

                if (item.error) {
                    setIsGlitching(true);
                }
            }, item.delay);
        });

        const revealTimer = setTimeout(() => {
            setPhase("3d-reveal");
        }, 5000);

        const completeTimer = setTimeout(() => {
            setPhase("done");
            if (onComplete) onComplete();
        }, 8500); // 5000 + 3500 for reveal

        return () => {
            timeouts.forEach(clearTimeout);
            clearTimeout(revealTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    // Seeded particles with depth
    const particles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        depth: Math.random() * 500 - 250, // Z-depth
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 2,
    }));

    return (
        <AnimatePresence>
            {phase !== "done" && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                        transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
                    }}
                    className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
                    style={{ perspective: "1000px" }}
                >
                    {phase === "booting" && (
                        <div className={`w-full h-full p-8 md:p-16 flex flex-col items-start justify-start relative ${isGlitching ? 'glitch-text skew-x-2 filter contrast-125 saturate-150' : ''}`}>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,10,0,0.8)_100%)] pointer-events-none z-10" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-20 pointer-events-none opacity-50" />

                            <div className="relative z-30 font-mono text-[11px] md:text-sm tracking-widest leading-loose uppercase">
                                {bootLines.map((line, i) => (
                                    <div key={i} className={`${line.error ? "text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)] font-bold" : (line.color || "text-[#33ff00] drop-shadow-[0_0_5px_rgba(51,255,0,0.5)]")} ${i === bootLines.length - 1 && !line.error ? "animate-pulse" : ""}`}>
                                        {line.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {phase === "3d-reveal" && (
                        <>
                            {/* 3D Spores/Particles System */}
                            <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
                                {particles.map((p) => (
                                    <motion.div
                                        key={p.id}
                                        initial={{
                                            opacity: 0,
                                            z: p.depth - 100,
                                            x: `${p.x}vw`,
                                            y: "110vh"
                                        }}
                                        animate={{
                                            opacity: [0, 0.5, 0],
                                            z: p.depth + 100,
                                            y: "-10vh",
                                        }}
                                        transition={{
                                            duration: p.duration,
                                            repeat: Infinity,
                                            ease: "linear",
                                            delay: p.delay
                                        }}
                                        className="absolute bg-red-500/30 rounded-full blur-[1px]"
                                        style={{
                                            width: `${p.size}px`,
                                            height: `${p.size}px`,
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="relative flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>
                                {/* The 3D Cinematic "MEGALEIO" */}
                                <div className="flex items-center justify-center space-x-1 md:space-x-3">
                                    {["M", "E", "G", "A", "L", "E", "I", "O"].map((letter, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{
                                                opacity: 0,
                                                z: -200,
                                                rotateY: -90,
                                                filter: "blur(20px)"
                                            }}
                                            animate={{
                                                opacity: 1,
                                                z: 0,
                                                rotateY: 0,
                                                filter: "blur(0px)",
                                                textShadow: [
                                                    "0 0 10px rgba(220,20,60,0.4)",
                                                    "0 0 30px rgba(220,20,60,0.9)",
                                                    "0 0 15px rgba(220,20,60,0.4)"
                                                ]
                                            }}
                                            transition={{
                                                duration: 1.2,
                                                delay: i * 0.12 + 0.4,
                                                ease: "easeOut",
                                                textShadow: {
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }
                                            }}
                                            style={{ transformStyle: "preserve-3d" }}
                                            className="relative"
                                        >
                                            <span className="text-6xl md:text-9xl font-bold font-['Cinzel'] text-[#dc143c] tracking-tighter drop-shadow-[0_0_20px_rgba(0,0,0,1)]">
                                                {letter}
                                            </span>

                                            {/* Pseudo-3D Reflection/Edge Glow */}
                                            <motion.span
                                                animate={{ opacity: [0.1, 0.4, 0.1] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                className="absolute inset-0 text-6xl md:text-9xl font-bold font-['Cinzel'] text-white/5 blur-[2px] translate-z-[1px]"
                                            >
                                                {letter}
                                            </motion.span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Flickering/Glitching Location Tagline */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: [0, 1, 0.8, 1, 0.3, 1],
                                        y: 0,
                                        skewX: [0, -5, 5, 0, -2, 0]
                                    }}
                                    transition={{
                                        opacity: { duration: 2, delay: 0.5, times: [0, 0.1, 0.2, 0.4, 0.6, 1] },
                                        y: { duration: 1, delay: 0.5 },
                                        skewX: { duration: 0.5, delay: 1.5, repeat: Infinity, repeatDelay: 2 }
                                    }}
                                    className="mt-8 flex flex-col items-center gap-2"
                                >
                                    <span className="text-xl md:text-2xl font-bold font-['Courier_New'] text-red-700/80 tracking-[0.6em] uppercase">
                                        2026 · HAWKINS
                                    </span>
                                    <span className="text-[10px] md:text-xs font-['Courier_New'] text-red-900/60 tracking-[0.8em] font-black">
                                        TRANSMISSION INITIALIZED
                                    </span>
                                </motion.div>

                                {/* Experimental "Gate" Opening Light (Expands on exit) */}
                                <motion.div
                                    className="absolute -z-10 w-32 h-32 bg-red-600 rounded-full blur-[100px] opacity-20"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.2, 0.4, 0.2]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                            </div>

                            {/* Progress Bar (Cinematic Scanline Style) */}
                            <div className="absolute bottom-24 w-64 h-px bg-red-950/20 overflow-hidden">
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ duration: 2.5, ease: "linear" }}
                                    className="w-full h-full bg-red-600 shadow-[0_0_15px_rgba(220,20,60,1)]"
                                />
                            </div>

                            {/* Heavy Atmospheric Vignette */}
                            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.95)_100%)]" />

                            {/* Dimensional Tear Overlay (Flicker) */}
                            <motion.div
                                animate={{ opacity: [0, 0.05, 0, 0.08, 0] }}
                                transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 1 }}
                                className="absolute inset-0 bg-red-600/10 pointer-events-none mix-blend-overlay"
                            />
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;

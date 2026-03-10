import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import titleImg from '../../assets/title/Title.png';

const TitleSponsor = () => {
    const containerRef = useRef(null);

    // Generating random particles for the upside down floating spores effect
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 1,
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
    }));

    return (
        <section
            ref={containerRef}
            className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden z-20"
            style={{
                background: 'linear-gradient(to bottom, #050505 0%, rgba(20, 0, 0, 0.8) 50%, #050505 100%)',
            }}
        >
            {/* Stranger Things "Upside Down" Vines Top */}
            <div
                className="absolute top-0 left-0 w-full h-16 pointer-events-none opacity-40"
                style={{
                    background: 'radial-gradient(ellipse at top, rgba(139, 0, 0, 0.4) 0%, transparent 70%)',
                    borderTop: '1px solid rgba(220, 20, 60, 0.3)',
                    boxShadow: '0 0 30px rgba(180, 0, 20, 0.5) inset'
                }}
            />

            {/* Background Animated Pulse/Glow */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, rgba(140, 10, 10, 0.15) 0%, transparent 60%)",
                    filter: "blur(20px)"
                }}
            />

            {/* Floating Spores / Particles (Upside Down Vibe) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ y: "110%", x: "-20%", opacity: 0 }}
                        animate={{
                            y: "-110%",
                            x: "20%",
                            opacity: [0, 0.8, 0],
                            rotate: 360
                        }}
                        transition={{
                            duration: p.duration,
                            delay: p.delay,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute rounded-full bg-red-500/30 blur-[1px]"
                        style={{
                            width: p.size,
                            height: p.size,
                            left: p.left,
                            boxShadow: '0 0 8px 2px rgba(220, 20, 60, 0.4)'
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center gap-8 w-full max-w-5xl px-4"
            >
                {/* Cinematic Heading */}
                <div className="flex items-center gap-4 md:gap-8 w-full justify-center">
                    <div className="h-[2px] flex-1 max-w-[100px] md:max-w-[200px] bg-gradient-to-r from-transparent to-red-600/80 rounded-full shadow-[0_0_10px_rgba(220,20,60,0.8)]"></div>
                    <h2
                        className="text-red-500 tracking-[0.4em] font-cinzel text-lg md:text-2xl lg:text-3xl uppercase font-bold text-center"
                        style={{
                            textShadow: '0 0 10px rgba(220, 20, 60, 0.8), 0 0 20px rgba(220, 20, 60, 0.4), 0 0 30px rgba(139, 0, 0, 0.6)'
                        }}
                    >
                        Title Sponsor
                    </h2>
                    <div className="h-[2px] flex-1 max-w-[100px] md:max-w-[200px] bg-gradient-to-l from-transparent to-red-600/80 rounded-full shadow-[0_0_10px_rgba(220,20,60,0.8)]"></div>
                </div>

                {/* Sponsor Logo Container with Heavy Stranger Things Glow & Float */}
                <motion.div
                    animate={{
                        y: [-8, 8, -8],
                        rotateX: [2, -2, 2],
                        rotateY: [-2, 2, -2]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    className="relative group w-full max-w-[280px] md:max-w-[400px] perspective-1000"
                >
                    {/* Intense Outer Glow Behind Logo Container */}
                    <div className="absolute inset-[-20px] bg-red-600/20 blur-[40px] rounded-full group-hover:bg-red-500/40 transition-all duration-500 opacity-70 group-hover:opacity-100 animate-pulse"></div>

                    {/* Main Logo Card */}
                    <div className="relative bg-black/40 p-8 md:p-12 rounded-2xl border border-red-900/40 backdrop-blur-md shadow-[0_0_30px_rgba(139,0,0,0.3)_inset,0_0_20px_rgba(0,0,0,0.8)] overflow-hidden group-hover:border-red-500/50 transition-colors duration-500">

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600/60 rounded-tl"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600/60 rounded-tr"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600/60 rounded-bl"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600/60 rounded-br"></div>

                        {/* Sweep Light Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] group-hover:animate-[sweep_1.5s_ease-in-out]"></div>

                        {/* The Logo Itself - Applying filters to make it fit the dark/red theme */}
                        <motion.img
                            src={titleImg}
                            alt="Title Sponsor Trinity"
                            className="w-full h-auto object-contain relative z-10 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                            style={{
                                filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 25px rgba(220, 20, 60, 0.8)) brightness(1.2)'
                            }}
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Bottom Border gradient */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-900/60 to-transparent shadow-[0_-2px_10px_rgba(220,20,60,0.4)]"></div>

            <style jsx>{`
        @keyframes sweep {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(150%) skewX(-15deg); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
        </section>
    );
};

export default TitleSponsor;

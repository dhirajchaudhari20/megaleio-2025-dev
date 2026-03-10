import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import titleImg from '../../assets/title/trinity_new_logo.jpg';
import nexacraftImg from '../../assets/title/nexacraft.png';

const TitleSponsor = () => {
    const containerRef = useRef(null);
    const [showVideo, setShowVideo] = useState(false);

    // Defer heavy video load slightly for performance
    useEffect(() => {
        const timer = setTimeout(() => setShowVideo(true), 500);
        return () => clearTimeout(timer);
    }, []);

    // Generating random particles for the upside down floating spores effect
    const particles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        size: Math.random() * 5 + 1.5,
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
    }));

    return (
        <section
            ref={containerRef}
            className="relative w-full py-28 md:py-40 flex flex-col items-center justify-center overflow-hidden z-20 border-t border-b border-red-900/40"
            style={{
                background: '#050505',
            }}
        >
            {/* Live Stranger Things Video Wallpaper */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
                {showVideo && (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            filter: "sepia(1) hue-rotate(-50deg) saturate(4) brightness(0.35) contrast(1.5) blur(2px)",
                        }}
                    >
                        <source src="/video/stranger-things-clouds-opt.webm" type="video/webm" />
                        <source src="/video/stranger-things-clouds-opt.mp4" type="video/mp4" />
                    </video>
                )}
            </div>

            {/* Deep Shadow Gradient Overlays for blending with sections */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />

            {/* Floating Spores / Particles (Upside Down Vibe) */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ y: "110%", x: "-20%", opacity: 0 }}
                        animate={{
                            y: "-110%",
                            x: "20%",
                            opacity: [0, 0.9, 0],
                            rotate: 360
                        }}
                        transition={{
                            duration: p.duration,
                            delay: p.delay,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute rounded-full bg-red-600/60 blur-[1px]"
                        style={{
                            width: p.size,
                            height: p.size,
                            left: p.left,
                            boxShadow: '0 0 10px 3px rgba(220, 20, 60, 0.6)'
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center gap-10 w-full max-w-7xl px-4"
            >
                {/* Cinematic Heading */}
                <div className="flex items-center gap-4 md:gap-8 w-full justify-center">
                    <div className="h-[2px] flex-1 max-w-[100px] md:max-w-[200px] bg-gradient-to-r from-transparent to-red-600/90 rounded-full shadow-[0_0_15px_rgba(220,20,60,0.9)]"></div>
                    <h2
                        className="text-red-500 tracking-[0.3em] md:tracking-[0.5em] font-cinzel text-xl md:text-3xl lg:text-4xl uppercase font-extrabold text-center drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] whitespace-nowrap"
                        style={{
                            textShadow: '0 0 15px rgba(220, 20, 60, 0.9), 0 0 30px rgba(220, 20, 60, 0.6), 0 0 45px rgba(139, 0, 0, 0.8)'
                        }}
                    >
                        Our Sponsors
                    </h2>
                    <div className="h-[2px] flex-1 max-w-[100px] md:max-w-[200px] bg-gradient-to-l from-transparent to-red-600/90 rounded-full shadow-[0_0_15px_rgba(220,20,60,0.9)]"></div>
                </div>

                {/* Sponsors Container (Flex Row on Desktop, Column on Mobile) */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 lg:gap-24 w-full mt-6">

                    {/* Title Sponsor - Trinity */}
                    <div className="flex flex-col items-center gap-4 w-full md:w-1/2 max-w-[400px]">
                        <h3 className="text-red-400 font-cinzel text-lg md:text-xl tracking-widest uppercase text-center font-bold drop-shadow-[0_0_10px_rgba(220,20,60,0.8)] mb-2">Title Sponsor</h3>
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            whileHover={{ scale: 1.05, rotateZ: [0, -1, 1, 0], transition: { duration: 0.4, ease: "easeOut" } }}
                            className="relative group w-full"
                        >
                            <div className="absolute inset-[-20px] md:inset-[-30px] bg-red-600/30 blur-[40px] md:blur-[50px] rounded-full group-hover:bg-red-500/60 group-hover:blur-[60px] transition-all duration-500 opacity-80 animate-pulse"></div>

                            <div className="relative bg-black/60 p-8 md:p-12 rounded-3xl border-2 border-red-900/60 backdrop-blur-xl shadow-[0_0_40px_rgba(180,0,0,0.4)_inset,0_0_30px_rgba(0,0,0,0.9)] overflow-hidden group-hover:border-red-500/80 group-hover:shadow-[0_0_60px_rgba(220,20,60,0.4)_inset,0_0_40px_rgba(0,0,0,0.9)] transition-all duration-500 flex items-center justify-center min-h-[200px]">
                                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-red-600/80 rounded-tl group-hover:border-red-400 group-hover:shadow-[0_0_10px_rgba(255,100,100,0.8)] transition-all"></div>
                                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-red-600/80 rounded-tr group-hover:border-red-400 group-hover:shadow-[0_0_10px_rgba(255,100,100,0.8)] transition-all"></div>
                                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-red-600/80 rounded-bl group-hover:border-red-400 group-hover:shadow-[0_0_10px_rgba(255,100,100,0.8)] transition-all"></div>
                                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-red-600/80 rounded-br group-hover:border-red-400 group-hover:shadow-[0_0_10px_rgba(255,100,100,0.8)] transition-all"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:animate-[sweep_1s_ease-in-out]"></div>

                                <a href="https://www.trinitystudyabroad.com/" target="_blank" rel="noopener noreferrer" className="relative z-10 block cursor-pointer w-full">
                                    <motion.img
                                        src={titleImg}
                                        alt="Trinity Study Abroad - Title Sponsor"
                                        className="w-full h-auto object-contain filter hover:scale-105 transition-transform duration-300 max-h-[120px]"
                                        style={{
                                            filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 35px rgba(220, 20, 60, 0.9)) brightness(1.3) contrast(1.1)'
                                        }}
                                    />
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Co Sponsor - Nexacraft */}
                    <div className="flex flex-col items-center gap-4 w-full md:w-1/2 max-w-[400px]">
                        <h3 className="text-red-400 font-cinzel text-lg md:text-xl tracking-widest uppercase text-center font-bold drop-shadow-[0_0_10px_rgba(220,20,60,0.8)] mb-2">Co-Sponsor</h3>
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            whileHover={{ scale: 1.05, rotateZ: [0, -1, 1, 0], transition: { duration: 0.4, ease: "easeOut" } }}
                            className="relative group w-full"
                        >
                            <div className="absolute inset-[-20px] md:inset-[-30px] bg-red-600/30 blur-[40px] md:blur-[50px] rounded-full group-hover:bg-red-500/60 group-hover:blur-[60px] transition-all duration-500 opacity-80 animate-pulse" style={{ animationDelay: '0.5s' }}></div>

                            <div className="relative bg-black/60 p-8 md:p-12 rounded-3xl border-2 border-red-900/60 backdrop-blur-xl shadow-[0_0_40px_rgba(180,0,0,0.4)_inset,0_0_30px_rgba(0,0,0,0.9)] overflow-hidden group-hover:border-red-500/80 group-hover:shadow-[0_0_60px_rgba(220,20,60,0.4)_inset,0_0_40px_rgba(0,0,0,0.9)] transition-all duration-500 flex items-center justify-center min-h-[200px]">
                                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-red-600/80 rounded-tl group-hover:border-red-400 group-hover:shadow-[0_0_10px_rgba(255,100,100,0.8)] transition-all"></div>
                                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-red-600/80 rounded-tr group-hover:border-red-400 group-hover:shadow-[0_0_10px_rgba(255,100,100,0.8)] transition-all"></div>
                                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-red-600/80 rounded-bl group-hover:border-red-400 group-hover:shadow-[0_0_10px_rgba(255,100,100,0.8)] transition-all"></div>
                                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-red-600/80 rounded-br group-hover:border-red-400 group-hover:shadow-[0_0_10px_rgba(255,100,100,0.8)] transition-all"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:animate-[sweep_1s_ease-in-out]"></div>

                                <a href="https://nexacraft.com/" target="_blank" rel="noopener noreferrer" className="relative z-10 block cursor-pointer w-full">
                                    <motion.img
                                        src={nexacraftImg}
                                        alt="Nexacraft - Co-Sponsor"
                                        className="w-full h-auto object-contain filter hover:scale-105 transition-transform duration-300 max-h-[120px]"
                                        style={{
                                            filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 35px rgba(220, 20, 60, 0.7)) brightness(1.2)'
                                        }}
                                    />
                                </a>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </motion.div>

            <style jsx>{`
        @keyframes sweep {
          0% { transform: translateX(-150%) skewX(-25deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(150%) skewX(-25deg); opacity: 0; }
        }
      `}</style>
        </section>
    );
};

export default TitleSponsor;

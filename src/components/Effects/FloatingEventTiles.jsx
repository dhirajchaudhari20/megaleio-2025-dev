import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { registrationLinks } from '../../data/registrationLinks';

const TiltCard = ({ item }) => {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const card = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - card.left;
        const y = e.clientY - card.top;
        const centerX = card.width / 2;
        const centerY = card.height / 2;
        const rotateX = (centerY - y) / 10;
        const rotateY = (x - centerX) / 10;

        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    return (
        <motion.a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
            }}
            animate={{
                rotateX: rotate.x,
                rotateY: rotate.y,
            }}
            className="relative group w-full h-40 md:h-48 bg-black/40 border-2 border-red-500/30 rounded-xl overflow-hidden backdrop-blur-md flex flex-col items-center justify-center p-4 transition-colors hover:border-red-500/80"
        >
            <div
                className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
            />

            {/* 3D Glow Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent pointer-events-none"
                style={{ transform: "translateZ(20px)" }}
            />

            <h3
                className="relative z-10 text-white font-['Minecraft'] text-center text-sm md:text-base tracking-widest drop-shadow-[0_0_8px_rgba(220,20,60,0.8)]"
                style={{ transform: "translateZ(30px)" }}
            >
                {item.title.toUpperCase()}
            </h3>

            <div className="absolute bottom-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
            </div>
        </motion.a>
    );
};

const FloatingEventTiles = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* The Gate Trigger */}
            <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-24 right-6 z-[100] w-14 h-14 bg-red-800 border-2 border-red-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,20,60,0.6)] cursor-pointer overflow-hidden group"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(220,20,60,1)_0%,transparent_70%)] animate-pulse opacity-50"></div>
                <span className="relative z-10 text-white font-['Minecraft'] text-xs font-bold">GATE</span>
                {/* Portal rings */}
                <div className="absolute inset-0 border-2 border-red-400/30 rounded-full animate-[spin_3s_linear_infinite] scale-110"></div>
                <div className="absolute inset-0 border-2 border-red-400/20 rounded-full animate-[spin_5s_linear_infinite_reverse] scale-125"></div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex flex-col items-center overflow-y-auto pt-20 pb-10 px-6"
                    >
                        {/* Upside Down Particles Background */}
                        <div className="fixed inset-0 pointer-events-none overflow-hidden h-full w-full">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: -20, x: Math.random() * 100 + "%", opacity: 0 }}
                                    animate={{
                                        y: "120vh",
                                        opacity: [0, 0.4, 0],
                                        x: (Math.random() * 100 - 10) + "%"
                                    }}
                                    transition={{
                                        duration: Math.random() * 10 + 10,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: Math.random() * 10
                                    }}
                                    className="absolute w-1 h-1 bg-white/40 rounded-full blur-[1px]"
                                />
                            ))}
                        </div>

                        <motion.h2
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-white font-['Minecraft'] text-4xl md:text-6xl mb-12 text-center tracking-tighter drop-shadow-[0_0_15px_rgba(220,20,60,1)] flickering-event-text"
                        >
                            REGISTRATION DESK
                        </motion.h2>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl relative z-10"
                        >
                            {registrationLinks.map((item, index) => (
                                <TiltCard key={index} item={item} />
                            ))}
                        </motion.div>

                        <motion.button
                            onClick={() => setIsOpen(false)}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-16 px-10 py-4 bg-transparent border-2 border-red-500 text-red-500 font-['Minecraft'] tracking-widest hover:bg-red-500 hover:text-black transition-all duration-300"
                        >
                            CLOSE THE GATE
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FloatingEventTiles;

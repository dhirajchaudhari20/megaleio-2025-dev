import React from 'react';
import { motion } from 'framer-motion';
import titleImg from '../../assets/title/Title.png';

const TitleSponsor = () => {
    return (
        <section className="relative w-full py-16 flex flex-col items-center justify-center bg-black/80 z-20 border-t border-b border-red-900/30">
            {/* Subtle glow background */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(139,0,0,0.1) 0%, transparent 60%)" }}></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center gap-6"
            >
                <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-red-600/50"></div>
                    <h2 className="text-red-500 tracking-[0.3em] font-cinzel text-sm md:text-lg uppercase">Title Sponsor</h2>
                    <div className="h-[1px] w-12 bg-red-600/50"></div>
                </div>

                <motion.div
                    whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 20px rgba(255,255,255,0.6))" }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
                >
                    <img
                        src={titleImg}
                        alt="Title Sponsor Trinity"
                        className="h-20 md:h-32 object-contain filter brightness-110"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default TitleSponsor;

import React from "react";
import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
    return (
        <>
            {/* The Next Page Content fading in */}
            <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                transition={{ duration: 0.7, ease: "easeInOut", delay: 0.2 }}
                className="w-full h-full"
            >
                {children}
            </motion.div>

            {/* Cinematic Wipe (Stranger Things style) */}
            <motion.div
                className="fixed inset-0 z-[999999] pointer-events-none bg-black"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                style={{ transformOrigin: "top" }}
            >
                {/* Red Demogorgon-esque flesh glow line at the edge of the wipe */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 shadow-[0_0_20px_10px_rgba(220,20,60,0.8)]" />
            </motion.div>
        </>
    );
};

export default PageTransition;

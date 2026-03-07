import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const Custom3DCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            <motion.div
                className="absolute w-8 h-8 rounded-full border border-red-500/50 flex items-center justify-center"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <div className="w-1 h-1 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,20,60,1)]" />
            </motion.div>

            {/* 3D Spore Trail - Simplified for performance but "designed" look */}
            <SporeTrail x={cursorX} y={cursorY} />
        </div>
    );
};

const SporeTrail = ({ x, y }) => {
    const [coords, setCoords] = React.useState([]);

    useEffect(() => {
        const handleMove = () => {
            const newSpore = {
                id: Math.random(),
                x: x.get(),
                y: y.get(),
                z: Math.random() * 100 - 50,
                size: Math.random() * 3 + 1,
            };
            setCoords((prev) => [newSpore, ...prev].slice(0, 15));
        };

        const unsubscribeX = x.on('change', handleMove);
        return () => unsubscribeX();
    }, [x, y]);

    return (
        <>
            {coords.map((spore) => (
                <motion.div
                    key={spore.id}
                    initial={{ opacity: 0.6, scale: 1, z: spore.z }}
                    animate={{ opacity: 0, scale: 0.5, z: spore.z + 100, y: spore.y + 20 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="absolute bg-red-500/30 rounded-full blur-[1px]"
                    style={{
                        left: spore.x,
                        top: spore.y,
                        width: spore.size,
                        height: spore.size,
                        x: '-50%',
                        y: '-50%',
                    }}
                />
            ))}
        </>
    );
};

export default Custom3DCursor;

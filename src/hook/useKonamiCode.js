import { useEffect, useState } from 'react';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

export const useKonamiCode = (callback) => {
    const [inputSequence, setInputSequence] = useState([]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key;

            setInputSequence((prev) => {
                const newSequence = [...prev, key];
                if (newSequence.length > KONAMI_CODE.length) {
                    newSequence.shift();
                }

                if (newSequence.join(',').toLowerCase() === KONAMI_CODE.join(',').toLowerCase()) {
                    callback();
                    return []; // Reset after trigger
                }

                return newSequence;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [callback]);
};

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to apply 3D perspective tilt to elements during scroll.
 * @param {string} selector - CSS selector for elements to animate.
 * @param {object} options - GSAP ScrollTrigger options.
 */
export const usePerspectiveScroll = (selector, options = {}) => {
    useEffect(() => {
        // Disable heavy 3D section tilt on mobile viewports to prevent UI distortion
        if (window.innerWidth < 768) return;

        const elements = document.querySelectorAll(selector);

        elements.forEach((el) => {
            gsap.set(el, { transformPerspective: 2500 }); // Deeper perspective

            // Unified trigger for a smoother, continuous tilt
            gsap.fromTo(
                el,
                {
                    rotateX: 20, // Slightly more pronounced
                    z: -200,
                    filter: "brightness(0.6)",
                },
                {
                    rotateX: -20,
                    z: -200,
                    filter: "brightness(0.6)",
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 0.5, // Faster following for "hooked" feel
                        onUpdate: (self) => {
                            const progress = self.progress;
                            // Bell curve for center pop
                            const brightness = 0.6 + Math.sin(progress * Math.PI) * 0.5;
                            const zDepth = -200 + Math.sin(progress * Math.PI) * 200;
                            gsap.set(el, {
                                filter: `brightness(${brightness})`,
                                z: zDepth
                            });
                        }
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger && selector.includes(trigger.vars.trigger)) {
                    trigger.kill();
                }
            });
        };
    }, [selector, options]);
};

export default usePerspectiveScroll;

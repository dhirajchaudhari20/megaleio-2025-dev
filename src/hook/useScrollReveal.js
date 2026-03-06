import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (selector, options = {}) => {
    useEffect(() => {
        const elements = gsap.utils.toArray(selector);

        elements.forEach((el, i) => {
            gsap.fromTo(el,
                {
                    opacity: 0,
                    y: options.y || 40,
                    scale: options.scale || 0.95
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: options.duration || 1.2,
                    delay: options.stagger ? i * options.stagger : 0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: options.start || "top 85%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });
    }, [selector]);
};

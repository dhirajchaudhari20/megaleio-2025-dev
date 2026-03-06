// hooks/useReveal.js

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useReveal = (selector, options = {}) => {
  useEffect(() => {
    const elements = gsap.utils.toArray(selector);

    const animations = elements.map((el) =>
      gsap.fromTo(
        el,
        {
          y: options.y || 80,
          opacity: 0,
          scale: options.scale || 1,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: options.duration || 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: options.start || "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      )
    );

    return () => {
      animations.forEach((anim) => anim.scrollTrigger?.kill());
    };
  }, [selector]);
};

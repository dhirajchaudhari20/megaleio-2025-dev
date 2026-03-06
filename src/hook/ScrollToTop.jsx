import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/all";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top using Lenis
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Refresh ScrollTrigger after route change
    setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 50);

  }, [pathname]);

  return null;
};

export default ScrollToTop;
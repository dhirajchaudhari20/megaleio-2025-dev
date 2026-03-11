import React, { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import { Schedule } from "./pages/Schedule";
import Team from "./pages/Team";
import ContactUs from "./pages/ContactUs";
import Event from "./pages/Event";
import { useSmoothScroll } from "./hook/useSmoothScroll";
import ScrollToTop from "./hook/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/Effects/PageTransition";
import { useKonamiCode } from "./hook/useKonamiCode";

const App = () => {
  const location = useLocation();
  const [isUpsideDown, setIsUpsideDown] = useState(false);

  useKonamiCode(() => {
    setIsUpsideDown(prev => !prev);
    // Play a sinister sound if needed, for now just toggle state
  });

  // Toggle global class for Upside Down Mode
  useEffect(() => {
    if (isUpsideDown) {
      document.body.classList.add('upside-down-mode');
    } else {
      document.body.classList.remove('upside-down-mode');
    }
  }, [isUpsideDown]);

  // Disable browser scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Initialize Lenis
  useSmoothScroll();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/Event" element={<PageTransition><Event /></PageTransition>} />
            <Route path="/Schedule" element={<PageTransition><Schedule /></PageTransition>} />
            <Route path="/Team" element={<PageTransition><Team /></PageTransition>} />
            <Route path="/ContactUs" element={<PageTransition><ContactUs /></PageTransition>} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;   
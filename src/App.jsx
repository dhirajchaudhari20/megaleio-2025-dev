import React, { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Schedule } from "./pages/Schedule";
import Team from "./pages/Team";
import ContactUs from "./pages/ContactUs";
import Event from "./pages/Event";
import { useSmoothScroll } from "./hook/useSmoothScroll";
import ScrollToTop from "./hook/ScrollToTop";
import CustomCursor from "./components/Effects/CustomCursor";

const App = () => {

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
      <CustomCursor />
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Event" element={<Event />} />
          <Route path="/Schedule" element={<Schedule />} />
          <Route path="/Team" element={<Team />} />
          <Route path="/ContactUs" element={<ContactUs />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;   
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Countdown from "./components/Countdown.jsx";
import Banner from "./components/Banner.jsx";
import Gallery from "./components/Gallery.jsx";
import Location from "./components/Location.jsx";
import Footer from "./components/Footer.jsx";
import Events from "./components/Events.jsx";
import Schedule from "./components/Schedule.jsx";
import Agenda from "./components/Agenda.jsx";
import JDoodleEmbed from "./components/sjcem-compiler.jsx"; 
import Team from "./components/Team.jsx"; // New Minecraft Team Cards Section
import MinecraftPreloader from "./components/MinecraftPreloader.jsx"; // Preloader (first load)
import MinecraftPageLoader from "./components/MinecraftPageLoader.jsx"; // Page transition loader
import Sponsors from "./components/Sponsors.jsx";
import "./App.css";

// A wrapper component for Routes that detects location changes
const AppRoutes = ({ setPageLoading }) => {
  const location = useLocation();

  useEffect(() => {
    // Show the page loader on each route change
    setPageLoading(true);
    // Hide the loader after a short delay (adjust as needed)
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location, setPageLoading]);

  return (
    <Routes>
      <Route
        path="/events"
        element={
          <>
            <Navbar />
            <Events />
            <Footer />
          </>
        }
      />
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Hero />
            <About />
            <Countdown />
            <Banner />
            <Gallery />
            <Sponsors />
            <Location />
            <div className="h-14 w-full bg-green-500" />
            <Footer />
          </>
        }
      />
      <Route
        path="/schedule"
        element={
          <>
            <Navbar />
            <Agenda />
            <Footer />
          </>
        }
      />
      <Route
        path="/sjcem-compiler"
        element={
          <>
            <JDoodleEmbed />
          </>
        }
      />
      <Route
        path="/team"
        element={
          <>
            <Navbar />
            <Team />
            <Footer />
          </>
        }
      />
    </Routes>
  );
};

function App() {
  const [loading, setLoading] = useState(true);       // for initial content load simulation
  const [videoFinished, setVideoFinished] = useState(false); // tracks when preloader video completes
  const [pageLoading, setPageLoading] = useState(false); // for route transitions

  useEffect(() => {
    // Simulate initial content loading (adjust timing as needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Called when the MinecraftPreloader completes its fade-out
  const handlePreloaderComplete = () => {
    setVideoFinished(true);
  };

  return (
    <Router>
      {(loading || !videoFinished) ? (
        <MinecraftPreloader onFadeComplete={handlePreloaderComplete} />
      ) : (
        <>
          {pageLoading && <MinecraftPageLoader />}
          <AppRoutes setPageLoading={setPageLoading} />
        </>
      )}
    </Router>
  );
}

export default App;

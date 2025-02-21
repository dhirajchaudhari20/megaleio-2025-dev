import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import MinecraftPreloader from "./components/MinecraftPreloader.jsx"; // Preloader
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust preloader time if needed
  }, []);

  return (
    <Router>
      {loading ? (
        <MinecraftPreloader />
      ) : (
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
                <Navbar />
                <JDoodleEmbed />
                <Footer />
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
      )}
    </Router>
  );
}

export default App;

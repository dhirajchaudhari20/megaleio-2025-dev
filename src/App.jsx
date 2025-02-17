import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Countdown from './components/Countdown.jsx';
import Banner from './components/Banner.jsx';
import EventCarousel from './components/EventCarousel.jsx';
import Gallery from './components/Gallery.jsx';
import Location from './components/Location.jsx';
import Footer from './components/Footer.jsx';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Events from './pages/Events';
import EventsPage from './pages/EventsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/events" element={
          <>
            <Navbar />
            <Events />
          </>
        } />
        <Route path="/" element={
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
        } />
      </Routes>
    </Router>
  );
}

export default App;

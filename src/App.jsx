import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Countdown from './components/Countdown.jsx';
import Banner from './components/Banner.jsx';
import Gallery from './components/Gallery.jsx';
import Location from './components/Location.jsx';
import Footer from './components/Footer.jsx';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Events from './components/Events.jsx';
import Schedule from './components/Schedule.jsx';
import Agenda from './components/Agenda.jsx';
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
		<Route path="/schedule" element={
		  <>
			<Navbar />
			<Agenda />
		  </>
			
		} />
      </Routes>
    </Router>
  );
}

export default App;

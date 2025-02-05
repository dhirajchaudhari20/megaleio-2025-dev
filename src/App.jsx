import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Countdown from './components/Countdown.jsx';
import Banner from './components/Banner.jsx';
import Gallery from './components/Gallery.jsx';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
        <Hero />
        <About />
        <Countdown />
        <Banner />
		<Gallery />
    </>
  );
}

export default App;

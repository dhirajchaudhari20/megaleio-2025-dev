import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Countdown from './components/Countdown.jsx';
import Banner from './components/Banner.jsx';
import Gallery from './components/Gallery.jsx';

function App() {
  return (
    <div className="App bg-[#1D1C1B]">
      <Navbar />
        <Hero />
        <About />
        <Countdown />
        <Banner />
		<Gallery />
    </div>
  );
}

export default App;

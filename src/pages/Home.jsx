import React from 'react'
import Navbar from '../components/Navbar'
import Video from '../components/Home/Video'
import Hero from '../components/Home/Hero'
import TitleSponsor from '../components/Home/TitleSponsor'
import Countdown from '../components/Home/CountDown'
import EventsGallery from '../components/Home/Events'
import ImageCarousel from '../components/Home/highlights'
import Footer from '../components/Footer'
import AmbientAudio from '../components/Effects/AmbientAudio'

const Home = () => {
  return (
    <div className='relative'>
      <AmbientAudio />
      <Video />
      <Hero />
      <TitleSponsor />
      <Countdown />
      <EventsGallery />
      <ImageCarousel /> {/* Carousel above the footer */}
      <Footer />
    </div>
  )
}

export default Home
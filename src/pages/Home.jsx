import React from 'react'
import Navbar from '../components/Navbar'
import Video from '../components/Home/Video'
import Hero from '../components/Home/Hero'
import Countdown from '../components/Home/CountDown'
import EventsGallery from '../components/Home/Events'
import ImageCarousel from '../components/Home/highlights'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='relative'>

      <Hero />
      <Countdown />
      <EventsGallery />
      <ImageCarousel /> {/* Carousel above the footer */}
      <Footer />
    </div>
  )
}

export default Home
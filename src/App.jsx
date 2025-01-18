import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import InfiniteMarquee from './components/InfiniteMarquee'

function App() {
  return (
    <div className='h-screen w-screen bg-primary'>
        <Navbar />
        <HeroSection />
        <InfiniteMarquee />
    </div>
  )
}

export default App
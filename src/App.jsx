import React from 'react'
import Home from "./Pages/Home";
import { UserProvider, useUser } from "./lib/context/user";
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import InfiniteMarquee from './components/InfiniteMarquee'

function App() {

  const user = useUser();

  return (
    <div>
      {user.current ? <Home /> : 
          <div className='h-screen w-screen bg-primary'>
            <Navbar />
            <HeroSection />
            <InfiniteMarquee />
          </div>
      }
    </div>
  )
}

export default App
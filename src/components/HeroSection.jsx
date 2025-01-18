import React from 'react'
import HeroImg from '../assets/images/undraw_book-lover.png'

function HeroSection() {
  return (
    <div className="md:h-[700px] flex flex-col sm:justify-center sm:items-center md:flex-row md:bg-[url('C:\Users\mohdh\OneDrive\Desktop\Library-System\src\assets\images\2d-5-20.png')]">
        <div>
            <h1 className="text-4xl md:text-6xl font-bold text-textAliceBlue m-5">
                Discover Your Next Great Read
            </h1>
            <p className="text-lg md:text-2xl text-highlightGray m-5">
                Borrow from thousands of books, <mark className='bg-highlightKeppel rounded-lg p-[2px]'>anywhere</mark>, <mark className='bg-highlightGolden rounded-lg p-[2px]'>anytime</mark>.
            </p>
            <div>
                <button className='h-[60px] w-[150px] bg-highlightBrown border-b-4 border-r-4  text-textAliceBlue text-[22px] font-bold rounded-2xl m-5'>Get started</button>
            </div>
        </div>
        <div>
            <img src={HeroImg} alt="hero image"  className='w-[650px] hidden md:flex'/>
        </div>
    </div>
  )
}

export default HeroSection
import React from 'react'
import Marquee from "react-fast-marquee";
import Art from '../assets/Icons/art-book.png'
import Biology from '../assets/Icons/biology-book.png'
import chemistry from '../assets/Icons/chemistry-book.png'
import geography from '../assets/Icons/geography-book.png'
import history from '../assets/Icons/history-book.png'
import physics from '../assets/Icons/physics-book.png'
import informatics from '../assets/Icons/informatics-book.png'
import math from '../assets/Icons/math-book.png'
import cook from '../assets/Icons/cookbook.png'

function InfiniteMarquee() {
  return (
    <div className='h-[112px] bg-neutralBeige flex items-center'>
        <Marquee autoFill gradient gradientColor='#f5f1e6'>
            <div className='mr-9 h-[60px] w-[60px]'>
                <img src={Art} alt="" />
            </div>
            <div className='mr-9 h-[60px] w-[60px]'>
                <img src={Biology} alt="" />
            </div>
            <div className='mr-9 h-[60px] w-[60px]'>
                <img src={chemistry} alt="" />
            </div>
            <div className='mr-9 h-[60px] w-[60px]'>
                <img src={geography} alt="" />
            </div>
            <div className='mr-9 h-[60px] w-[60px]'>
                <img src={history} alt="" />
            </div>
            <div className='mr-9 h-[60px] w-[60px]'>
                <img src={physics} alt="" />
            </div>
            <div className='mr-9 h-[60px] w-[60px]'>
                <img src={informatics} alt="" />
            </div>
            <div className='mr-9 h-[60px] w-[60px]'>
                <img src={cook} alt="" />
            </div>
            <div className='mr-9 h-[60px] w-[60px]'>
                <img src={math} alt="" />
            </div>
        </Marquee>
    </div>
  )
}

export default InfiniteMarquee
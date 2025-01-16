import React, { useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { CiMenuBurger, CiMenuFries } from "react-icons/ci";
import logo from "../assets/images/Library-logo.png"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleNavbar = () => {
        setIsOpen(!isOpen)
    }
  return (
    <div className="w-screen h-[50px] flex items-center justify-between relative">

    <div className="flex ml-5 flex-wrap items-center">

        <div className="hidden md:flex text-[20px] font-bold">
            <h1 className="m-2 cursor-pointer text-textAliceBlue">Home</h1>
            <h1 className="m-2 cursor-pointer text-textAliceBlue">About us</h1>
            <h1 className="m-2 cursor-pointer text-textAliceBlue">Contact</h1>
        </div>

        <div className="flex md:hidden">
            <button onClick={toggleNavbar} className="text-2xl">
                {isOpen ? <CiMenuFries className='text-textAliceBlue'/> : <CiMenuBurger className='text-textAliceBlue'/>}
            </button>
        </div>
    </div>
    <div>
        <img src={logo} alt="logo" className='w-[250px]'/>
    </div>
    {isOpen && (
        <div className="absolute top-[50px] left-0 w-full flex flex-col items-center py-4 z-10 animate-slide-down">
            <h1 className="text-lg m-2 cursor-pointer text-textAliceBlue">Home</h1>
            <h1 className="text-lg m-2 cursor-pointer text-textAliceBlue">About us</h1>
            <h1 className="text-lg m-2 cursor-pointer text-textAliceBlue">Contact</h1>
        </div>
    )}

    <div>
        <FaRegUserCircle size={30} className="m-5 text-textAliceBlue" />
    </div>
</div>

  )
}

export default Navbar
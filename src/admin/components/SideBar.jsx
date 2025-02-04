import React from 'react'
import logo from '../../assets/images/Library-logo.png'
import { NavLink } from "react-router";
import { GoHome, GoPerson, GoBook, GoPersonAdd } from "react-icons/go";


function SideBar() {
    return (
        <div className='bg-primary h-screen w-[400px]'>
            <img src={logo} alt="logo" />
            <hr />
            <div className='flex flex-col'>
                <NavLink to="/admin" className="font-bold text-[30px] text-highlightGray flex items-center m-2"><GoHome size={35} className='mr-3'/>Home</NavLink>
                <NavLink to="/admin/users" className="font-bold text-[30px] text-highlightGray flex items-center m-2"><GoPerson size={35} className='mr-3'/> All Users</NavLink>
                <NavLink to="/admin/books" className="font-bold text-[30px] text-highlightGray flex items-center m-2"><GoBook size={35} className='mr-3'/> All Books</NavLink>
                <NavLink to="/admin/requests" className="font-bold text-[30px] text-highlightGray flex items-center m-2"><GoPersonAdd size={35} className='mr-3'/> Account Requests</NavLink>
            </div>

        </div>
    )
}

export default SideBar
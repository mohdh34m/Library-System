import React from 'react'
import { IoBookOutline } from "react-icons/io5";
import { NavLink } from "react-router";

function Register() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='h-[500px] w-[450px]'>
        <div className='flex flex-col items-center'>
          <IoBookOutline size={50} className='mt-5 text-highlightBrown' />
          <h1 className='font-bold text-[40px]'>Welcome to Library</h1>
          <p className='text-highlightGray'>Join our community of book lovers</p>
          <p className='text-highlightGray'>Already have an account? <NavLink to="/login" className='text-highlightBrown'>Sign in</NavLink></p>
        </div>

        <div className='mb-2 mt-2'>
          <label class="block text-lg font-medium text-gray-700 mb-1 ml-2">Name</label>
          <input
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="Full name"
          />
        </div>
        <div className='mb-2 mt-2'>
          <label class="block text-lg font-medium text-gray-700 mb-1 ml-2">Email</label>
          <input
            type="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="your@email.com"
          />
        </div>
        <div className='mb-2 mt-2'>
          <label class="block text-lg font-medium text-gray-700 mb-1 ml-2">Phone Number</label>
          <input
            type="number"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="Phone number"
          />
        </div>
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-1 ml-2">Password</label>
          <input
            type="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="••••••••"
          />
        </div>
        <button className='bg-highlightBrown w-full h-[40px] rounded-lg mt-3 text-neutralBeige font-bold'>Create your account</button>
      </div>
    </div>
  )
}

export default Register
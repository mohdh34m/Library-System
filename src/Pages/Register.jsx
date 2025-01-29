import { useState } from "react";
import { useUser } from "../lib/context/user";
import { IoBookOutline } from "react-icons/io5";
import { NavLink } from "react-router";

function Register() {

  const user = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [studentId, setStudentId] = useState("");
  const [idCard, setidCard] = useState()

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
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className='mb-2 mt-2'>
          <label class="block text-lg font-medium text-gray-700 mb-1 ml-2">Email</label>
          <input
            type="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className='mb-2 mt-2'>
          <label class="block text-lg font-medium text-gray-700 mb-1 ml-2">Phone Number</label>
          <input
            type="number"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="Phone number"
            value={phoneNum}
            onChange={(event) => {
              setPhoneNum(event.target.value);
            }}
          />
        </div>
        <div className='mb-2 mt-2'>
          <label class="block text-lg font-medium text-gray-700 mb-1 ml-2">Student ID</label>
          <input
            type="number"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="Student ID"
            value={studentId}
            onChange={(event) => 
              setStudentId(event.target.value)
            }
          />
        </div>
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-1 ml-2">Password</label>
          <input
            type="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="••••••••"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <input 
        type="file" 
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => 
          setidCard(e.target.files[0])
        }
      />
        <button 
          className='bg-highlightBrown w-full h-[40px] rounded-lg mt-3 text-neutralBeige font-bold'
          onClick={() => user.register(email, password, name, phoneNum, studentId, idCard)}  
        >Create your account</button>
      </div>
    </div>
  )
}

export default Register
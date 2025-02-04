import React, { useEffect, useState } from 'react'
import { GoPerson, GoBook, GoPersonAdd } from "react-icons/go";
import { databases } from '../../lib/appwrite';
import { Query } from 'appwrite';

function StatsOverview() {
    const [usersCount, setUsersCount] = useState(0)
    const [booksCount, setBooksCount] = useState(0)
    const [requestsCount, setRequestsCount] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await databases.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_USERS_COLLECTION_ID)
                setUsersCount(userRes.total)
                const booksRes = await databases.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_BOOKS_COLLECTION_ID)
                setBooksCount(booksRes.total)
                const requestsRes = await databases.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_USERS_COLLECTION_ID, [
                    Query.equal("status", false)
                ])
                setRequestsCount(requestsRes.total)
            } catch(error) {
                console.error("Error fetching stats:", error)
            }
        }
        fetchData()
    }, [])

  return (
    <div>
        <div className='flex w-[1450px] justify-center'>
            <div className='flex gap-10 w-[1300px]'>
              <div className='w-1/3 h-[150px] bg-highlightGolden flex justify-between p-5 rounded-2xl'>
                <div className='flex flex-col justify-center'>
                  <h1 className='text-[15px] font-semibold'>Total Users</h1>
                  <h1 className='text-[30px] font-bold'>{usersCount}</h1>
                </div>
                <div className='flex items-center'>
                  <GoPerson size={40} />
                </div>
              </div>

              <div className='w-1/3 h-[150px] bg-highlightGolden flex justify-between p-5 rounded-2xl'>
                <div className='flex flex-col justify-center'>
                  <h1 className='text-[15px] font-semibold'>Total Books</h1>
                  <h1 className='text-[30px] font-bold'>{booksCount}</h1>
                </div>
                <div className='flex items-center'>
                  <GoBook size={40} />
                </div>
              </div>

              <div className='w-1/3 h-[150px] bg-highlightGolden flex justify-between p-5 rounded-2xl'>
                <div className='flex flex-col justify-center'>
                  <h1 className='text-[15px] font-semibold'>Pending Requests</h1>
                  <h1 className='text-[30px] font-bold'>{requestsCount}</h1>
                </div>
                <div className='flex items-center'>
                  <GoPersonAdd size={40} />
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default StatsOverview
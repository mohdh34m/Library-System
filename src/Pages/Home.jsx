import React from 'react'
import Navbar from '../components/Navbar'
import { useBooks } from "../lib/context/books";
import Book from '../BookCard'

function Home() {

    const books = useBooks();

    const handleSearch = (e) => {
        const query = e.target.value;
        books.filterBooks(query);
      };

    return (
        <div className='bg-primary w-screen h-screen'>
            <div>
                <Navbar />
            </div>

            <div className='pt-10'>
                <div className='flex flex-col items-center'>
                    <p className='font-bold text-[20px] text-highlightGray'>Discover Your Next Great Read:</p>
                    <p className='font-bold text-[37px] text-neutralBeige text-center'>Explore and Search for <span className='text-neutralDun'>Any Book</span> In Our Library</p>

                    <div className="w-[350px] mr-1 md:w-[800px] md:mr-0 flex justify-center p-1 mt-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                className="w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300"
                                placeholder="Search..."
                                onChange={(e) => handleSearch(e)}
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center m-3'>
                    <div className='w-[900px] flex justify-between'>
                        <h1 className='text-[20px] text-textAliceBlue font-bold'>Search Results:</h1>
                        <button className='bg-highlightGray w-[50px] h-[30px] rounded-lg'>Filter</button>
                    </div>
                </div>
                
                <div className='flex justify-center'>
                    
                    <div className='w-[1000px] flex flex-wrap justify-center'>
                        {books.current.map((book) => (
                            <div key={book.$id} className='w-[200px] h-[200px] m-5 flex flex-col justify-center items-center'>
                                <Book key={book.$id} coverColor={book.color} cover={book.cover}/>
                                <h1 className='text-[15px] font-bold text-center mt-2 text-neutralBeige'>{book.title}</h1>
                                <p className='font-bold text-neutralDun'>By <span className='text-textAliceBlue'>{book.author}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
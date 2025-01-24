import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { useBooks } from "../lib/context/books";
import { useNavigate } from 'react-router';
import { FaRegStar } from "react-icons/fa";
import Book from '../BookCard'
import Navbar from '../components/Navbar';

function BookDetails() {

  const [book, setBook] = useState(null)

  const { id } = useParams()

  const books = useBooks();

  const navigate = useNavigate();

  useEffect(() => {
    const filteredBooks = books.current.find((book) => book.$id === id)
    if (filteredBooks) {
      setBook(filteredBooks)
    }

  }, [books.current, id])


  return (
    <div className='bg-primary w-screen '>
      <Navbar />
      <div className='flex flex-col md:flex-row md:justify-center md:p-20'>
        <div>
          <h1 className='text-[30px] m-2 md:m-0 md:text-[40px] font-bold text-neutralDun'>{book?.title}</h1>
          <div className='flex m-2 md:m-0'>
            <p className='text-[15px] md:text-[20px] font-bold text-highlightGray'>By <span className='text-neutralDun'>{book?.author}</span></p>
            <p className='text-[15px] md:text-[20px] font-bold ml-2 text-highlightGray'>| <span className='text-neutralDun'>{book?.genre}</span></p>
          </div>
          <div>
            <div className='flex items-center text-highlightGray mt-2 m-2 md:m-0'>
              <FaRegStar size={20} className='' />
              <p className='text-[20px] font-bold ml-2'> {book?.rating}</p>
            </div>
            <p className='text-[20px] font-bold text-highlightGray m-2 md:m-0'>Available Books: {book?.available_copies}</p>
          </div>
          <p className='text-[15px] font-bold md:w-[800px] text-wrap md:mt-5 text-highlightGray m-2 md:m-0'>{book?.summary}</p>
          <div className='flex justify-center mb-5 md:justify-start md:mb-0'>
            <button class="bg-highlightBrown hover:bg-neutralDun hover:text-primary text-textAliceBlue font-bold py-2 mt-5 px-5 rounded-md border-b-2 border-neutralDun">Borrow Book</button>
          </div>
        </div>
        <div className='flex justify-center'>
          <img src={book?.cover} className='h-[320px] w-[270px] md:h-[500px] md:w-[375px] md:ml-20 rounded-2xl' alt={`${book?.title} cover`} />
        </div>

      </div>
      <div className='flex justify-center'>
        <div className='w-[1250px] flex justify-between'>
          <h1 className='text-[30px] font-bold text-highlightGray'>More books:</h1>
        </div>
      </div>
      <div className="flex justify-center">
        <div className='h-[1150px] md:min-w-[1250px] md:h-[250px] flex flex-col md:flex-row justify-center items-center'>
          {books.current.slice(0, 6).map((book) => {
            if (book.$id !== id) { 
              return (
            <div key={book.$id} className='w-[200px] h-[200px] m-5 flex flex-col items-center cursor-pointer' onClick={() => navigate(`/books/${book.$id}`)}>
              <Book key={book.$id} coverColor={book.color} cover={book.cover} />
              <h1 className='text-[15px] font-bold text-center mt-2 text-neutralBeige'>{book.title}</h1>
              <p className='font-bold text-neutralDun'>By <span className='text-textAliceBlue'>{book.author}</span></p>
            </div>
            )
          }
          })}
        </div>
      </div>

    </div>
  )
}

export default BookDetails
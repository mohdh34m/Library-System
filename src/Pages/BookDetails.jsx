import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { useBooks } from "../lib/context/books";
import { useNavigate } from 'react-router';
import { FaRegStar } from "react-icons/fa";
import Book from '../BookCard'
import Navbar from '../components/Navbar';
import { account, databases, ID } from "../lib/appwrite";
import { Query } from 'appwrite';

function BookDetails() {

  const [book, setBook] = useState(null)

  const { id } = useParams()

  const books = useBooks();
  
  const navigate = useNavigate();

  const borrowBook = async (bookID, userID) => {
    try {
      const book = await databases.getDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_BOOKS_COLLECTION_ID, bookID);
      if(book.available_copies <= 0){
        return alert("No copies available")
      }

      const borrowedBook = await databases.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_BORROW_COLLECTION_ID, [
        Query.equal("user_id", [`${userID.$id}`]),
        Query.equal("book_id", [`${bookID}`]),
        Query.equal("status", "borrowed")
      ]);
      if(borrowedBook.total > 0){
        return alert("You already have this book borrowed")
      }
      
      await databases.updateDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_BOOKS_COLLECTION_ID, bookID,{
        available_copies: book.available_copies - 1
      })

      setBook(prev => ({ ...prev, available_copies: prev.available_copies - 1 }));

      await databases.createDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_BORROW_COLLECTION_ID,
        ID.unique(),
        {
          user_id: userID.$id,
          book_id: bookID,
          borrow_date: new Date().toISOString(),
          status: "borrowed",
        }
      );

      alert("Book borrowed successfully!");
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert("Failed to borrow book.");
    }
  }

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
            <button 
              className="bg-highlightBrown hover:bg-neutralDun hover:text-primary text-textAliceBlue font-bold py-2 mt-5 px-5 rounded-md border-b-2 border-neutralDun"
              onClick={async () => {
                const userId = await account.get();
                if (!userId) {
                  return alert("You must be logged in to borrow a book.");
                }
                borrowBook(id, userId)}}
            >Borrow Book</button>
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
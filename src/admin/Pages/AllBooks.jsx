import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import { databases } from '../../lib/appwrite'
import { Query } from 'appwrite';
import { RiDeleteBinLine } from "react-icons/ri";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';


function AllBooks() {

    const [books, setBooks] = useState([])
    const [page, setPage] = useState(0)
    const [totalBooks, setTotalBooks] = useState(0);

    const navigate = useNavigate()

    const deleteBook = async (bookId) => {
        try {
            await databases.deleteDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_BOOKS_COLLECTION_ID,
                bookId,
            );

            setBooks(prev => prev.filter(book => book.$id !== bookId));
            alert("Book removed from database.");

        } catch (error) {
            console.error("Error deleting Book:", error);
            alert("Failed to delete Book.");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await databases.listDocuments(
                    import.meta.env.VITE_DATABASE_ID,
                    import.meta.env.VITE_BOOKS_COLLECTION_ID,
                    [
                        Query.limit(5),
                        Query.offset(page)
                    ]
                );

                setBooks(res.documents);
                setTotalBooks(res.total);
            } catch (error) {
                console.error("Error fetching Books:", error)
            }
        }
        fetchData()
    }, [page])

    return (
        <div className='flex'>
            <SideBar />
            <div>
                <div className='flex justify-between items-center'>
                    <h1 className='text-[30px] font-bold m-5'>All Books</h1>
                    <button 
                        className="px-6 py-3 h-[50px] bg-highlightBrown mr-5 text-white font-medium text-lg rounded-lg shadow-md border-e-neutralDun border-b-2"
                        onClick={() => navigate("/admin/create")}
                        >
                        📚 Create a New Book
                    </button>
                </div>
                <div className='w-[1350px] h-[600px] m-5'>
                    <table className='bg-white w-full rounded-xl shadow-lg overflow-hidden'>
                        <thead className='bg-highlightGray/20 font-bold'>
                            <tr>
                                <th className='py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider'>Title</th>
                                <th className='py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider'>Author</th>
                                <th className='py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider'>Genre</th>
                                <th className='py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider'>Rating</th>
                                <th className='py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider'>Available copies</th>
                                <th className='py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider'>Description                                </th>
                                <th className='py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider'>Date Created</th>
                                <th className='py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books?.map((book) => (
                                <tr key={book.$id} className='hover:bg-highlightGolden/10 transition-colors'>
                                    <td className='py-4 px-6 text-gray-700 font-medium'>{book?.title}</td>
                                    <td className='py-4 px-6 text-gray-600'>{book?.author}</td>
                                    <td className='py-4 px-6 text-gray-600'>{book?.genre}</td>
                                    <td className='py-4 px-6'>
                                        <span className='px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm'>{book?.rating}</span>
                                    </td>
                                    <td className='py-4 px-6 text-gray-600'>{book?.available_copies}</td>
                                    <td className='py-4 px-6 text-gray-600'>{book?.description}</td>
                                    <td className='py-4 px-6 text-gray-600'>{book?.$createdAt.split("T")[0]}</td>
                                    <td className='py-4 px-6'>
                                        <button className='text-red-600 hover:text-red-800 font-medium flex items-center'
                                            onClick={() => deleteBook(book.$id)}
                                        >
                                            <RiDeleteBinLine size={20} className='text-highlightTomato' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='flex justify-center items-center gap-4 mt-6'>
                        <button onClick={() => setPage(page - 5)} disabled={page === 0} className='flex items-center font-medium disabled:cursor-not-allowed'><FaArrowLeft size={20} className='mr-2' /> Previous</button>
                        <h1 className='text-[20px] font-bold text-highlightGray'>{`Page ${Math.floor(page / 5) + 1}`}</h1>
                        <button onClick={() => setPage(page + 5)} disabled={page + 5 >= totalBooks} className='flex items-center font-medium disabled:cursor-not-allowed'>Next <FaArrowRight size={20} className='ml-2' /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllBooks
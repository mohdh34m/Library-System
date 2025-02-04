import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import { databases, ID } from '../../lib/appwrite';
import { useNavigate } from 'react-router';

function CreateBook() {
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        genre: '',
        rating: '',
        available_copies: '',
        description: '',
        color: '#ffffff',
        cover: '',
        summary: ''
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedData = {
            ...bookData,
            rating: parseFloat(bookData.rating) || 0,
            available_copies: parseInt(bookData.available_copies) || 0,
        };

        try {
            const res = await databases.createDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_BOOKS_COLLECTION_ID,
                ID.unique(),
                formattedData
            );
            console.log('Book created successfully:', res);
            navigate("/admin/books")
        } catch (error) {
            console.error('Error creating book:', error);
        }
    };

    return (
        <div className='flex min-h-screen bg-gray-50'>
            <SideBar />
            <div className='w-[1400px] flex justify-center'>
                <div className='p-10 w-full'>
                    <h1 className='text-2xl font-bold mb-6 text-center'>📚 Create a New Book</h1>
                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium'>Title</label>
                                <input
                                    type='text'
                                    name='title'
                                    value={bookData.title}
                                    onChange={handleChange}
                                    className='mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium'>Author</label>
                                <input
                                    type='text'
                                    name='author'
                                    value={bookData.author}
                                    onChange={handleChange}
                                    className='mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                                    required
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium'>Genre</label>
                                <input
                                    type='text'
                                    name='genre'
                                    value={bookData.genre}
                                    onChange={handleChange}
                                    className='mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium'>Rating</label>
                                <input
                                    type='number'
                                    name='rating'
                                    value={bookData.rating}
                                    onChange={handleChange}
                                    className='mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                                    min='0' max='5' step='0.1'
                                />
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium'>Available Copies</label>
                            <input
                                type='number'
                                name='available_copies'
                                value={bookData.available_copies}
                                onChange={handleChange}
                                className='mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium'>Description</label>
                            <textarea
                                name='description'
                                value={bookData.description}
                                onChange={handleChange}
                                className='mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                                rows='3'
                            ></textarea>
                        </div>

                        <div>
                            <label className='block text-sm font-medium'>Summary</label>
                            <textarea
                                name='summary'
                                value={bookData.summary}
                                onChange={handleChange}
                                className='mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                                rows='3'
                            ></textarea>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium'>Theme Color</label>
                                <input
                                    type='color'
                                    name='color'
                                    value={bookData.color}
                                    onChange={handleChange}
                                    className='mt-1 w-full h-10 p-1 border rounded-lg focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium'>Cover Image Url</label>
                                <input
                                    type='text'
                                    value={bookData.cover}
                                    name='cover'
                                    onChange={handleChange}
                                    className='mt-1 w-full h-10 p-1 border rounded-lg focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                        </div>

                        <button
                            type='submit'
                            className='w-full bg-highlightBrown text-textAliceBlue font-bold py-3 rounded-lg shadow-md'
                        >
                            📖 Create Book
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateBook;


import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Book from '../BookCard'
import { useUser } from "../lib/context/user";
import { databases, storage } from "../lib/appwrite";
import { MdVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import { Query } from 'appwrite';


function Profile() {
    const { current: user } = useUser();
    const [userProfile, setUserProfile] = useState(null);
    const [borrowedBooks, setBorrowedBooks] = useState(null)

    useEffect(() => {
        async function fetchProfile() {
            if (!user || !user.$id) return;
            try {
                const res = await databases.listDocuments(
                    import.meta.env.VITE_DATABASE_ID,
                    import.meta.env.VITE_USERS_COLLECTION_ID,
                    [Query.equal("user_id", user.$id)]
                );

                if (res.documents.length > 0) {
                    const profile = res.documents[0];

                    if (profile.id_card) {
                        profile.id_card_url = storage.getFilePreview(
                            import.meta.env.VITE_STORAGE_BUCKET_ID,
                            profile.id_card
                        );
                    }

                    setUserProfile(profile);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        }

        async function fetchBorrowedBooks() {
            try {
                if (!user || !user.$id) {
                    setBorrowedBooks([]);
                    return;
                }

                const res = await databases.listDocuments(
                    import.meta.env.VITE_DATABASE_ID,
                    import.meta.env.VITE_BORROW_COLLECTION_ID,
                    [Query.equal("user_id", user.$id)]
                );

                if (!res.documents || res.documents.length === 0) {
                    setBorrowedBooks([]);
                    return;
                }

                const borrowRecords = res.documents;
                const booksArray = await Promise.all(
                    borrowRecords.map(async (borrowDoc) => {
                        try {
                            const bookRes = await databases.listDocuments(
                                import.meta.env.VITE_DATABASE_ID,
                                import.meta.env.VITE_BOOKS_COLLECTION_ID,
                                [Query.equal("$id", borrowDoc.book_id)]
                            );

                            return bookRes.documents.length > 0 && { ...borrowDoc, book: bookRes.documents[0] }
                        } catch (bookError) {
                            console.error("Error fetching book:", bookError);
                        }
                    })
                );

                setBorrowedBooks(booksArray);

            } catch (error) {
                console.error("Error fetching Borrowed Books:", error);
                setBorrowedBooks([]);
            }
        }

        fetchProfile();
        fetchBorrowedBooks();
    }, [user]);
    
    return (
        <div className='bg-primary h-screen w-screen'>
            <Navbar />
            <div className='flex flex-col items-center justify-center md:flex-row md:p-[50px]'>
                <div className='w-[420px] mt-5 bg-primaryBlue md:mt-0 md:w-[700px] md:h-[700px] p-10 rounded-2xl'>
                    <div className='flex justify-center'>
                        <img
                            src={userProfile?.id_card_url}
                            alt="ID Card"
                            className='mt-2 max-w-[400px] max-h-[270px] rounded-lg border-2 border-highlightBrown'
                        />
                    </div>
                    {userProfile?.status ? (
                        <div className='flex justify-center'>
                            <div className='flex items-center justify-center w-[120px] mt-3 mb-3 px-3 py-1 bg-highlightGolden/20 rounded-full'>
                                <MdVerified size={20} className='text-highlightGolden' />
                                <h1 className='font-bold text-lg text-highlightGolden ml-2'>Verified</h1>
                            </div>
                        </div>
                    ) : (
                        <div className='flex justify-center'>
                            <div className='flex items-center justify-center w-[150px] mt-3 mb-3 px-3 py-1 bg-highlightBrown/20 rounded-full'>
                                <VscUnverified size={25} className='text-highlightTomato' />
                                <h1 className='font-bold text-lg text-highlightTomato ml-2'>unVerified</h1>
                            </div>
                        </div>
                    )}

                    <div className='flex flex-wrap justify-center w-full'>
                        <div className='bg-highlightKeppel flex items-center w-full h-[50px]  rounded-xl m-1'>
                            <p className="text-md font-bold text-textAliceBlue ml-2 mr-3">Name:</p>
                            <h1 className='text-[20px] font-bold'>{userProfile?.name}</h1>
                        </div>
                        <div className='bg-highlightKeppel flex items-center w-full h-[50px]  rounded-xl m-1'>
                            <p className="text-md font-bold text-textAliceBlue ml-2 mr-3">Email:</p>
                            <h1 className='text-[20px] font-bold'>{userProfile?.email}</h1>
                        </div>
                        <div className='bg-highlightKeppel flex items-center w-full h-[50px]  rounded-xl m-1'>
                            <p className="text-md font-bold text-textAliceBlue ml-2 mr-3">Student ID:</p>
                            <p className='text-[20px] font-bold'>{userProfile?.student_id}</p>
                        </div>
                        <div className='bg-highlightKeppel flex items-center w-full h-[50px]  rounded-xl m-1'>
                            <p className="text-md font-bold text-textAliceBlue ml-2 mr-3">Phone Number:</p>
                            <p className='text-[20px] font-bold'>{userProfile?.phone_num}</p>
                        </div>
                        <div className='bg-highlightKeppel flex items-center w-full h-[50px]  rounded-xl m-1'>
                            <p className="text-md font-bold text-textAliceBlue ml-2 mr-3">Joined at:</p>
                            <p className='text-[20px] font-bold'>{userProfile?.$createdAt.split("T")[0]}</p>
                        </div>
                    </div>

                </div>
                <div className='w-[420px] mt-5 md:mt-0 mb-5 md:mb-0 md:h-[700px] md:w-[900px] bg-primaryBlue md:ml-10 rounded-2xl p-6 overflow-y-auto shadow-lg'>
                    <h2 className='text-2xl font-bold text-textAliceBlue mb-4'>📚 Borrowed Books</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {borrowedBooks?.map(record => (
                            <div
                                key={record.$id}
                                className='bg-neutralDun p-4 rounded-lg shadow-md flex items-center space-x-4'
                            >

                                <Book key={record.book?.$id} coverColor={record.book?.color} cover={record.book?.cover} />
                                <div className='flex flex-col space-y-2'>
                                    <h3 className='text-lg font-bold text-highlightBrown'>
                                        {record.book?.title}
                                    </h3>
                                    <p className='text-sm font-bold text-highlightBrown'>
                                        by {record.book?.author}
                                    </p>

                                    <p className='text-sm text-gray-300'>
                                        Borrowed on: <span className="font-bold">{new Date(record.borrow_date).toLocaleDateString()}</span>
                                    </p>

                                    <p className={`text-sm font-semibold ${record.status === 'borrowed' ? 'text-highlightKeppel' : 'text-highlightTomato'
                                        }`}>
                                        Status: {record.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
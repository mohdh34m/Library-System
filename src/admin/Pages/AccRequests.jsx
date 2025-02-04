import React, { useState, useEffect } from 'react'
import SideBar from '../components/SideBar'
import { databases, storage } from '../../lib/appwrite'
import { Query } from 'appwrite';
import { LuExternalLink } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

function AccRequests() {

    const [users, setUsers] = useState([])
    const [page, setPage] = useState(0)
    const [totalUsers, setTotalUsers] = useState(0);

    const handleApprove = async (userId) => {
        try {
            await databases.updateDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_USERS_COLLECTION_ID, userId, {
                status: true,
            })
            setUsers(prev => prev.filter(user => user.$id !== userId));
            alert("User Approved.");
        } catch (error) {
            console.error("Failed to approve user:", error)
        }
    }

    const deleteUser = async (userId) => {
        try {
            await databases.deleteDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_USERS_COLLECTION_ID,
                userId
            );

            setUsers(prev => prev.filter(user => user.$id !== userId));
            alert("User removed from database.");

        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await databases.listDocuments(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_USERS_COLLECTION_ID,
                [
                    Query.limit(10),
                    Query.offset(page),
                    Query.equal("status", false)
                ])
            setUsers(res.documents)
            setTotalUsers(res.total)
        }
        fetchData()
    }, [])

    return (
        <div className='flex'>
            <SideBar />
            <div>
                <div>
                    <h1 className='text-[30px] font-bold m-5'>Account Requests</h1>
                    <div className='w-[1350px] h-[600px] m-5'>
                        <table className='bg-white w-full rounded-xl shadow-lg overflow-hidden'>
                            <thead className='bg-highlightGray/20 font-bold'>
                                <tr>
                                    <th className='py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider'>Name</th>
                                    <th className='py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider'>Phone No</th>
                                    <th className='py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider'>Date Joined</th>
                                    <th className='py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider'>Role</th>
                                    <th className='py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider'>Student ID</th>
                                    <th className='py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider'>ID Card</th>
                                    <th className='py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user) => (
                                    <tr key={user.$id} className='hover:bg-highlightGolden/10 transition-colors'>
                                        <td className='py-4 px-6 text-gray-700 font-medium'>{user?.name}</td>
                                        <td className='py-4 px-6 text-gray-600'>{user?.student_id}</td>
                                        <td className='py-4 px-6 text-gray-600'>{user?.$createdAt.split("T")[0]}</td>
                                        <td className='py-4 px-6'>
                                            <span className='px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm'>{user?.role}</span>
                                        </td>
                                        <td className='py-4 px-6 text-gray-600'>{user?.phone_num}</td>
                                        <td className='py-4 px-6'>
                                            <button className='text-highlightBrown hover:text-highlightBrown/80 font-medium flex items-center'>
                                                <a
                                                    className='mr-1'
                                                    href={storage.getFilePreview(import.meta.env.VITE_STORAGE_BUCKET_ID, user?.id_card)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    View ID
                                                </a>
                                                <LuExternalLink size={15} />
                                            </button>
                                        </td>
                                        <td className='py-4 px-6'>
                                            <div className='flex items-center gap-3'>
                                                <button
                                                    className='px-3 py-1.5 flex items-center bg-highlightKeppel/10 hover:bg-highlightKeppel/20 text-highlightKeppel rounded-md transition-all duration-200 border border-highlightKeppel/30 hover:border-highlightKeppel/50'
                                                    onClick={() => handleApprove(user.$id)}
                                                >
                                                    <FaCheckCircle size={18} className='mr-2' />
                                                    Approve
                                                </button>

                                                <button
                                                    className='p-1.5 flex items-center text-highlightTomato hover:bg-red-50 rounded-md transition-colors duration-200 hover:border hover:border-red-100'
                                                    onClick={() => deleteUser(user.$id)}
                                                >
                                                    <RiDeleteBinLine size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='flex justify-center items-center gap-4 mt-6'>
                            <button onClick={() => setPage(page - 5)} disabled={page === 0} className='flex items-center font-medium disabled:cursor-not-allowed'><FaArrowLeft size={20} className='mr-2' /> Previous</button>
                            <h1 className='text-[20px] font-bold text-highlightGray'>{`Page ${Math.floor(page / 5) + 1}`}</h1>
                            <button onClick={() => setPage(page + 5)} disabled={page + 5 >= totalUsers} className='flex items-center font-medium disabled:cursor-not-allowed'>Next <FaArrowRight size={20} className='ml-2' /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccRequests
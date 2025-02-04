import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { databases } from '../lib/appwrite';
import { Query } from 'appwrite';

function BookBarChart() {

    const [data, setData] = useState([
        { name: 'Sunday', day: 0, Book: 0 },
        { name: 'Monday', day: 1, Book: 0 },
        { name: 'Tuesday', day: 2, Book: 0 },
        { name: 'Wednesday', day: 3, Book: 0 },
        { name: 'Thursday', day: 4, Book: 0 },
        { name: 'Friday', day: 5, Book: 0 },
        { name: 'Saturday', day: 6, Book: 0 },
    ])

    useEffect(() => {

        const fetchData = async () => {
            try {
                const today = new Date()
                const past7Days = [];
                for (let i = 6; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(today.getDate() - i);
                    past7Days.push(date.toISOString().split("T")[0]);
                }
                const res = await databases.listDocuments(
                    import.meta.env.VITE_DATABASE_ID,
                    import.meta.env.VITE_BORROW_COLLECTION_ID,
                    [
                        Query.orderDesc("$createdAt"),
                        Query.greaterThanEqual("$createdAt", past7Days[0])
                    ]
                );

                const updatedData = data.map(d => ({ ...d, Book: 0 }))

                res.documents.forEach((item) => {
                    const createdat = item.$createdAt
                    const date = new Date(createdat)
                    const day = date.getDay()

                    const dayData = updatedData.find(d => d.day === day);

                    if (dayData) {
                        dayData.Book += 1
                    }
                })
                setData(updatedData)

            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };

        fetchData();
    }, [])

    return (
        <div className='w-[950px] h-[600px]'>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 15 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f0f0f0"
                    />

                    <XAxis
                        dataKey="name"
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={{ stroke: '#cbd5e1' }}
                        tickLine={{ stroke: '#cbd5e1' }}
                    />

                    <YAxis
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={{ stroke: '#cbd5e1' }}
                        tickLine={{ stroke: '#cbd5e1' }}
                    />

                    <Tooltip
                        cursor={{ fill: 'rgba(200,200,200,0.1)' }}
                        contentStyle={{
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        itemStyle={{ color: '#475569' }}
                        formatter={(value) => [value, 'Books']}
                    />

                    <Legend
                        verticalAlign="top"
                        align="right"
                        iconSize={12}
                        wrapperStyle={{
                            paddingBottom: '20px',
                            fontSize: '12px',
                            color: '#475569'
                        }}
                    />
                    <Bar
                        dataKey="Book"
                        fill="#37BFA8"
                        radius={[4, 4, 0, 0]}
                        activeBar={{
                            fill: '#37BFA8',
                            stroke: '#37BFA8',
                            radius: [4, 4, 0, 0]
                        }}
                        name="Books Borrowed"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BookBarChart;

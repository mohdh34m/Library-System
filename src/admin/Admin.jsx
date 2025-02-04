import React from 'react';
import BookBarChart from '../Charts/BookBarChart';
import SideBar from './components/SideBar';
import StatsOverview from './components/StatsOverview';

function Admin() {

  return (
    <div className='flex h-screen'>
      <SideBar />
      <main >
        <div>
          <h1 className='text-3xl font-bold m-5'>Admin Dashboard</h1>
          <StatsOverview />
        </div>
        <BookBarChart />
      </main>
    </div>
  );
}

export default Admin;
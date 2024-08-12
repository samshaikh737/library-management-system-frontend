'use client'

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import BookTable from '@/features/Books/BookTable';


import AlertContext from "@/context/Alert";


export default function Home() {
  return (<AlertContext>
    <div className="flex">
      <Sidebar />
      <div className=" p-10 flex-1">
        <Header />
        <StatsCard />

        <div className="mt-10"></div>
        <BookTable />
      </div>
    </div>

  </AlertContext>
  );
}

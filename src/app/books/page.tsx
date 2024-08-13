'use client'

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import BookTable from '@/features/Books/BookTable';


import AlertContext from "@/context/Alert";
import Branches from '@/features/Branch/BranchTable';
import Users from '@/features/User/UserTable';
import Checkouts from '@/features/Checkout/CheckoutTable';


export default function Home() {
  return (
    <div className=" p-10 flex-1">
      {/* <Header /> */}
      <StatsCard />

      <div className="mt-10"></div>
      <BookTable />
    </div>
  );
}

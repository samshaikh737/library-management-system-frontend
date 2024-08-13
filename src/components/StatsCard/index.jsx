import { getAnalytics } from '@/hooks/Analytics';
import React from 'react';

const Icon = ({ icon: IconComponent, bgColor }) => {
    return (
        <div className={`${bgColor} text-white p-2 rounded-full`}>
            <IconComponent className="h-6 w-6" />
        </div>
    );
};


const StatsCard = ({ value, label, icon: IconComponent, bgColor }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-semibold">{value}</h2>
                <p className="text-gray-600">{label}</p>
            </div>
            <Icon icon={IconComponent} bgColor={bgColor} />
        </div>
    );
};

import { FaBook, FaWarehouse, FaUserPlus, FaUsers } from 'react-icons/fa';
import { TbTruckDelivery } from "react-icons/tb";

export default function Index() {
    const { data: analytics } = getAnalytics()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <StatsCard
                value={analytics.totalBooks}
                label="Total Books"
                icon={FaBook}
                bgColor="bg-red-500"
            />
            <StatsCard
                value={analytics.totalUsers}
                label="Total Users"
                icon={FaUsers}
                bgColor="bg-blue-500"
            />
            <StatsCard
                value={analytics.totalBranches}
                label="Total Branches"
                icon={FaWarehouse}
                bgColor="bg-yellow-500"
            />
            <StatsCard
                value={analytics.totalCheckouts}
                label="Total Checkouts"
                icon={TbTruckDelivery}
                bgColor="bg-green-500"
            />
        </div>
    );
}

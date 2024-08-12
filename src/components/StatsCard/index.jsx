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

import { FaExclamationCircle, FaBook, FaUserPlus, FaUsers } from 'react-icons/fa';

export default function Home() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <StatsCard
                value="1223"
                label="Total Visitors"
                icon={FaUsers}
                bgColor="bg-red-500"
            />
            <StatsCard
                value="740"
                label="Borrowed Books"
                icon={FaBook}
                bgColor="bg-blue-500"
            />
            <StatsCard
                value="22"
                label="Overdue Books"
                icon={FaExclamationCircle}
                bgColor="bg-yellow-500"
            />
            <StatsCard
                value="60"
                label="New Members"
                icon={FaUserPlus}
                bgColor="bg-green-500"
            />
        </div>
    );
}

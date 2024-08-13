'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen bg-white shadow-md flex flex-col mr-10">
            <div className="px-6 py-4 font-bold text-xl border-b border-gray-200 text-black">Library</div>
            <div className="flex-1 overflow-y-auto">
                <nav className="py-4">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/books"
                                className={`flex items-center space-x-3 px-6 py-3 hover:bg-blue-100 ${pathname === '/books' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                            >
                                <span>Books</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/branch"
                                className={`flex items-center space-x-3 px-6 py-3 hover:bg-blue-100 ${pathname === '/branch' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                            >
                                <span>Branch</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/users"
                                className={`flex items-center space-x-3 px-6 py-3 hover:bg-blue-100 ${pathname === '/users' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                            >
                                <span>Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/checkouts"
                                className={`flex items-center space-x-3 px-6 py-3 hover:bg-blue-100 ${pathname === '/checkouts' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                            >
                                <span>Checkouts</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/transfer"
                                className={`flex items-center space-x-3 px-6 py-3 hover:bg-blue-100 ${pathname === '/transfer' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                            >
                                <span>Transfer</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;

import { useState } from 'react';
// import { FaHome, FaProjectDiagram, FaBell, FaChartPie, FaHeart, FaWallet, FaEnvelope, FaSignOutAlt, FaCog } from 'react-icons/fa';

const Sidebar = () => {
    const [active, setActive] = useState('Dashboard');

    return (
        <div className="w-64 h-screen bg-white shadow-md flex flex-col">
            <div className="px-6 py-4 font-bold text-xl border-b border-gray-200 text-black">Codinglab</div>
            <div className="flex-1 overflow-y-auto">
                <nav className="py-4">
                    <ul className="space-y-2">
                        <li>
                            <a
                                href="#"
                                className={`flex items-center space-x-3 px-6 py-3  hover:bg-blue-100 ${
                                    active === 'Dashboard' ? 'bg-blue-500 text-white' : 'text-gray-600'
                                }`}
                                onClick={() => setActive('Dashboard')}
                            >
                                {/* <FaHome className="text-lg" /> */}
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`flex items-center space-x-3 px-6 py-3 hover:bg-blue-100 ${
                                    active === 'Projects' ? 'bg-blue-500 text-white' : 'text-gray-600'
                                }`}
                                onClick={() => setActive('Projects')}
                            >
                                {/* <FaProjectDiagram className="text-lg" /> */}
                                <span>Projects</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`flex items-center space-x-3 px-6 py-3 hover:bg-blue-100 ${
                                    active === 'Notifications' ? 'bg-blue-500 text-white' : 'text-gray-600'
                                }`}
                                onClick={() => setActive('Notifications')}
                            >
                                {/* <FaBell className="text-lg" /> */}
                                <span>Notifications</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`flex items-center space-x-3 px-6 py-3 hover:bg-blue-100 ${
                                    active === 'Analytics' ? 'bg-blue-500 text-white' : 'text-gray-600'
                                }`}
                                onClick={() => setActive('Analytics')}
                            >
                                {/* <FaChartPie className="text-lg" /> */}
                                <span>Analytics</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`flex items-center space-x-3 px-6 py-3 hover:bg-blue-100 ${
                                    active === 'Likes' ? 'bg-blue-500 text-white' : 'text-gray-600'
                                }`}
                                onClick={() => setActive('Likes')}
                            >
                                {/* <FaHeart className="text-lg" /> */}
                                <span>Likes</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`flex items-center space-x-3 px-6 py-3 hover:bg-blue-100 ${
                                    active === 'Wallets' ? 'bg-blue-500 text-white' : 'text-gray-600'
                                }`}
                                onClick={() => setActive('Wallets')}
                            >
                                {/* <FaWallet className="text-lg" /> */}
                                <span>Wallets</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`flex items-center space-x-3 px-6 py-3 hover:bg-blue-100 ${
                                    active === 'Messages' ? 'bg-blue-500 text-white' : 'text-gray-600'
                                }`}
                                onClick={() => setActive('Messages')}
                            >
                                {/* <FaEnvelope className="text-lg" /> */}
                                <span>Messages</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`flex items-center space-x-3 px-6 py-3 hover:bg-blue-100 ${
                                    active === 'Logout' ? 'bg-blue-500 text-white' : 'text-gray-600'
                                }`}
                                onClick={() => setActive('Logout')}
                            >
                                {/* <FaSignOutAlt className="text-lg" /> */}
                                <span>Logout</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`flex items-center space-x-3 px-6 py-3 hover:bg-blue-100 ${
                                    active === 'Settings' ? 'bg-blue-500 text-white' : 'text-gray-600'
                                }`}
                                onClick={() => setActive('Settings')}
                            >
                                {/* <FaCog className="text-lg" /> */}
                                <span>Settings</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;

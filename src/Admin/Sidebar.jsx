import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { ImUsers } from "react-icons/im";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdRememberMe } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import { toast } from 'sonner';
import { IoIosLogOut } from "react-icons/io";

function Sidebar() {
const navigate = useNavigate()
  const handleLogout = () => {
    navigate('/');
    toast.success('Logout Successfully');
  };
    return (
        <div className="flex h-screen">
            {/* Sidebar with full height and scrolling */}
            <aside className="w-64 bg-sky-950 text-white h-screen overflow-y-auto">
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <nav className="mt-6">
                        <ul>
                            <li className="my-2">
                                <Link to="/dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-gray-400">
                                    <LuLayoutDashboard size={20} />
                                    <span>DASHBOARD</span>
                                </Link>
                            </li>
                            <li className="my-2">
                                <Link to="/productsection" className="flex items-center gap-2 p-2 rounded hover:bg-gray-400">
                                    <FaBook size={20} />
                                    <span>BOOKS</span>
                                </Link>
                            </li>
                            <li className="my-2">
                                <Link to="/users" className="flex items-center gap-2 p-2 rounded hover:bg-gray-400">
                                    <ImUsers size={20} />
                                    <span>USERS</span>
                                </Link>
                            </li>
                            <li className="my-2">
                                <Link to="/members" className="flex items-center gap-2 p-2 rounded hover:bg-gray-400">
                                    <MdRememberMe size={20} />
                                    <span>MEMBERS</span>
                                </Link>
                            </li>
                            <li className="my-2">
                                <Link to="/borrows" className="flex items-center gap-2 p-2 rounded hover:bg-gray-400">
                                    <MdOutlineProductionQuantityLimits size={20} />
                                    <span>BORROWS</span>
                                </Link>
                            </li>
                            <li className="my-2">
                                <Link to="/reviews" className="flex items-center gap-2 p-2 rounded hover:bg-gray-400">
                                    <IoStarSharp size={20} />
                                    <span>REVIEWS</span>
                                </Link>
                            </li>
                        </ul>
                        <div className="p-4 border-t border-gray-700">
        <button 
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200"
          onClick={handleLogout}
        >
          <IoIosLogOut/>
          <span className="font-medium">Logout</span>
        </button>
      </div>
                    </nav>
                </div>
            </aside>
            {/* Main content area */}
            <main className="flex-1 p-6 bg-gray-200">
                {/* Your main content goes here */}
            </main>
        </div>
    );
}

export default Sidebar;

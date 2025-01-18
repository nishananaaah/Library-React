import React from 'react';
import { Link } from 'react-router-dom';
// import { MdDashboardCustomize } from "react-icons/md";

function Sidebar() {
    return (
        <div className="flex h-screen">
          {/* Sidebar with full height and scrolling */}
          <aside className="w-64 bg-gray-400 text-white h-screen overflow-y-auto">
            <div className="p-6">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <nav className="mt-6">
                <ul>
                  <li className="my-2">
                    <Link
                      to="/dashboard"
                      className="block p-2 rounded hover:bg-sky-950"
                    >
                  DASHBOARD
                    </Link>
               
                  </li>
                  <li className="my-2">
                    <Link
                      to="/productsection"
                      className="block p-2 rounded hover:bg-sky-950"
                    >
                      PRODUCTS
                    </Link>

                  </li>
                  <li className="my-2">
                    <Link
                      to="/users"
                      className="block p-2 rounded hover:bg-sky-950"
                    >
                      USERS
                    </Link>
                
                  </li>
                  <li className="my-2">
                    <Link
                      to="/members"
                      className="block p-2 rounded hover:bg-sky-950"
                    >
                      MEMBERS
                    </Link>
                
                  </li>
                  
                  <li className="my-2">   
                    <Link
                      to="/borrows"
                      className="block p-2 rounded hover:bg-sky-950"
                    >
                     BORROWS
                    </Link>
                  </li>
                  <li className="my-2">
                    <Link
                      to="/reviews"
                      className="block p-2 rounded hover:bg-sky-950"
                    >
                     REVIEWS
                    </Link>
                  </li>
                </ul>
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

export default Sidebar

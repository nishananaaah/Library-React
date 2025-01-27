import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar2() {
  const navigate  = useNavigate();
  return (
    <div className=" text-sky-950 py-4 shadow-sm">
    <div className="max-w-7xl mx-auto flex justify-center space-x-16">
    <Link
        to="/categories"
        className="hover:text-gray-600 text-sm font-semibold"
      >
        ALL BOOKS
      </Link>
      <Link
        to="/fiction"
        className="hover:text-gray-600 text-sm font-semibold"
      >
        FICTION
      </Link>
      <Link
        to="/non-fiction"
        className="hover:text-gray-600 text-sm font-semibold"
      >
        NON-FICTION
      </Link>
      <Link
        to="/childrensbook"
        className="hover:text-gray-600 text-sm font-semibold"
      > CHILDRENS-BOOK
      </Link>
      <Link
        to="/mystery"
        className="hover:text-gray-600 text-sm font-semibold"
      >
       MYSTERY
      </Link>
      <Link
        to="/romance"
        className="hover:text-gray-600 text-sm font-semibold"
      >
        ROMANCE
      </Link>
      <Link
        to="/fantacy"
        className="hover:text-gray-600 text-sm font-semibold"
      >
       FANTACY
      </Link>
      <Link
        to="/blog"
        className="hover:text-gray-600 text-sm font-semibold"
      >
        BLOG
      </Link>
      {/* <Link
        to="/yourborrows"
        className="hover:text-gray-600 text-sm font-semibold"
      >
        YOUR-BORROWS
      </Link>
     */}
    <button
  className="bg-gradient-to-r from-sky-950 to-sky-600 text-white font-bold px-1 rounded-lg shadow-md hover:bg-sky-800"
  onClick={() => navigate("/yourborrows")}
>
  BORROWS
</button>


    </div>
  </div>
  )
}

export default Navbar2

import React from 'react'
import { Link } from 'react-router-dom'

function Navbar2() {
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
      <Link
        to="/yourborrows"
        className="hover:text-gray-600 text-sm font-semibold"
      >
        YOUR-BORROWS
      </Link>
    
    </div>
  </div>
  )
}

export default Navbar2

import React from 'react'
import Navbar from './Navbar'
import Home1 from './Home1'
import Navbar2 from './Navbar2'
import BooksList from './BooksList'
import Authors from './Authors'
import Footer from './Footer'
import Banner from './Banner'

function Home() {
  return (
    <div>
  <Navbar/>
  <Navbar2/>
  <Home1/>
  <BooksList/>
  <Banner/>
  <Authors/>
  <Footer/>
    </div>
  )
}

export default Home

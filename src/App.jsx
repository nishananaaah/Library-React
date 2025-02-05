import React from 'react'

import './index.css'
import Dashboard from './Admin/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Users from './Admin/Users'
import AdminLogin from './Admin/AdminLogin'
import ProductSection from './Admin/ProductSection'
import Borrows from './Admin/Borrows'
import Reviews from './Admin/Reviews'
import Members from './Admin/Members'
import UserDetails from './Admin/UserDetails'
import { Toaster } from 'sonner'
import Register from './Components/UserSide/Register'
import Login from './Components/UserSide/Login'
import Home from './Components/UserSide/Home'
import Fiction from './Components/UserSide/Fiction'
import Nonfiction from './Components/UserSide/Nonfiction'
import Childrens from './Components/UserSide/Childrens'
import Mystery from './Components/UserSide/Mystery'
import Romance from './Components/UserSide/Romance'
import Fantacy from './Components/UserSide/Fantacy'
import Allbooks from './Components/UserSide/Allbooks'
import Membership from './Components/UserSide/Membership'
import BookDetailpage from './Components/UserSide/BookDetailpage'
import Blog from './Components/UserSide/Blog'
import Profile from './Components/UserSide/Profile'
import UserBorrows from './Components/UserSide/UserBorrows'
import About from './Components/UserSide/About'
import Contact from './Components/UserSide/Contact'
import GoogleLogin from './Components/UserSide/GoogleLogin'



function App() {
  

  return (
    <>
  <div>
    <Toaster richColors position='bottom-right'/>
    <Routes>
      <Route path='/'element={<Home/>}/>
      <Route path='adminlogin'element={<AdminLogin/>}/>         
       <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='users' element={<Users/>}/>
      <Route path='members' element={<Members/>}/>
      <Route path='productsection' element={<ProductSection/>}/>
      <Route path ='borrows' element={<Borrows/>}/>
      <Route path='reviews' element={<Reviews/>}/>
      <Route path="users/:userid" element={<UserDetails/>}/>
      <Route path='register' element={<Register/>} />
      <Route path='login' element={<Login/>}/>
      <Route path='fiction' element={<Fiction/>}/>
      <Route path='non-fiction'element={<Nonfiction/>}/>
      <Route path='childrensbook' element={<Childrens/>}/>
      <Route path='mystery'element={<Mystery/>}/>
      <Route path='romance' element={<Romance/>}/>
      <Route path='fantacy' element={<Fantacy/>}/>
      <Route path='categories'element={<Allbooks/>}/>
      <Route path='membership' element={<Membership/>}/>
      <Route path='detail/:productId' element={<BookDetailpage/>}/>
      <Route path='blog' element={<Blog/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route  path='yourborrows'element={<UserBorrows/>}/>
      <Route  path='about' element={<About/>}/>
      <Route  path='contact' element={<Contact/>}/>

    </Routes>
    
   
    
   
  </div>
    </>
  )
}

export default App

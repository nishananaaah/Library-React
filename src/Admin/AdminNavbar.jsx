import { useState } from 'react'


function AdminNavbar() {
    const [isMenuopen,setIsmenuopen] = useState(false);
  

    function togleMenu(){
       setIsmenuopen(isMenuopen)
    }
   
  return (
    <div>
         <nav className="bg-sky-950 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          /> */}
          <h1 className='text-4xl text-white font-bold'>ADMIN</h1>
          <img className='h-7 w-7'   src="https://media.istockphoto.com/id/157482029/photo/stack-of-books.jpg?s=612x612&w=0&k=20&c=ZxSsWKNcVpEzrJ3_kxAUuhBCT3P_dfnmJ81JegPD8eE=" alt="" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-300">
            BOOKRED
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* <button
            type="button"
            className="text-white bg-black hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={()=>navigate('/home')}
          >
            LOG OUT
          </button> */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={togleMenu}
            aria-controls="navbar-cta"
            aria-expanded={isMenuopen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
       </div>
    </nav>
      
    </div>
  )
}

export default AdminNavbar

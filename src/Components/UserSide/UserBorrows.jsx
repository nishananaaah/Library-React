import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Footer from './Footer';

function UserBorrows() {
    const [borrows,setBorrow] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;

    useEffect(()=>{
        const fetchBorrow = async ()=>{
            try {
                const response = await axios.get(`http://localhost:3000/api/users/borrow/${userId}`)
                setBorrow(response?.data?.borrow)
                console.log(borrows,'bsssssssssssss')
            } catch (error) {
              console.log("Failed to load borrows",error);
              toast.error("Failed to fetch Borrow")
              
                
            }
        }
        fetchBorrow();
    },[userId])
  return (
    <div>
      <Navbar/>
      <Navbar2/>
         <div className="space-y-6">
              {borrows?.map((borrow, index) => (
                <div key={borrow._id} className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Borrow #{index + 1} 

                    userId : {borrow.userId}
                  </h2>
                  {/* <div className='mb-4'>
                    {borrow.userId?.map((user)=>(
                       <p className="text-gray-700 font-medium">{user.username}</p>
                    ))}
                  </div> */}
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Product:</h3>
                    <ul className="space-y-3">
                      {borrow?.productId?.map((product) => (
                        
                        <li key={product?._id} className="flex items-start gap-4 border-b border-gray-200 pb-2">
                          <img
                            src={product?.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-md border border-gray-300"
                          />
                          <div>
                            <p className="text-gray-700 font-medium">{product.name}</p>
                            <h2 className="text-gray-500">price:
                              ${product.price} category : {product.category}
                            </h2>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Total Price:$200</h3>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Startdate:</h3>
                    <p className="text-gray-700">
                      {borrow.startDate}, {borrow.city}, {borrow.state} {borrow.zipcode}
                    </p>
                  </div>
                </div>
              ))}
              </div>
              <Footer/>
    </div>
  )
}

export default UserBorrows

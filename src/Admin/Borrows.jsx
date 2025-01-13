import  { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import Sidebar from './Sidebar'
import axios from 'axios';

function Borrows() {
  const [borrows,setBorrows] = useState([]);
  // const [products,setProducts] =useState([]);
  console.log(borrows.productId,'nisssssss')

  useEffect(()=>{
    const fetchBorrows = async()=>{
      try {
        const response  = await axios.get('http://localhost:3000/api/admin/viewAllborrows')
      setBorrows(response?.data || [])
        
       } catch (error) {
        console.log("failed to load borrows",error)

          
        
       }
      
    }
    fetchBorrows()
  
  },[])
  // useEffect(()=>{
  //   const fetchProducts = async()=>{
  //     try {
  //       const response = await axios.get('http://localhost:3000/api/admin/products')
  //         setProducts(response?.data)
  //     } catch (error) {
  //       console.log("failed to load products",error)
        
  //     }
  //   }
  //   fetchProducts()
  // },[])
  
  return (
    <div>
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <div className="p-8 bg-gray-100 min-h-screen flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Borrows</h1>
          {borrows.length === 0 ? (
            <p className="text-gray-600">No Borrows found.</p>
          ) : (
            <div className="space-y-6">
              {borrows.map((borrow, index) => (
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
                      {borrow.productId?.map((product) => (
                        
                        <li key={product._id} className="flex items-start gap-4 border-b border-gray-200 pb-2">
                          <img
                            src={product.image}
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Borrows

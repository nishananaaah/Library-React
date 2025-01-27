import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

function Profile() {
  const [borrows, setBorrows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBorrow = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/borrow/${userId}`);
        setBorrows(response?.data?.borrow || []);
      } catch (error) {
        console.error('Failed to load borrows:', error);
        toast.error('Failed to fetch Borrow');
      }
    };
    fetchBorrow();
  }, [userId]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = borrows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(borrows.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    toast.success('Logout Successfully');
  };

const handleConfirm = () =>{
    navigate('/')
    toast.success("Borrow Confirmed Successfully")
}

  return (
    <main className="flex-1 bg-gray-100">
      <Navbar />
      <Navbar2 />
      <div className="container mx-auto p-8">
        {/* Profile Header */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={user.image || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-0 md:ml-8 mt-4 md:mt-0 text-center md:text-left">
              <h1 className="text-2xl font-semibold text-gray-800">{user.username || 'John Doe'}</h1>
              <p className="text-gray-600 mt-2">Email: {user.email || 'user@example.com'}</p>
              <p className="text-gray-600">Total Borrows: {borrows.length}</p>
              <p className="text-gray-600">Membership Status:Gold</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Borrow Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentItems.map((borrow, index) => (
              <div key={borrow._id} className="p-4 bg-gray-50 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-800">Borrow #{index + 1}</h3>
                <div>
                  {borrow?.productId?.map((product) => (
                    <div key={product?._id} className="flex items-center gap-4 mt-4">
                      <img
                        src={product?.image}
                        alt={product?.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-gray-800">{product?.name}</p>
                        <p className="text-gray-800">by {product?.author}</p>
                        <p className="text-gray-600">${product?.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-gray-700">Fine:${borrow.fine}</p>
                <p className="text-gray-700">
                  Start Date: {new Date(borrow.borrowDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  Return Date: {new Date(borrow.dueDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white'}`}
          >
            Previous
          </button>
          <span className="mx-4 text-gray-600">Page {currentPage} of {totalPages}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-600 text-white'}`}
          >
            Next
          </button>
        </div>

        {/* Shipping Information */}
        <div className="bg-white shadow-lg rounded-lg p-8 mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Information</h2>
          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Address"
              className="p-3 border border-gray-300 rounded-md"
              value={shippingDetails.address}
              onChange={(e) =>
                setShippingDetails({ ...shippingDetails, address: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                className="p-3 border border-gray-300 rounded-md"
                value={shippingDetails.city}
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, city: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="State"
                className="p-3 border border-gray-300 rounded-md"
                value={shippingDetails.state}
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, state: e.target.value })
                }
              />
            </div>
            <input
              type="text"
              placeholder="Zip Code"
              className="p-3 border border-gray-300 rounded-md"
              value={shippingDetails.zipCode}
              onChange={(e) =>
                setShippingDetails({ ...shippingDetails, zipCode: e.target.value })
              }
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
          >
            Logout
          </button>
          <button onClick={handleConfirm} className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700">
            Confirm Borrowing
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Profile;




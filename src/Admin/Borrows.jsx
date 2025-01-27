import { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import axios from 'axios';

function Borrows() {
  const [borrows, setBorrows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  console.log(borrows)

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/viewAllborrows');
        setBorrows(response?.data || []);
      } catch (error) {
        console.log('Failed to load borrows', error);
      }
    };
    fetchBorrows();
  }, []);

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

  return (
    <div>
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <div className="p-8 bg-gray-100 min-h-screen flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Borrows</h1>
          {currentItems.length === 0 ? (
            <p className="text-gray-600">No Borrows found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((borrow, index) => (
                <div
                  key={borrow._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Borrow #{indexOfFirstItem + index + 1}
                    </h2>
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-600 mb-2">Products:</h3>
                      <ul>
                        {borrow.productId?.map((product) => (
                          <li
                            key={product._id}
                            className="flex gap-4 items-center mb-3 border-b pb-2 last:border-none"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-md border border-gray-300"
                            />
                            <div>
                              <p className="text-gray-800 font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">
                                ${product.price} - {product.category}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <ul>
  {borrow.userId?.map((user) => (
    <li
      key={user._id}
      className="flex gap-4 items-start mb-3 border-b pb-2 last:border-none"
    >
      <div className="flex-1">
        <p className="text-gray-800 font-medium">Name: {user.name || 'N/A'}</p>
        <p className="text-gray-600">Email: {user.email}</p>
        <p className="text-gray-600">
          Membership: {user.membershipStatus || 'Not available'}
        </p>
        <p className="text-gray-600">Phone: {user.phone || 'N/A'}</p>
      </div>
    </li>
  ))}
</ul>

                    </div>
                    <div className="mb-4">
                      <p className="text-base font-medium text-gray-600">
                        Total Price: <span className="text-gray-800">membership status price</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-medium text-gray-600 mb-1">Start Date:</p>
                      <p className="text-sm text-gray-700">
                        {new Date(borrow.startDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-700">
                        {borrow.city}, {borrow.state}, {borrow.zipcode}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-sky-950 text-white hover:bg-gray-500'
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-sky-950 text-white hover:bg-gray-500'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Borrows;


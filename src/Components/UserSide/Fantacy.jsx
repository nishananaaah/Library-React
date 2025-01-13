import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Footer from './Footer';

function Fantacy() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage] = useState(10); // Number of items per page

  useEffect(() => {
    const fetchFantasyBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/products');
        setProducts(response.data.data);
      } catch (error) {
        console.log('Failed to load fantasy books', error);
        toast.error('Failed to load fantasy books');
      }
    };
    fetchFantasyBooks();
  }, []);

  const handleBorrow = (productId) => {
    toast.success(`Product with ID ${productId} borrowed!`);
    // Add your borrowing logic here (e.g., API call to update product status)
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products
    .filter((item) => item.category === 'fantasy') // Filter by fantasy category
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    products.filter((item) => item.category === 'fantasy').length / itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div>
        <Navbar />
        <Navbar2 />
      </div>
      <div className="text-center mb-8 p-5">
        <h1 className="right-8 font-mono text-4xl mb-4 p-4 border-b-2 border-white border-opacity-0 hover:border-opacity-100 hover:text-gray-400 duration-200 cursor-pointer active">
          FANTASY
        </h1>
      </div>
      <div className="flex flex-wrap gap-20 justify-center p-3">
        {currentItems.map((item, index) => {
          return (
            <div
              key={index}
              className="w-48 bg-white shadow-md rounded-lg overflow-hidden duration-500 hover:scale-105 hover:shadow-xl"
            >
              {/* Image */}
              <div className="w-full h-56">
                <img
                  src={item.image}
                  alt="Product"
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              {/* Borrow Button */}
              <div className="p-3 text-center">
                <button
                  onClick={() => handleBorrow(item._id)}
                  className="bg-sky-950 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-sky-800 transition duration-200 transform hover:scale-105"
                >
                  BORROW
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-4 p-10">
        <button
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1
                ? 'bg-sky-950 text-white'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Fantacy;


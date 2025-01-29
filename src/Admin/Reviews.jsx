import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaStar } from "react-icons/fa"; // For rating stars

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/reviews");
        setReviews(response.data || []);
      } catch (error) {
        console.log("Failed to load reviews", error);
      }
    };
    fetchReviews();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

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
          <h1 className="text-3xl font-bold text-gray-800 mb-6">User Reviews</h1>
          {currentItems.length === 0 ? (
            <p className="text-gray-600">No reviews found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((review, index) => (
                <div
                  key={review._id}
                  className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 p-4"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Review #{indexOfFirstItem + index + 1}
                    </h2>

                    {/* User Details */}
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14  text-white rounded-md flex items-center justify-center font-bold text-xl mr-4">
                        <img src={user?.image} alt="" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-800">{review.userId[0]?.username || "Anonymous"}</p>
                        <p className="text-sm text-gray-500">{review.userId[0]?.email}</p>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-600 mb-2">Book</h3>
                      <div className="space-y-4">
                        {review.productId?.map((product) => (
                          <div key={product._id} className="flex gap-4 items-center">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-md border border-gray-300"
                            />
                            <div>
                              <p className="text-gray-800 font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">by {product.author || "Unknown"}</p>
                              <p className="text-sm text-gray-500">${product.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-600 mb-2">Rating:</h3>
                      <div className="flex items-center mb-2">
                        <span className="text-yellow-500">
                          {[...Array(review.rating)].map((_, index) => (
                            <FaStar key={index} className="inline-block text-xl" />
                          ))}
                        </span>
                        {/* <span className="text-gray-500 ml-2">{review.rating}</span> */}
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="text-sm text-gray-700 mb-6">
                      <p>"{review.content}"</p>
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
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-sky-950 text-white hover:bg-gray-500"
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
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-sky-950 text-white hover:bg-gray-500"
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

export default Reviews;



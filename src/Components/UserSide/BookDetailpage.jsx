import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";
import Footer from "./Footer";

function BookDetailPage() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        toast.error("Failed to load product details");
      }
    };
    fetchProduct();
  }, [productId]);

  const handleBorrow = async (productId) => {
    try {
        // Ensure the user ID exists and is valid
        const id = localStorage.getItem("user");
        if (!id) {
            toast.error("User is not logged in or ID is missing");
            return;
        }
      
        
        const user = JSON.parse(id); // Parse user from localStorage
        console.log("ss",user);
        const userId = user._id;
        
        console.log("s,",userId);
        if (!userId) {
            toast.error("User ID is invalid");
            return;
        }

        await axios.post(`http://localhost:3000/api/users/${userId}/borrow/${productId}`);
        toast.success("Product Borrowed Successfully");
    } catch (error) {
        toast.error("Take Membership");
        console.error("Error borrowing product:", error);
    }
};
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Navbar2 />
      <div className="container mx-auto p-8">
        {product ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Book Image */}
              <div className="w-full md:w-1/2">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="rounded-lg shadow-lg object-contain w-full max-h-96"
                />
              </div>

              {/* Book Details */}
              <div className="w-full md:w-1/2">
                <h1 className="text-4xl font-bold text-gray-800">{product?.name}</h1>
                <h2 className="text-2xl text-gray-600 mt-2">by {product?.author}</h2>
                <p className="mt-4 text-lg text-gray-700">
                  {product?.description || "No description available."}
                </p>
                <p className="mt-4 text-2xl font-semibold text-sky-950">
                  ${product?.price}
                </p>

                {/* Borrow Button */}
                <button
                  onClick={() => handleBorrow(product._id)}
                  className="mt-6 px-6 py-3 bg-sky-950 text-white text-lg font-semibold rounded-lg hover:bg-sky-800 transition"
                >
                  Borrow Now
                </button>

                {/* Additional Info Section */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Additional Information:
                  </h3>
                  <ul className="list-disc list-inside mt-2 text-gray-700">
                    <li>Genre: {product?.genre || "Not specified"}</li>
                    <li>Pages: {product?.pages || "Unknown"}</li>
                    <li>Publisher: {product?.publisher || "Not available"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-20">
            <p className="text-2xl text-gray-700">Loading book details...</p>
          </div>
        )}
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default BookDetailPage;

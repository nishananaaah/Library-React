import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function BooksList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/products");
        setProducts(response.data.data);
      } catch (error) {
        console.log("Failed to load products", error);
        toast.error("Failed to load products");
      }
    };
    fetchBooks();
  }, []);

  const handleBorrow = async (productId) => {
    try {
      const id = localStorage.getItem("user");
      if (!id) {
        toast.error("User is not logged in. Please login!");
        return;
      }

      const user = JSON.parse(id);
      const userId = user._id;

      if (!userId) {
        toast.error("User ID is invalid");
        return;
      }

      const product = products.find((item) => item._id === productId);

      if (product.isBorrowed) {
        toast.success("This product is already borrowed. Not Available.");
        return;
      }

      await axios.post(`http://localhost:3000/api/users/${userId}/borrow/${productId}`);
      toast.success("Product Borrowed Successfully");
      updateProductStatus(productId, true);
    } catch (error) {
      toast.error("Take Membership");
      console.error("Error borrowing product:", error);
    }
  };

  const handleUnborrow = async (productId) => {
    try {
      const id = localStorage.getItem("user");
      if (!id) {
        toast.error("User is not logged in. Please login!");
        return;
      }

      const user = JSON.parse(id);
      const userId = user._id;

      if (!userId) {
        toast.error("User ID is invalid");
        return;
      }

      await axios.post(`http://localhost:3000/api/users/${userId}/unborrow/${productId}`);
      toast.success("Product Returned Successfully");
      updateProductStatus(productId, false);
    } catch (error) {
      toast.error("Error returning the product");
      console.error("Error unborrowing product:", error);
    }
  };

  const updateProductStatus = (productId, isBorrowed) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, isBorrowed } : product
      )
    );
  };

  return (
    <div>
      <div className="text-center mb-8 p-5">
        <h1 className="right-8 font-bold text-3xl mb-4 bg-gray-200 p-1 border-b-2 border-white border-opacity-0 hover:border-opacity-100 hover:text-gray-400 duration-200 cursor-pointer active text-sky-950">
          BEST COLLECTIONS
        </h1>
      </div>
      <div className="flex flex-wrap gap-20 justify-center p-3">
        {products
          .filter((item) => item.category === "card")
          .map((item, index) => (
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
                  onClick={() => navigate(`/detail/${item._id}`)}
                />
              </div>
              {/* Borrow and Unborrow Buttons */}
              <div className="p-3 text-center">
                {item.isBorrowed ? (
                  <>
                    <p className="text-red-500 font-bold mb-2">Not Available</p>
                    <button
                      onClick={() => handleUnborrow(item._id)}
                      className="bg-red-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-red-700 transition duration-200 transform hover:scale-105"
                    >
                      UNBORROW
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleBorrow(item._id)}
                    className="bg-sky-950 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-sky-800 transition duration-200 transform hover:scale-105"
                  >
                    BORROW
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BooksList;

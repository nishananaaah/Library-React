import  { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

function BooksList() {
  const [products, setProducts] = useState([]);
  console.log(products.data,"kandaman")

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/products");
        setProducts(response.data.data);
      } catch (error) {
        toast.error("Failed to load products");
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  const handleBorrow = (productId) => {
    toast.success(`Product with ID ${productId} borrowed!`);
    // Add your borrowing logic here (e.g., API call to update product status)
  };



  return (
    <div>
      <div className="text-center mb-8 p-5">
        <h1 className=" right-8 font-bold text-3xl mb-4 bg-gray-200  p-2 border-b-2 border-white border-opacity-0 hover:border-opacity-100  hover:text-gray-400 duration-200 cursor-pointer active ">BEST COLLECTIONS</h1>
        
      </div>
      <div className="flex flex-wrap gap-20 justify-center p-3">
        {products.filter((item) => item.category === "card").map((item, index) => {
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
    </div>
  );
  

  
  
}

export default BooksList;


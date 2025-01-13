import  { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

function Authors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/authors");
        setAuthors(response.data);
      } catch (error) {
        console.error("Failed to load authors", error);
        toast.error("Failed to load authors. Please try again.");
      }
    };
    fetchAuthors();
  }, []);

  return (
    <div>
      <div className="text-center mb-8 p-6">
      <h1 className=" right-8 font-bold text-3xl mb-4 bg-gray-200  p-2 border-b-2 border-white border-opacity-0 hover:border-opacity-100  hover:text-gray-400 duration-200 cursor-pointer active ">FEATURED AUTHORS</h1>
        
        </div>
      <div className="flex flex-wrap gap-20 justify-center p-3">
        {authors.map((author, index) => (
          <div
            key={index}
            className="w-48 bg-white shadow-md rounded-lg overflow-hidden duration-500 hover:scale-105 hover:shadow-xl"
          >
            {/* Image */}
            <div className="w-full h-56">
              <img
                src={author.image}
                alt={author.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
            {/* Author Details */}
            <div className="p-3">
              <p className="text-sm font-bold text-sky-950 truncate capitalize">
                {author.name}
              </p>
              {/* <p className="text-xs text-gray-700 truncate">
                Category: {author.category}
              </p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Authors;


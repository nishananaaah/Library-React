import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const Navbar = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const image = localStorage.getItem("image");

  const toggleProfileDropdown = () =>
    setProfileDropdownOpen(!profileDropdownOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleCategorySelect = (category) => {
    setDropdownOpen(false); // Close dropdown after selecting
    navigate(`/${category.toLowerCase()}`); // Navigate to the selected category
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/search?query=${query}`
      );
      setResults(response?.data?.data);
      console.log(response.data,"thissss")
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // const handleLogout = () => {
  //   localStorage.clear();
  //   navigate("/");
  //   toast.success("Logout Successfully");
  // };

  return (
    <nav className="bg-sky-950 text-white py-3 px-6 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/" className="hover:text-gray-400">
            BOOKRED
          </a>
        </div>
        {/* Search Bar */}
        <form className="flex flex-1 mx-4 max-w-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books, authors, or categories"
            className="w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
          />
          <button
            type="submit"
            onClick={handleSearch}
            className="bg-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-600"
          >
            Search
          </button>
        </form>
        {/* Category Dropdown */}
        <div className="relative">
          <button
            className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={toggleDropdown}
          >
            Categories
          </button>
          {dropdownOpen && (
            <ul className="absolute bg-white text-gray-800 mt-2 rounded-md shadow-lg w-48 z-10">
              {[
                "Fiction",
                "Non-Fiction",
                "Mystery",
                "Childrensbook",
                "Romance",
                "Fantasy",
              ].map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategorySelect(category)}
                    className="block px-4 py-2 text-left w-full hover:bg-gray-200"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>{" "}
        <button
          onClick={() => navigate("/membership")}
          className="bg-gradient-to-r from-sky-950 to-sky-600 px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Membership
        </button>
        <div className="space-x-4">
          <a href="/about" className="hover:text-gray-400">
            About
          </a>
          <a href="/contact" className="hover:text-gray-400">
            Contact
          </a>
        </div>
        {/* Profile and Links */}
        <NavLink
          className="inline-block relative"
          onClick={toggleProfileDropdown}
        >
          <img
            className="rounded-full border w-10 hover:border-pink-500 duration-200"
            src={
              image
                ? image
                : "data:image/png;base64,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"
            }
            alt="profile"
          />
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg ring-1 ring-gray-900/5">
              <ul className="divide-y divide-gray-200">
                {!username ? (
                  <>
                    <li>
                      <NavLink
                        to="/register"
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-900 font-semibold"
                      >
                        Register
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/login"
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-900 font-semibold"
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="px-4 py-2 font-semibold text-gray-900">
                      {username}
                    </li>
                    <li>
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 text-sky-950 font-semibold"
                      >
                       Your Profile
                      </NavLink>
                    </li>
                    {/* <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 w-full text-left text-red-600 hover:bg-gray-100 font-semibold"
                      >
                        Logout
                      </button>
                    </li> */}
                  </>
                )}
              </ul>
            </div>
          )}
        </NavLink>
        {/* About, Contact, and Membership */}
      </div>
      {/* {query && (
        <div className="bg-blue-500 w-full absolute  z-50 mt-10 top-10 ">
          {results.length === 0
            ? "no match ibooks"
            : results.map((val, index) => {
                return (
                  <div className="flex justify-between" key={index}>
                    <div className="">
                      <img src={val.image} alt="" />
                    </div>

                    <div>

                     <h1>{val.i}</h1>
                    </div>
                  </div>
                );
              })}
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;

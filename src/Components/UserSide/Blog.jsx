import React from "react";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";

const blogs = [
  {
    id: 1,
    title: "Exploring the Mountains",
    description: "A journey through the breathtaking mountain landscapes.",
    image: "https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/s54r5baavahllbofupxa", // Replace with actual image URLs
  },
  {
    id: 2,
    title: "A Day at the Beach",
    description: "Experience the serenity of the beach with golden sands.",
    image: "https://blog.ansi.org/wp-content/uploads/2024/07/Wave-on-Tunisian-coast.jpg", // Replace with actual image URLs
  },
  {
    id: 3,
    title: "Urban Adventures",
    description: "Discover the hidden gems of the city streets.",
    image: "https://blog.urbanadventures.com/wp-content/uploads/2020/01/Urban-Adventures-USA_Las_Vegas_Ferris_Wheel_Group.jpg", // Replace with actual image URLs
  },
];

function Blog() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Navbar2 />
      <div className="py-10 px-5">
        <h1 className="text-4xl font-mono text-center text-gray-800 mb-8  hover:text-gray-400 duration-200 cursor-pointer active">BLOG</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {blog.title}
                </h2>
                <p className="text-gray-600">{blog.description}</p>
                <button className="mt-4 px-4 py-2 bg-sky-950 text-white rounded hover:bg-gray-400">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
